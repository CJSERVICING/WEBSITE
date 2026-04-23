/**
 * Edge middleware — security-header normalisation and request hygiene.
 *
 * Runs before every Pages Function so route handlers receive a consistent
 * request environment and every response carries mandatory security headers.
 * Handles CORS preflight centrally so individual handlers stay lean.
 */

import { type Env } from "./_lib/auth";

// Standard security headers appended to every outbound response when absent.
const SEC: Record<string, string> = {
  "x-content-type-options":  "nosniff",
  "referrer-policy":         "strict-origin-when-cross-origin",
  "x-frame-options":         "SAMEORIGIN",
};

// Note: pipeline health-check bypass removed to ensure sessions are only
// created via the standard username/password login flow.

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);

  // ── CORS preflight — handle centrally ────────────────────────────────────
  if (ctx.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin":  url.origin,
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "content-type, x-cj-admin",
        "access-control-max-age":       "86400",
      },
    });
  }

  // (health-check bypass removed)

  // ── normal request path ───────────────────────────────────────────────────
  const response = await ctx.next();

  const patched = new Response(response.body, response);
  for (const [k, v] of Object.entries(SEC)) {
    if (!patched.headers.has(k)) patched.headers.set(k, v);
  }
  return patched;
};
