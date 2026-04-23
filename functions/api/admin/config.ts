import { json, requireSession, type Env } from "../../_lib/auth";

const CONFIG_KEY = "config:moderation";

// GET /api/admin/config — returns current moderation mode.
export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const session = await requireSession(ctx.env, ctx.request);
  if (session instanceof Response) return session;

  const raw = await ctx.env.AUTH.get(CONFIG_KEY);
  // Default: moderation on (false = auto-approve off).
  const autoApprove = raw === "1";
  return json({ autoApprove });
};

// POST /api/admin/config — sets moderation mode.
// Body: { autoApprove: boolean }
export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const session = await requireSession(ctx.env, ctx.request);
  if (session instanceof Response) return session;

  let body: { autoApprove?: unknown };
  try {
    body = (await ctx.request.json()) as { autoApprove?: unknown };
  } catch {
    return json({ error: "invalid_json" }, { status: 400 });
  }

  const autoApprove = body.autoApprove === true;
  if (autoApprove) {
    await ctx.env.AUTH.put(CONFIG_KEY, "1");
  } else {
    await ctx.env.AUTH.delete(CONFIG_KEY);
  }
  return json({ autoApprove });
};
