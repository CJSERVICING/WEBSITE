import { Star, Quote } from "lucide-react";

type Review = { name: string; location: string; rating: number; text: string; service: string };

const reviews: Review[] = [
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
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {reviews.map((r) => (
        <article
          key={r.name}
          className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
          <div className="flex gap-0.5 text-accent">
            {Array.from({ length: r.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">"{r.text}"</p>
          <div className="mt-5 border-t border-border pt-4">
            <p className="font-semibold">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.location} · {r.service}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
