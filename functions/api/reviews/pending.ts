import { json, requireSession, type Env } from "../../_lib/auth";

const PENDING_PREFIX = "pending:";

interface PendingReview {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  imageUrl?: string;
  createdAt: number;
  updatedAt: number;
  status: "pending";
  submittedFromIp?: string;
  order?: number;
}

// GET /api/reviews/pending — list all queued submissions, newest first.
export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const session = await requireSession(ctx.env, ctx.request);
  if (session instanceof Response) return session;

  const out: PendingReview[] = [];
  let cursor: string | undefined;
  do {
    const page = await ctx.env.REVIEWS.list({ prefix: PENDING_PREFIX, cursor });
    for (const k of page.keys) {
      const raw = await ctx.env.REVIEWS.get(k.name);
      if (!raw) continue;
      try {
        out.push(JSON.parse(raw) as PendingReview);
      } catch {
        /* skip */
      }
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  out.sort((a, b) => b.createdAt - a.createdAt);
  return json({ pending: out });
};
