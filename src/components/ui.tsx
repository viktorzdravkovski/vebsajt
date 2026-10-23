import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.inview = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.inview = "true";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <div className="reveal-rule h-px w-full bg-line" />
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="reveal-heading display text-[clamp(2.8rem,6.5vw,5.25rem)]">{title}</h2>
            <p className="reveal-note max-w-[38ch] text-sm leading-relaxed text-muted md:pb-2">
              {note}
            </p>
          </div>
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-electric"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

/*
 * CircuitBackground — the fixed page background. A PCB-style re-drawing of the
 * hand-sketched fog-light schematic: +12V rail, hi-beam and fog switches, the
 * three MOSFETs (2N7000 / IRF4905 / IRF1404), gate resistors, SB560 clamps and
 * the hatched "fog light" module. Current pulses travel the traces, the Hi/Lo
 * LEDs breathe in opposition, and the whole board drifts very slowly.
 */

const TRACE_PATHS = [
  "M95 140 H880", // +12V rail
  "M128 140 V788", // fog switch drop
  "M142 824 V884 H380", // from fog switch to the gate resistor pair
  "M440 884 H508", // into T3 gate
  "M330 884 V932", // T3 gate pull-down
  "M330 994 V1018", // pull-down to ground
  "M183 140 V212", // hi-beam switch drop
  "M198 252 V376", // hi-beam to T1 gate
  "M198 376 H320", // hi-beam wire into the 12Ω run
  "M380 376 H410", // 12Ω into T1 gate
  "M250 376 V424", // T1 gate pull-down
  "M250 488 V518", // pull-down to ground
  "M380 140 V310", // rail through the 1kΩ, down to the gate node
  "M380 310 H568", // node into T2 gate
  "M380 310 V330 H440 V348", // node down into T1 drain
  "M440 408 V440", // T1 source to ground
  "M600 140 V280", // rail into T2 source
  "M600 340 V574", // T2 drain into the Hi LED
  "M600 440 H500", // branch off the Hi line
  "M500 492 V750", // D1 down to the cathode bus
  "M860 140 V400", // rail through D2
  "M860 454 V592 H732", // D2 down into the Lo LED
  "M600 630 V750", // Hi cathode to the bus
  "M720 648 V750", // Lo cathode to the bus
  "M500 750 H742", // cathode bus
  "M540 750 V852", // bus down into T3 drain
  "M540 916 V946", // T3 source to ground
  "M110 1082 H430 V1152 H610", // ambient trace sweep
  "M700 1050 V1140 H544", // ambient trace sweep
];

const VIA_MARKS = [
  { x: 128, y: 788 },
  { x: 142, y: 884 },
  { x: 440, y: 330 },
  { x: 860, y: 460 },
  { x: 736, y: 592 },
  { x: 540, y: 750 },
  { x: 610, y: 1152 },
  { x: 544, y: 1140 },
];

const BLINKING_VIAS = [
  { x: 880, y: 140, delay: "4.5s" },
  { x: 500, y: 440, delay: "9s" },
  { x: 110, y: 1082, delay: "13.5s" },
  { x: 700, y: 1050, delay: "18s" },
];

const JUNCTIONS = [
  { x: 380, y: 140 },
  { x: 600, y: 140 },
  { x: 860, y: 140 },
  { x: 380, y: 310 },
  { x: 250, y: 376 },
  { x: 600, y: 440 },
  { x: 330, y: 884 },
  { x: 500, y: 750 },
  { x: 600, y: 750 },
  { x: 720, y: 750 },
];

const PULSE_PATHS = [
  { d: "M95 140 H880", dur: "7.6s", delay: "0s" },
  { d: "M600 140 V570", dur: "4.6s", delay: "1.2s" },
  { d: "M860 140 V590 H730", dur: "6.6s", delay: "2.3s" },
  { d: "M600 440 H500 V748", dur: "5.2s", delay: "1.8s" },
  { d: "M600 628 V750 H540 V946", dur: "5.8s", delay: "3.3s" },
  { d: "M380 310 H564", dur: "3.6s", delay: "4.6s" },
  { d: "M198 254 V376 H400", dur: "4.4s", delay: "5.8s" },
  { d: "M144 884 H498", dur: "5.4s", delay: "7.2s" },
  { d: "M110 1082 H430 V1152 H610", dur: "9.5s", delay: "1s" },
];

type Label = { x: number; y: number; t: string; anchor?: "start" | "middle" | "end"; sm?: boolean };

const SILK_LABELS: Label[] = [
  { x: 104, y: 124, t: "+12V" },
  { x: 218, y: 228, t: "Hi beam" },
  { x: 402, y: 198, t: "1kΩ" },
  { x: 350, y: 360, t: "12Ω", anchor: "middle" },
  { x: 272, y: 460, t: "1kΩ" },
  { x: 480, y: 508, t: "D1", anchor: "end" },
  { x: 868, y: 470, t: "D2", anchor: "start" },
  { x: 562, y: 508, t: "Hi" },
  { x: 738, y: 508, t: "Lo" },
  { x: 652, y: 676, t: "fog light", anchor: "middle" },
  { x: 156, y: 822, t: "Fog SW" },
  { x: 410, y: 864, t: "12Ω", anchor: "middle" },
  { x: 352, y: 966, t: "1kΩ" },
  { x: 664, y: 240, t: "T1 : 2N7000" },
  { x: 664, y: 284, t: "T2 : IRF4905" },
  { x: 664, y: 328, t: "T3 : IRF1404" },
  { x: 664, y: 372, t: "D1,2 : SB560" },
];

const PIN_LABELS: Label[] = [
  { x: 556, y: 272, t: "T2", sm: true },
  { x: 612, y: 274, t: "S", sm: true },
  { x: 552, y: 316, t: "G", sm: true },
  { x: 612, y: 354, t: "D", sm: true },
  { x: 406, y: 334, t: "T1", sm: true },
  { x: 452, y: 344, t: "D", sm: true },
  { x: 414, y: 384, t: "G", sm: true },
  { x: 452, y: 414, t: "S", sm: true },
  { x: 488, y: 858, t: "T3", sm: true },
  { x: 558, y: 848, t: "D", sm: true },
  { x: 486, y: 890, t: "G", sm: true },
  { x: 558, y: 918, t: "S", sm: true },
];

function Via({ x, y, blink, delay }: { x: number; y: number; blink?: boolean; delay?: string }) {
  return (
    <g className={blink ? "circuit-via-blink" : undefined}>
      <circle
        className="circuit-via-ring"
        cx={x}
        cy={y}
        r="5"
        style={blink ? { animationDelay: delay } : undefined}
      />
      <circle className="circuit-via-core" cx={x} cy={y} r="1.9" />
    </g>
  );
}

function Ground({ x, y }: { x: number; y: number }) {
  return (
    <g className="circuit-trace">
      <path d={`M${x} ${y} v 9`} />
      <path d={`M${x - 10} ${y + 10} h 20 M${x - 6} ${y + 14} h 12 M${x - 2} ${y + 18} h 4`} />
    </g>
  );
}

/** Vertical MOSFET outline drawn inside its silkscreen circle. */
function Mosfet({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="circuit-trace">
      <circle className="circuit-outline" cx={cx} cy={cy} r="30" />
      <path
        d={`M${cx - 30} ${cy} H${cx - 14} M${cx - 14} ${cy - 14} V${cy + 14}
            M${cx - 5} ${cy - 16} V${cy + 16}
            M${cx - 5} ${cy - 11} H${cx + 12} V${cy - 27}
            M${cx - 5} ${cy + 11} H${cx + 12} V${cy + 27}`}
      />
    </g>
  );
}

/** LED symbol pointing down, with two emission rays. */
function Led({ x, y, delay }: { x: number; y: number; delay: string }) {
  return (
    <g>
      <path
        className="circuit-led-glow"
        style={{ animationDelay: delay }}
        d={`M${x - 12} ${y} H${x + 12} L${x} ${y + 52} Z
            M${x - 15} ${y + 55} H${x + 15}
            M${x + 6} ${y + 34} L${x + 24} ${y + 52} M${x + 24} ${y + 52} L${x + 15} ${y + 50} M${x + 24} ${y + 52} L${x + 22} ${y + 43}
            M${x + 14} ${y + 26} L${x + 30} ${y + 42} M${x + 30} ${y + 42} L${x + 21} ${y + 40} M${x + 30} ${y + 42} L${x + 28} ${y + 33}`}
      />
      <path className="circuit-trace" d={`M${x} ${y + 58} V750`} />
    </g>
  );
}

/** Vertical diode symbol (current flows top to bottom). */
function Diode({ x, y }: { x: number; y: number }) {
  return (
    <path
      className="circuit-trace"
      d={`M${x - 14} ${y} H${x + 14} L${x} ${y + 44} Z
          M${x - 15} ${y + 47} H${x + 15}`}
    />
  );
}

/** Horizontal resistor body (PCB box style). */
function ResistorH({ x, y }: { x: number; y: number }) {
  return <rect className="circuit-outline" x={x} y={y - 12} width="60" height="24" rx="2" />;
}

function ResistorV({ x, y }: { x: number; y: number }) {
  return <rect className="circuit-outline" x={x - 12} y={y} width="24" height="62" rx="2" />;
}

function Labels({ items }: { items: Label[] }) {
  return (
    <>
      {items.map((label) => (
        <text
          key={`${label.x}-${label.y}`}
          x={label.x}
          y={label.y}
          textAnchor={label.anchor ?? "start"}
          className={`circuit-label ${label.sm ? "circuit-label-sm" : ""}`.trim()}
        >
          {label.t}
        </text>
      ))}
    </>
  );
}

export function CircuitBackground() {
  return (
    <div
      aria-hidden="true"
      className="circuit-bg pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bone"
    >
      <div className="circuit-dotgrid" />
      <svg
        className="circuit-svg"
        viewBox="0 0 900 1200"
        fill="none"
        focusable="false"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <defs>
          <pattern
            id="circuit-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(220,246,235,0.16)" strokeWidth="1" />
          </pattern>
        </defs>

        <g className="circuit-boot" style={{ animationDelay: "0.05s" }}>
          <path className="circuit-trace" d="M95 140 H880" />
          <path className="circuit-trace circuit-arrow" d="M95 140 L84 124 M84 124 l 10 0 M84 124 l -1 10" />
        </g>

        <g className="circuit-boot" style={{ animationDelay: "0.3s" }}>
          {TRACE_PATHS.map((d) => (
            <path key={d} className="circuit-trace" d={d} />
          ))}
          <path className="circuit-trace" d="M128 788 L147 777" />
          <path className="circuit-trace" d="M183 212 L201 202" />
          {[128, 142, 183].map((x, index) => (
            <circle
              key={x}
              className="circuit-dot"
              cx={x}
              cy={[788, 824, 212][index]}
              r="3"
            />
          ))}
          <circle className="circuit-dot" cx="198" cy="252" r="3" />
        </g>

        <g className="circuit-boot" style={{ animationDelay: "0.55s" }}>
          <ResistorV x={380} y={164} />
          <ResistorH x={320} y={376} />
          <ResistorH x={380} y={884} />
          <ResistorV x={330} y={932} />
          <ResistorV x={250} y={424} />
          <Mosfet cx={440} cy={378} />
          <Mosfet cx={600} cy={310} />
          <Mosfet cx={540} cy={884} />
          <Diode x={500} y={442} />
          <Diode x={860} y={402} />
          <Led x={600} y={574} delay="0s" />
          <Led x={720} y={592} delay="1.8s" />
          <rect className="circuit-block" x="540" y="516" width="260" height="184" />
          <rect className="circuit-hatch" x="546" y="522" width="248" height="172" fill="url(#circuit-hatch)" />
        </g>

        <g className="circuit-boot" style={{ animationDelay: "0.75s" }}>
          {JUNCTIONS.map((dot) => (
            <circle key={`${dot.x}-${dot.y}`} className="circuit-junction" cx={dot.x} cy={dot.y} r="3" />
          ))}
          {VIA_MARKS.map((via) => (
            <Via key={`${via.x}-${via.y}`} x={via.x} y={via.y} />
          ))}
          {BLINKING_VIAS.map((via) => (
            <Via key={`${via.x}-b`} x={via.x} y={via.y} blink delay={via.delay} />
          ))}
          <Ground x={440} y={440} />
          <Ground x={250} y={518} />
          <Ground x={540} y={946} />
          <Ground x={330} y={1018} />
        </g>

        <g className="circuit-boot" style={{ animationDelay: "0.9s" }}>
          <Labels items={SILK_LABELS} />
          <Labels items={PIN_LABELS} />
        </g>

        <g className="circuit-boot" style={{ animationDelay: "1.05s" }}>
          {PULSE_PATHS.map((pulse) => (
            <path
              key={pulse.d}
              className="circuit-pulse"
              pathLength={1}
              d={pulse.d}
              style={{
                animationDuration: pulse.dur,
                animationDelay: pulse.delay,
              }}
            />
          ))}
        </g>
      </svg>
      <div className="grain" />
    </div>
  );
}
