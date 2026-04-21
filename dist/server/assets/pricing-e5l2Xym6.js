import { T as jsxRuntimeExports } from "./worker-entry-CIoqu0JI.js";
import { P as PriceCalculator } from "./PriceCalculator-C9olyK32.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-BTvmfPph.js";
import "./label-CIYrJhS9.js";
const rows = [{
  service: "Pressure Washing",
  base: "£2.50 / sqm",
  notes: "+£0.50/sqm Stone Snow Washing • +£0.50/sqm Sanding"
}, {
  service: "Window Cleaning — Large",
  base: "£10 / window",
  notes: "Frames & sills wiped"
}, {
  service: "Window Cleaning — Medium",
  base: "£5 / window",
  notes: "Streak-free finish"
}, {
  service: "Window Cleaning — Small",
  base: "£2.50 / window",
  notes: "Pure water reach-and-wash"
}, {
  service: "Lawn Mowing",
  base: "£0.25 / sqm",
  notes: "Edges trimmed, clippings removed"
}];
function PricingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-wider text-primary", children: "Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-extrabold sm:text-5xl", children: "Simple, transparent prices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Use the calculator for an instant estimate, then call or email for a confirmed quote." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-primary/5 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Price" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: r.service }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.notes })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 font-semibold text-primary", children: r.base })
        ] }, r.service)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PriceCalculator, {})
    ] }) })
  ] });
}
export {
  PricingPage as component
};
