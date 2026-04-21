import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CIoqu0JI.js";
import { c as createLucideIcon, a as cn, B as Button, M as Mail, P as Phone, b as MapPin } from "./router-BTvmfPph.js";
import { L as Label, I as Input } from "./label-CIYrJhS9.js";
import { C as Clock } from "./clock-CQNy3izw.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function QuoteForm() {
  const [service, setService] = reactExports.useState("Pressure Washing");
  const [sent, setSent] = reactExports.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const postcode = String(form.get("postcode") || "");
    const details = String(form.get("details") || "");
    const subject = encodeURIComponent(`Quote request — ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}
Phone: ${phone}
Postcode: ${postcode}
Service: ${service}

Details:
${details}`
    );
    window.location.href = `mailto:ServicingCJ@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Request a Free Quote" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Most quotes answered within hours — same day where possible." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Your Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", name: "name", required: true, className: "mt-1.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", name: "phone", type: "tel", required: true, className: "mt-1.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "postcode", children: "Postcode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "postcode", name: "postcode", required: true, className: "mt-1.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "service", children: "Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "service",
                value: service,
                onChange: (e) => setService(e.target.value),
                className: "mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Pressure Washing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Window Cleaning" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Lawn Mowing" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "details", children: "Job Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "details",
              name: "details",
              rows: 4,
              placeholder: "Approx area, condition, access notes…",
              className: "mt-1.5"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", variant: "cta", size: "lg", className: "mt-6 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
          " Send Quote Request"
        ] }),
        sent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-sm text-accent-foreground", children: "Opening your email app… you can also email us directly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "mailto:ServicingCJ@gmail.com",
            className: "mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
              " Or email photos to ServicingCJ@gmail.com"
            ]
          }
        )
      ]
    }
  );
}
function ContactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-primary", children: "Contact Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-extrabold sm:text-5xl", children: "Get in touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Phone is the fastest way to reach us — most quotes are answered within hours." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-6 w-6" }), label: "Call us (fastest)", value: "07554639668", hint: "Best for immediate quotes and bookings", cta: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", size: "lg", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:07554639668", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
          " Call 07554639668"
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-6 w-6" }), label: "Email us", value: "ServicingCJ@gmail.com", hint: "Send photos for an accurate quote", cta: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "cta", size: "lg", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:ServicingCJ@gmail.com", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
          " Email Photos"
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }), title: "Service Area", text: "Nottingham & Derby and surrounding areas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }), title: "Response Time", text: "Most quotes within hours — same day where possible" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteForm, {})
    ] })
  ] }) });
}
function ContactCard({
  icon,
  label,
  value,
  hint,
  cta
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: hint })
      ] })
    ] }),
    cta
  ] });
}
function InfoBox({
  icon,
  title,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: text })
  ] });
}
export {
  ContactPage as component
};
