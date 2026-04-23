import { useEffect, useMemo, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, X, Loader2, CheckCircle2 } from "lucide-react";

function formatReviewDate(iso: string): string {
  try {
    const parts = iso.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const date = day
      ? new Date(Number(year), Number(month) - 1, Number(day))
      : new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: day ? "numeric" : undefined,
    });
  } catch {
    return iso;
  }
}

type Review = {
  id?: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date?: string;
  imageUrl?: string;
};

const SERVICES = ["Pressure Washing", "Window Cleaning", "Lawn Mowing"] as const;

// Fallback reviews shown if the KV fetch fails (e.g. local dev without
// wrangler) or the dashboard hasn't been populated yet.
const FALLBACK_REVIEWS: Review[] = [
  {
    name: "Sarah M.",
    location: "West Bridgford, Nottingham",
    rating: 5,
    service: "Pressure washing",
    text: "Couldn't believe the difference — our driveway looks brand new. Turned up on time, polite, and the price was exactly what was quoted. Already booked them in for the patio.",
  },
  {
    name: "James P.",
    location: "Littleover, Derby",
    rating: 5,
    service: "Window cleaning",
    text: "Quick to reply on WhatsApp and gave me a quote the same evening from a couple of photos. Windows are spotless and the frames were done too. Highly recommend.",
  },
  {
    name: "Hannah R.",
    location: "Mapperley, Nottingham",
    rating: 5,
    service: "Patio + sanding",
    text: "Years of moss and grime gone in an afternoon. They re-sanded the joints afterwards and tidied up perfectly. Genuinely lovely lads, fair price.",
  },
];

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerPage(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews", { headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { reviews?: Review[] } | null) => {
        if (cancelled || !data?.reviews) return;
        if (data.reviews.length > 0) setReviews(data.reviews);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(reviews.length / perPage));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  const visible = useMemo(() => {
    const start = page * perPage;
    return reviews.slice(start, start + perPage);
  }, [reviews, page, perPage]);

  const showControls = reviews.length > perPage;

  const go = (dir: -1 | 1) => {
    setPage((p) => (p + dir + totalPages) % totalPages);
  };

  return (
    <div className="relative">
      {showControls && (
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={() => go(-1)}
          className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/95 p-2 shadow-md transition hover:bg-accent hover:text-accent-foreground sm:-left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <div
        className="flex w-full items-stretch justify-center gap-6"
        role="region"
        aria-label="Customer reviews"
      >
        {visible.map((r, idx) => (
          <article
            key={r.id ?? `${r.name}-${page}-${idx}`}
            className="relative flex w-full max-w-md flex-1 flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
          >
            {r.imageUrl && (
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={r.imageUrl}
                  alt={`Work for ${r.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="relative flex flex-1 flex-col p-6">
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">"{r.text}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.location}
                  {r.service ? ` · ${r.service}` : ""}
                  {r.date ? ` · ${formatReviewDate(r.date)}` : ""}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {showControls && (
        <button
          type="button"
          aria-label="Next reviews"
          onClick={() => go(1)}
          className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/95 p-2 shadow-md transition hover:bg-accent hover:text-accent-foreground sm:-right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {showControls && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to reviews page ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
        >
          <Star className="h-4 w-4 fill-current" />
          Leave your own review!
        </button>
      </div>

      {showForm && <ReviewSubmitModal onClose={() => setShowForm(false)} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Customer review submission modal
// ---------------------------------------------------------------------------

interface DraftReview {
  name: string;
  location: string;
  service: (typeof SERVICES)[number];
  rating: number;
  text: string;
  imageUrl: string;
}

const EMPTY_DRAFT: DraftReview = {
  name: "",
  location: "",
  service: "Pressure Washing",
  rating: 5,
  text: "",
  imageUrl: "",
};

function ReviewSubmitModal({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState<DraftReview>(EMPTY_DRAFT);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Lock body scroll while modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const update = <K extends keyof DraftReview>(key: K, value: DraftReview[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const valid =
    draft.name.trim().length > 0 &&
    draft.text.trim().length >= 10 &&
    draft.rating >= 1 && draft.rating <= 5;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !valid) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: draft.name.trim(),
          location: draft.location.trim(),
          service: draft.service,
          rating: draft.rating,
          text: draft.text.trim(),
          imageUrl: draft.imageUrl.trim() || undefined,
        }),
      });
      if (res.status === 429) {
        setError("Too many submissions from this address. Please try again later.");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(
          data.error === "text_too_short"
            ? "Please write at least a sentence or two."
            : data.error === "name_required"
              ? "Please enter your name."
              : "Could not submit your review. Please try again.",
        );
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Leave a review"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Thank you!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your review has been submitted and will appear on the site once it has been approved.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <h3 className="font-display text-2xl font-bold">Leave a review</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us about your experience. Your review will appear here once approved.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Your name
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={draft.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-medium">
                Location <span className="text-muted-foreground">(optional)</span>
                <input
                  type="text"
                  maxLength={120}
                  placeholder="e.g. West Bridgford"
                  value={draft.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
            </div>

            <label className="block text-sm font-medium">
              Service
              <select
                value={draft.service}
                onChange={(e) => update("service", e.target.value as DraftReview["service"])}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend className="text-sm font-medium">Rating</legend>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    aria-label={`${n} star${n === 1 ? "" : "s"}`}
                    onClick={() => update("rating", n)}
                    className="rounded p-1 transition hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        n <= draft.rating ? "fill-current text-accent" : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm font-medium">
              Your review
              <textarea
                required
                maxLength={1200}
                rows={5}
                value={draft.text}
                onChange={(e) => update("text", e.target.value)}
                className="mt-1 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Tell us how it went…"
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                {draft.text.length}/1200 characters · minimum 10
              </span>
            </label>

            <label className="block text-sm font-medium">
              Photo URL <span className="text-muted-foreground">(optional, https://)</span>
              <input
                type="url"
                maxLength={500}
                placeholder="https://example.com/photo.jpg"
                value={draft.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>

            {error && (
              <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="rounded-md border border-input px-4 py-2 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !valid}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
