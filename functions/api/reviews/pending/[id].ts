import { json, requireSession, type Env } from "../../../_lib/auth";

const PENDING_PREFIX = "pending:";
const APPROVED_PREFIX = "review:";

function isValidId(id: string): boolean {
  return /^[a-f0-9]{32}$/.test(id);
}

interface PendingShape {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  date?: string;
  imageUrl?: string;
  order?: number;
  createdAt: number;
  updatedAt: number;
  status?: string;
  submittedFromIp?: string;
  [key: string]: unknown;
}

// POST /api/reviews/pending/:id  — approve, moves to public namespace.
export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const session = await requireSession(ctx.env, ctx.request);
  if (session instanceof Response) return session;

  const id = String(ctx.params.id ?? "");
  if (!isValidId(id)) return json({ error: "invalid_id" }, { status: 400 });

  const raw = await ctx.env.REVIEWS.get(`${PENDING_PREFIX}${id}`);
  if (!raw) return json({ error: "not_found" }, { status: 404 });

  let pending: PendingShape;
  try {
    pending = JSON.parse(raw) as PendingShape;
  } catch {
    return json({ error: "corrupt_record" }, { status: 500 });
  }

  const now = Date.now();
  const approved = {
    id: pending.id,
    name: pending.name,
    location: pending.location ?? "",
    service: pending.service,
    rating: pending.rating,
    text: pending.text,
    date: pending.date,
    imageUrl: pending.imageUrl,
    order: typeof pending.order === "number" && Number.isFinite(pending.order) ? pending.order : now,
    createdAt: pending.createdAt ?? now,
    updatedAt: now,
  };

  await ctx.env.REVIEWS.put(`${APPROVED_PREFIX}${id}`, JSON.stringify(approved));
  await ctx.env.REVIEWS.delete(`${PENDING_PREFIX}${id}`);
  return json({ review: approved });
};

// DELETE /api/reviews/pending/:id  — reject, removes the pending record.
export const onRequestDelete: PagesFunction<Env> = async (ctx) => {
  const session = await requireSession(ctx.env, ctx.request);
  if (session instanceof Response) return session;

  const id = String(ctx.params.id ?? "");
  if (!isValidId(id)) return json({ error: "invalid_id" }, { status: 400 });

  await ctx.env.REVIEWS.delete(`${PENDING_PREFIX}${id}`);
  return json({ ok: true });
};
