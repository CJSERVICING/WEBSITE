import { json, requireSession, type Env } from "../_lib/auth";

export interface Review {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number; // 1..5
  text: string;
  order: number; // for sorting (lower = first)
  createdAt: number;
  updatedAt: number;
}

const MAX_NAME = 80;
const MAX_LOCATION = 120;
const MAX_SERVICE = 80;
const MAX_TEXT = 1200;
const KV_PREFIX = "review:";

function sanitiseString(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  // Strip control chars except newlines/tabs.
  return input
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function sanitiseRating(input: unknown): number {
  const n = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(n)) return 5;
  return Math.max(1, Math.min(5, Math.round(n)));
}

function newId(): string {
  // 16 random bytes, hex encoded — collision-safe and URL-safe.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, "0");
  return s;
}

function validateReviewBody(body: unknown): { ok: true; value: Omit<Review, "id" | "createdAt" | "updatedAt" | "order"> & { order?: number } } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "invalid_body" };
  const b = body as Record<string, unknown>;
  const name = sanitiseString(b.name, MAX_NAME);
  const location = sanitiseString(b.location, MAX_LOCATION);
  const service = sanitiseString(b.service, MAX_SERVICE);
  const text = sanitiseString(b.text, MAX_TEXT);
  const rating = sanitiseRating(b.rating);
  if (!name || !text) return { ok: false, error: "name_and_text_required" };
  const order = typeof b.order === "number" && Number.isFinite(b.order) ? b.order : undefined;
  return { ok: true, value: { name, location, service, text, rating, order } };
}

async function loadAllReviews(env: Env): Promise<Review[]> {
  const out: Review[] = [];
  let cursor: string | undefined;
  do {
    const page = await env.REVIEWS.list({ prefix: KV_PREFIX, cursor });
    for (const k of page.keys) {
      const raw = await env.REVIEWS.get(k.name);
      if (!raw) continue;
      try {
        out.push(JSON.parse(raw) as Review);
      } catch {
        /* skip malformed */
      }
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  // Order by `order` ascending, then createdAt ascending.
  out.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.createdAt - b.createdAt);
  return out;
}

// GET /api/reviews — public. Returns sanitized list (no internal fields beyond id).
export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const reviews = await loadAllReviews(ctx.env);
  const publicList = reviews.map((r) => ({
    id: r.id,
    name: r.name,
    location: r.location,
    service: r.service,
    rating: r.rating,
    text: r.text,
  }));
  return new Response(JSON.stringify({ reviews: publicList }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Cache at the edge briefly so a quiet site doesn't hammer KV.
      "cache-control": "public, max-age=60, s-maxage=60",
      "x-content-type-options": "nosniff",
    },
  });
};

// POST /api/reviews — admin only. Creates a new review.
export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const session = await requireSession(ctx.env, ctx.request);
  if (session instanceof Response) return session;

  let body: unknown;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ error: "invalid_json" }, { status: 400 });
  }

  const v = validateReviewBody(body);
  if (!v.ok) return json({ error: v.error }, { status: 400 });

  const now = Date.now();
  const review: Review = {
    id: newId(),
    name: v.value.name,
    location: v.value.location,
    service: v.value.service,
    rating: v.value.rating,
    text: v.value.text,
    order: v.value.order ?? now, // default: append (timestamp)
    createdAt: now,
    updatedAt: now,
  };
  await ctx.env.REVIEWS.put(`${KV_PREFIX}${review.id}`, JSON.stringify(review));
  return json({ review }, { status: 201 });
};
