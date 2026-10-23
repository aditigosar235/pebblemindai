import assert from "node:assert/strict";
import test from "node:test";
import worker, { buildMessage, validatePayload } from "../src/index.js";

const basePayload = {
  reportID: "A1B2C3",
  trace: "trace line 1\ntrace line 2",
  feedback: "It crashed after tapping Run.",
  appVersion: "1.0.7",
  build: "39",
  platform: "iOS",
  osVersion: "iOS 26.0",
};

test("accepts a valid diagnostic payload and ignores untrusted email fields", () => {
  const result = validatePayload({
    ...basePayload,
    trace: "trace from /Users/trishala/Library/Crash.log user@example.com",
    feedback: "Contact user@example.com if needed.",
    email: "user@example.com",
  });

  assert.equal(result.ok, true);
  assert.equal(result.value.trace, "trace from /Users/<user>/Library/Crash.log <email>");
  assert.equal(result.value.feedback, "Contact <email> if needed.");
  assert.equal("email" in result.value, false);
});

test("rejects missing traces and invalid report identifiers", () => {
  assert.deepEqual(validatePayload({ ...basePayload, trace: "" }), {
    ok: false,
    error: "trace_required",
  });
  assert.deepEqual(validatePayload({ ...basePayload, reportID: "../../mail" }), {
    ok: false,
    error: "report_id_invalid",
  });
});

test("bounds diagnostic payload size", () => {
  const result = validatePayload({ ...basePayload, trace: "x".repeat(512 * 1024 + 1) });
  assert.deepEqual(result, { ok: false, error: "trace_too_large" });
});

test("builds a generic sender message without a user email", () => {
  const message = buildMessage(basePayload);

  assert.match(message.subject, /^\[Pebble Mind\] Crash report/);
  assert.match(message.text, /It crashed after tapping Run/);
  assert.match(message.text, /sanitized diagnostic trace is attached as crash-trace\.txt/);
  assert.equal(message.text.includes("trace line 2"), false);
  assert.equal(message.text.includes("user@example.com"), false);
});

test("health endpoint does not call the email provider", async () => {
  const originalFetch = globalThis.fetch;
  let providerCalled = false;
  globalThis.fetch = async () => {
    providerCalled = true;
    throw new Error("provider should not be called by health check");
  };

  try {
    const response = await worker.fetch(new Request("https://worker.example/"), {});
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      service: "pebble-mind-crash-report",
      status: "ok",
    });
    assert.equal(providerCalled, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("sends the sanitized UTF-8 trace as an attachment to the server-owned recipient", async () => {
  const originalFetch = globalThis.fetch;
  let providerRequest;
  const rawTrace = [
    "Crash at /Users/trishala/Library/Crash.log user@example.com",
    "Unicode: café 🧭",
    "frame ".repeat(6_000),
  ].join("\n");
  const sanitizedTrace = `Crash at /Users/<user>/Library/Crash.log <email>\nUnicode: café 🧭\n${"frame ".repeat(6_000)}`;
  globalThis.fetch = async (input, init) => {
    providerRequest = { input, init };
    return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
  };

  try {
    const response = await worker.fetch(
      new Request("https://worker.example/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...basePayload,
          trace: rawTrace,
          email: "user@example.com",
        }),
      }),
      {
        RESEND_API_KEY: "server-only-key",
        CRASH_REPORT_FROM: "Pebble Mind Support <support@example.com>",
        CRASH_REPORT_TO: "maintainer@example.com",
      },
    );

    assert.equal(response.status, 202);
    assert.deepEqual(await response.json(), { accepted: true, reportID: "A1B2C3" });
    assert.equal(providerRequest.input, "https://api.resend.com/emails");
    const providerBody = JSON.parse(providerRequest.init.body);
    assert.deepEqual(providerBody.from, "Pebble Mind Support <support@example.com>");
    assert.deepEqual(providerBody.to, ["maintainer@example.com"]);
    assert.equal(providerBody.text.includes("user@example.com"), false);
    assert.equal(providerBody.text.includes("Crash at /Users"), false);
    assert.match(providerBody.text, /crash-trace\.txt/);
    assert.equal(providerBody.attachments.length, 1);
    assert.equal(providerBody.attachments[0].filename, "crash-trace.txt");
    assert.equal(providerBody.attachments[0].content_type, "text/plain");
    const attachmentBytes = Uint8Array.from(
      atob(providerBody.attachments[0].content),
      (character) => character.charCodeAt(0),
    );
    assert.equal(
      new TextDecoder().decode(attachmentBytes),
      sanitizedTrace,
    );
    assert.equal(providerBody.email, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("attaches the largest accepted trace without overflowing base64 encoding", async () => {
  const originalFetch = globalThis.fetch;
  let providerBody;
  const trace = "x".repeat(512 * 1024 - 17) + " user@example.com";
  const sanitizedTrace = "x".repeat(512 * 1024 - 17) + " <email>";
  assert.equal(new TextEncoder().encode(trace).byteLength, 512 * 1024);
  globalThis.fetch = async (_input, init) => {
    providerBody = JSON.parse(init.body);
    return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
  };

  try {
    const response = await worker.fetch(
      new Request("https://worker.example/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...basePayload, trace }),
      }),
      {
        RESEND_API_KEY: "server-only-key",
        CRASH_REPORT_FROM: "Pebble Mind Support <support@example.com>",
        CRASH_REPORT_TO: "maintainer@example.com",
      },
    );

    assert.equal(response.status, 202);
    const attachment = providerBody.attachments[0];
    assert.equal(
      attachment.content.length,
      4 * Math.ceil(new TextEncoder().encode(sanitizedTrace).byteLength / 3),
    );
    const decoded = Uint8Array.from(atob(attachment.content), (character) => character.charCodeAt(0));
    assert.equal(new TextDecoder().decode(decoded), sanitizedTrace);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
