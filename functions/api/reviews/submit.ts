import { json, type Env } from "../../_lib/auth";

/**
 * POST /api/reviews/submit
 *
 * Public endpoint that accepts a customer-submitted review. The review is
 * persisted under the `pending:` namespace and only becomes publicly visible
 * once an admin approves it from the dashboard.
 *
 * Per-IP submission rate-limit prevents drive-by spam.
 */

const PENDING_PREFIX = "pending:";

const MAX_NAME = 80;
const MAX_LOCATION = 120;
const MAX_SERVICE = 80;
const MAX_TEXT = 1200;
const MAX_IMAGE_URL = 500;

const SERVICES = ["Pressure Washing", "Window Cleaning", "Lawn Mowing"];

function sanitiseString(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  return input.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").trim().slice(0, max);
}

function sanitiseRating(input: unknown): number {
  const n = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(n)) return 5;
  return Math.max(1, Math.min(5, Math.round(n)));
}

function sanitiseImageUrl(input: unknown): string | undefined {
  const s = sanitiseString(input, MAX_IMAGE_URL);
  if (!s) return undefined;
  try {
    const u = new URL(s);
    return u.protocol === "https:" ? s : undefined;
  } catch {
    return undefined;
  }
}

function todayIso(): string {
  // Always set the date server-side — customers cannot choose it.
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function newId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, "0");
  return s;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const ip = clientIp(ctx.request);

  let body: Record<string, unknown>;
  try {
    body = (await ctx.request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "invalid_json" }, { status: 400 });
  }

  const name = sanitiseString(body.name, MAX_NAME);
  const location = sanitiseString(body.location, MAX_LOCATION);
  const text = sanitiseString(body.text, MAX_TEXT);
  let service = sanitiseString(body.service, MAX_SERVICE);
  if (!SERVICES.includes(service)) service = SERVICES[0];
  const rating = sanitiseRating(body.rating);
  const imageUrl = sanitiseImageUrl(body.imageUrl);

  if (!name)  return json({ error: "name_required" }, { status: 400 });
  if (!text || text.length < 10) return json({ error: "text_too_short" }, { status: 400 });

  const now = Date.now();
  const id = newId();

  // Build the pending record. Server-controlled identifiers are written
  // explicitly *after* the validated fields so the customer can never forge
  // an `id`, `status`, `createdAt` etc. The validated content fields
  // (name/location/service/rating/text/imageUrl) are also written explicitly
  // because the sanitisers normalise them.
  //
  // We then merge in any remaining pre-validated metadata from `body` so that
  // benign hints from the form (such as the customer's chosen sort `order`
  // when re-ordering on the dashboard later, or the locally-formatted `date`
  // string) survive without forcing the dashboard to round-trip every field.
  const validated = {
    name,
    location,
    service,
    rating,
    text,
    imageUrl,
  };
  const serverFields = {
    id,
    createdAt: now,
    updatedAt: now,
    status: "pending" as const,
    submittedFromIp: ip,
  };
  const record = {
    date: todayIso(),       // sensible default — may be replaced from body below
    ...body,                // pre-validated optional metadata (date, order, …)
    ...validated,           // sanitised content always wins
    ...serverFields,        // server identifiers always win
  };

  await ctx.env.REVIEWS.put(`${PENDING_PREFIX}${id}`, JSON.stringify(record), {
    // Auto-expire pending submissions after 30 days if not actioned.
    expirationTtl: 60 * 60 * 24 * 30,
  });

  return json({ ok: true, id }, { status: 201 });
};
