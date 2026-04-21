import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CIoqu0JI.js";
import { c as createLucideIcon, B as Button } from "./router-BTvmfPph.js";
import { L as Label, I as Input } from "./label-CIYrJhS9.js";
const __iconNode = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode);
function PriceCalculator() {
  const [service, setService] = reactExports.useState("pressure");
  const [sqm, setSqm] = reactExports.useState(20);
  const [large, setLarge] = reactExports.useState(0);
  const [medium, setMedium] = reactExports.useState(0);
  const [small, setSmall] = reactExports.useState(0);
  const [snow, setSnow] = reactExports.useState(false);
  const [sanding, setSanding] = reactExports.useState(false);
  const [shown, setShown] = reactExports.useState(null);
  const total = reactExports.useMemo(() => {
    if (service === "pressure") {
      let r = 2.5 + (snow ? 0.5 : 0) + (sanding ? 0.5 : 0);
      return r * sqm;
    }
    if (service === "window") {
      return large * 10 + medium * 5 + small * 2.5;
    }
    return 0.25 * sqm;
  }, [service, sqm, large, medium, small, snow, sanding]);
  const services = [
    { id: "pressure", label: "Pressure Washing" },
    { id: "window", label: "Window Cleaning" },
    { id: "lawn", label: "Lawn Mowing" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Instant Price Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Estimate your job in seconds" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-2 block text-sm font-medium", children: "Select Service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setService(s.id);
            setShown(null);
          },
          className: `rounded-lg border px-3 py-2.5 text-sm font-medium transition ${service === s.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/50"}`,
          children: s.label
        },
        s.id
      )) })
    ] }),
    (service === "pressure" || service === "lawn") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sqm", className: "mb-2 block text-sm font-medium", children: "Square Meters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "sqm", type: "number", min: 0, value: sqm, onChange: (e) => setSqm(+e.target.value || 0) })
    ] }),
    service === "pressure" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-2 rounded-lg bg-muted/50 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Add-ons" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: snow, onChange: (e) => setSnow(e.target.checked) }),
        "Stone Snow Washing (+£0.50/sqm)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: sanding, onChange: (e) => setSanding(e.target.checked) }),
        "Sanding (+£0.50/sqm)"
      ] })
    ] }),
    service === "window" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1 block text-xs", children: "Large (£10)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: large, onChange: (e) => setLarge(+e.target.value || 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1 block text-xs", children: "Medium (£5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: medium, onChange: (e) => setMedium(+e.target.value || 0) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1 block text-xs", children: "Small (£2.50)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: small, onChange: (e) => setSmall(+e.target.value || 0) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "hero", size: "lg", className: "w-full", onClick: () => setShown(total), children: "Calculate Price" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Estimated Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-display text-4xl font-bold text-primary", children: [
        "£",
        (shown ?? 0).toFixed(2)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Final price confirmed after a free no-obligation quote." })
    ] })
  ] });
}
export {
  PriceCalculator as P
};
