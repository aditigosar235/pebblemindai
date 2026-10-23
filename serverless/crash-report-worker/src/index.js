const MAX_TRACE_BYTES = 512 * 1024;
const MAX_FEEDBACK_LENGTH = 4_000;
const MAX_FIELD_LENGTH = 120;
const RESEND_ENDPOINT = "https://api.resend.com/emails";

export default {
  async fetch(request, env) {
    const headers = responseHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method === "GET") {
      return json({ service: "pebble-mind-crash-report", status: "ok" }, 200, headers);
    }

    if (request.method !== "POST") {
      return json({ error: "method_not_allowed" }, 405, headers);
    }

    if (!originIsAllowed(request, env)) {
      return json({ error: "origin_not_allowed" }, 403, headers);
    }

    const declaredLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_TRACE_BYTES + 16_000) {
      return json({ error: "payload_too_large" }, 413, headers);
    }

    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json({ error: "json_required" }, 415, headers);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid_json" }, 400, headers);
    }

    const payload = validatePayload(body);
    if (!payload.ok) {
      return json({ error: payload.error }, 400, headers);
    }

    if (!env.RESEND_API_KEY || !env.CRASH_REPORT_FROM || !env.CRASH_REPORT_TO) {
      return json({ error: "service_not_configured" }, 503, headers);
    }

    const message = buildMessage(payload.value);
    const traceAttachment = {
      filename: "crash-trace.txt",
      content_type: "text/plain",
      content: encodeBase64(payload.value.trace),
    };
    let upstreamResponse;
    try {
      upstreamResponse = await fetch(env.RESEND_API_URL || RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CRASH_REPORT_FROM,
          to: [env.CRASH_REPORT_TO],
          subject: message.subject,
          text: message.text,
          attachments: [traceAttachment],
        }),
      });
    } catch {
      return json({ error: "delivery_unreachable" }, 502, headers);
    }

    if (!upstreamResponse.ok) {
      // Do not log the provider response: it could contain report content.
      console.error(`Crash report delivery failed with status ${upstreamResponse.status}`);
      return json({ error: "delivery_rejected" }, 502, headers);
    }

    return json({ accepted: true, reportID: payload.value.reportID }, 202, headers);
  },
};

export function validatePayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "object_required" };
  }

  const trace = typeof body.trace === "string" ? body.trace : "";
  if (!trace) {
    return { ok: false, error: "trace_required" };
  }

  if (new TextEncoder().encode(trace).byteLength > MAX_TRACE_BYTES) {
    return { ok: false, error: "trace_too_large" };
  }

  const reportID = cleanField(body.reportID, 80);
  if (!reportID || !/^[A-Za-z0-9._:-]+$/.test(reportID)) {
    return { ok: false, error: "report_id_invalid" };
  }

  return {
    ok: true,
    value: {
      reportID,
      trace: sanitizeText(trace),
      feedback: sanitizeText(cleanField(body.feedback, MAX_FEEDBACK_LENGTH)),
      appVersion: cleanField(body.appVersion, MAX_FIELD_LENGTH) || "unknown",
      build: cleanField(body.build, MAX_FIELD_LENGTH) || "unknown",
      platform: cleanField(body.platform, MAX_FIELD_LENGTH) || "unknown",
      osVersion: cleanField(body.osVersion, MAX_FIELD_LENGTH) || "unknown",
    },
  };
}

export function buildMessage(payload) {
  return {
    subject: `[Pebble Mind] Crash report ${payload.reportID.slice(0, 12)}`,
    text: [
      "Pebble Mind crash report",
      `Report ID: ${payload.reportID}`,
      `App version: ${payload.appVersion} (${payload.build})`,
      `Platform: ${payload.platform}`,
      `OS version: ${payload.osVersion}`,
      "",
      "User feedback:",
      payload.feedback || "(none provided)",
      "",
      "The sanitized diagnostic trace is attached as crash-trace.txt.",
    ].join("\n"),
  };
}

function encodeBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function cleanField(value, maximumLength) {
  if (typeof value !== "string") return "";
  return value.slice(0, maximumLength).trim();
}

function sanitizeText(value) {
  const sanitizedPaths = value.replace(/\/Users\/[^/\s]+/g, "/Users/<user>");
  if (!sanitizedPaths.includes("@")) return sanitizedPaths;

  // Bound each match so a long trace without a valid address cannot trigger
  // unbounded backtracking while searching for one.
  return sanitizedPaths.replace(
    /[A-Z0-9._%+-]{1,64}@[A-Z0-9.-]{1,253}\.[A-Z]{2,63}/gi,
    "<email>",
  );
}

function originIsAllowed(request, env) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowed = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return allowed.length === 0 || allowed.includes(origin);
}

function responseHeaders(request, env) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  const origin = request.headers.get("origin");
  if (origin && originIsAllowed(request, env)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Vary", "Origin");
  }
  return headers;
}

function json(value, status, headers) {
  return new Response(JSON.stringify(value), { status, headers });
}
