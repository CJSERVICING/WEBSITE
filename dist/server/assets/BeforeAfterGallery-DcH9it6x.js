import { T as jsxRuntimeExports, r as reactExports } from "./worker-entry-CIoqu0JI.js";
const before1 = "/assets/before-1-6LHGdBeQ.jpg";
const after1 = "/assets/after-1-TsW4uw2P.jpg";
const before2 = "/assets/before-2-D5npDxeW.jpg";
const after2 = "/assets/after-2-EMGfBlOF.jpg";
const before3 = "/assets/before-3-YuFC1-bk.jpg";
const after3 = "/assets/after-3-8ObJpjMk.jpg";
const pairs = [
  { before: before1, after: after1, label: "Block-paved driveway — Nottingham" },
  { before: before2, after: after2, label: "Rear patio clean — Derby" },
  { before: before3, after: after3, label: "Garden patio path restoration" }
];
function Slider({ pair }) {
  const [pos, setPos] = reactExports.useState(50);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: pair.after,
          alt: `After: ${pair.label}`,
          className: "absolute inset-0 h-full w-full object-cover",
          draggable: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 overflow-hidden",
          style: { width: `${pos}%` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: pair.before,
              alt: `Before: ${pair.label}`,
              className: "absolute inset-0 h-full w-full object-cover",
              style: { width: `${100 / pos * 100}%`, maxWidth: "none" },
              draggable: false
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow", children: "Before" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow", children: "After" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]",
          style: { left: `${pos}%` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 6 3 12l6 6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m15 6 6 6-6 6" })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value: pos,
          onChange: (e) => setPos(Number(e.target.value)),
          "aria-label": `Reveal slider for ${pair.label}`,
          className: "absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-sm font-medium text-muted-foreground", children: pair.label })
  ] });
}
function BeforeAfterGallery() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-3", children: pairs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { pair: p }, p.label)) });
}
export {
  BeforeAfterGallery as B
};
