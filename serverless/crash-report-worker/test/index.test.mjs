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
  assert.match(message.text, /trace line 2/);
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

test("posts only the server-owned sender and recipient to the email provider", async () => {
  const originalFetch = globalThis.fetch;
  let providerRequest;
  globalThis.fetch = async (input, init) => {
    providerRequest = { input, init };
    return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
  };

  try {
    const response = await worker.fetch(
      new Request("https://worker.example/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...basePayload, email: "user@example.com" }),
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
    assert.equal(providerBody.email, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
