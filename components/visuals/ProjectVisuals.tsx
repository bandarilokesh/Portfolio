"use client";

import { motion, useReducedMotion } from "framer-motion";

const CYAN = "#00f0ff";
const VIOLET = "#8a2be2";
const AMBER = "#fbbf24";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay: 0.2 + i * 0.15, duration: 0.9, ease: "easeInOut" as const }, opacity: { duration: 0.2 } },
  }),
};

// pathLength animation takes over stroke-dasharray, so dashed strokes only fade in.
const fade = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({ opacity: 1, transition: { delay: 0.2 + i * 0.15, duration: 0.6 } }),
};

/** PDF → chunk → hybrid retrieve → rerank → verify: a query packet flows through the RAG pipeline. */
export function RagPipeline() {
  const reduceMotion = useReducedMotion();
  const nodes = [
    { label: "PDF", sub: "parse · OCR" },
    { label: "CHUNK", sub: "hierarchical" },
    { label: "RETRIEVE", sub: "dense + BM25" },
    { label: "RERANK", sub: "cross-encoder" },
    { label: "VERIFY", sub: "claims · cites" },
  ];
  const w = 66;
  const gap = 17;
  const x0 = 6;
  const xs = nodes.map((_, i) => x0 + i * (w + gap));
  const last = xs[xs.length - 1] + w / 2;

  return (
    <motion.svg
      viewBox="0 0 410 140"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-hidden="true"
    >
      {xs.slice(0, -1).map((x, i) => (
        <motion.line
          key={i}
          x1={x + w}
          x2={xs[i + 1]}
          y1={62}
          y2={62}
          stroke="rgb(255 255 255 / 0.18)"
          strokeDasharray="3 4"
          variants={fade}
          custom={i}
        />
      ))}

      {!reduceMotion && (
        <motion.circle
          r={4}
          cy={62}
          fill={CYAN}
          initial={{ cx: xs[0] + w / 2, opacity: 0 }}
          animate={{ cx: [xs[0] + w / 2, last], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.8, ease: "linear" }}
          style={{ filter: `drop-shadow(0 0 6px ${CYAN})` }}
        />
      )}

      {nodes.map((n, i) => {
        const hot = i === 2 || i === 4;
        return (
          <motion.g key={n.label} variants={fade} custom={i}>
            <rect
              x={xs[i]}
              y={40}
              width={w}
              height={44}
              rx={10}
              fill={hot ? "#041a1d" : "#0b0b0b"}
              stroke={hot ? CYAN : "rgb(255 255 255 / 0.2)"}
              strokeOpacity={hot ? 0.6 : 1}
            />
            <text
              x={xs[i] + w / 2}
              y={66}
              textAnchor="middle"
              fontSize={8.5}
              letterSpacing={1}
              fill={hot ? CYAN : "rgb(255 255 255 / 0.7)"}
              className="font-mono"
            >
              {n.label}
            </text>
            <text
              x={xs[i] + w / 2}
              y={102}
              textAnchor="middle"
              fontSize={7.5}
              fill="rgb(255 255 255 / 0.35)"
              className="font-mono"
            >
              {n.sub}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

const mono = "font-mono";

/** Kala-Vaani: voice + photo flow into Gemini, which produces a finished catalog card. */
export function ArtisanFlow() {
  const reduceMotion = useReducedMotion();
  const inputs = [
    { label: "VOICE", y: 22 },
    { label: "PHOTO", y: 92 },
  ];

  return (
    <motion.svg
      viewBox="0 0 400 150"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-hidden="true"
    >
      {/* Wires: inputs → Gemini → catalog */}
      {["M84 40 C117 40 117 75 150 75", "M84 110 C117 110 117 75 150 75", "M230 75 L276 75"].map((d, i) => (
        <motion.path key={d} d={d} fill="none" stroke="rgb(255 255 255 / 0.2)" variants={draw} custom={i} />
      ))}

      {/* Packets travel behind the opaque nodes */}
      {!reduceMotion &&
        inputs.map((inp, i) => (
          <motion.circle
            key={inp.label}
            r={3.5}
            fill={VIOLET}
            initial={{ cx: 84, cy: inp.y + 18, opacity: 0 }}
            animate={{
              cx: [84, 117, 150, 230, 280],
              cy: [inp.y + 18, (inp.y + 18 + 75) / 2, 75, 75, 75],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, delay: i * 1.8, ease: "linear" }}
            style={{ filter: `drop-shadow(0 0 5px ${VIOLET})` }}
          />
        ))}

      {inputs.map((inp, i) => (
        <motion.g key={inp.label} variants={fade} custom={i}>
          <rect x={10} y={inp.y} width={74} height={36} rx={10} fill="#0b0b0b" stroke="rgb(255 255 255 / 0.2)" />
          <text x={47} y={inp.y + 21} textAnchor="middle" fontSize={8.5} letterSpacing={1} fill="rgb(255 255 255 / 0.7)" className={mono}>
            {inp.label}
          </text>
        </motion.g>
      ))}

      <motion.g variants={fade} custom={2}>
        <rect x={150} y={55} width={80} height={40} rx={10} fill="#12071d" stroke={VIOLET} strokeOpacity={0.8} />
        <text x={190} y={78} textAnchor="middle" fontSize={8.5} letterSpacing={1} fill="#c9a2f5" className={mono}>
          GEMINI
        </text>
        <text x={190} y={112} textAnchor="middle" fontSize={7.5} fill="rgb(255 255 255 / 0.35)" className={mono}>
          hindi · english
        </text>
      </motion.g>

      {/* Generated catalog card */}
      <motion.g variants={fade} custom={3}>
        <rect x={278} y={18} width={114} height={114} rx={10} fill="#0b0b0b" stroke="rgb(255 255 255 / 0.2)" />
        <rect x={286} y={26} width={98} height={40} rx={6} fill="rgb(138 43 226 / 0.18)" />
        <path d="M300 58 l14 -16 l10 10 l8 -6 l14 12 z" fill="rgb(138 43 226 / 0.45)" />
      </motion.g>
      <motion.rect variants={fade} custom={4} x={286} y={74} width={70} height={6} rx={3} fill="rgb(255 255 255 / 0.6)" />
      <motion.rect variants={fade} custom={4.5} x={286} y={86} width={92} height={4} rx={2} fill="rgb(255 255 255 / 0.22)" />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          variants={fade}
          custom={5 + i * 0.4}
          x={286 + i * 31}
          y={97}
          width={27}
          height={10}
          rx={5}
          fill="none"
          stroke={VIOLET}
          strokeOpacity={0.7}
        />
      ))}
      <motion.text variants={fade} custom={6.5} x={286} y={124} fontSize={7.5} letterSpacing={0.8} fill={CYAN} className={mono}>
        ₹ FAIR PRICE
      </motion.text>
    </motion.svg>
  );
}

/**
 * Round to 2 decimals. Math.atan2/sin/cos can differ in the last digit between
 * Node (server render) and the browser, which breaks hydration of SVG attributes.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

/** SOLAR-SKIN ORR: the sun charges canopies along a curved ring road, energy rippling down the corridor. */
export function SolarCorridor() {
  const reduceMotion = useReducedMotion();

  // Quadratic Bézier for the road: P0 → (control P1) → P2.
  const P0 = { x: 20, y: 136 };
  const P1 = { x: 200, y: 36 };
  const P2 = { x: 380, y: 136 };
  const panels = Array.from({ length: 9 }, (_, i) => {
    const t = 0.1 + i * 0.1;
    const u = 1 - t;
    const x = u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x;
    const y = u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y;
    const dx = 2 * u * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
    const dy = 2 * u * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);
    const len = Math.hypot(dx, dy);
    const off = 13; // lift the canopy above the road, along the normal
    return {
      x: r2(x + (dy / len) * off),
      y: r2(y - (dx / len) * off),
      angle: r2((Math.atan2(dy, dx) * 180) / Math.PI),
    };
  });
  const road = `M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`;

  return (
    <motion.svg
      viewBox="0 0 400 150"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-hidden="true"
    >
      {/* Sun */}
      <motion.g variants={fade} custom={0}>
        <motion.g
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={r2(42 + Math.cos(a) * 17)}
                y1={r2(34 + Math.sin(a) * 17)}
                x2={r2(42 + Math.cos(a) * 23)}
                y2={r2(34 + Math.sin(a) * 23)}
                stroke={AMBER}
                strokeOpacity={0.7}
                strokeLinecap="round"
              />
            );
          })}
        </motion.g>
        <circle cx={42} cy={34} r={11} fill={AMBER} style={{ filter: `drop-shadow(0 0 10px ${AMBER})` }} />
      </motion.g>

      {/* Road with lane marking */}
      <motion.path d={road} fill="none" stroke="#161616" strokeWidth={14} strokeLinecap="round" variants={draw} custom={0} />
      <motion.path d={road} fill="none" stroke="rgb(255 255 255 / 0.3)" strokeDasharray="4 5" variants={fade} custom={1} />

      {/* Solar canopies: an energy wave ripples along them */}
      {panels.map((p, i) => (
        <motion.g key={i} variants={fade} custom={1 + i * 0.25}>
          <g transform={`translate(${p.x} ${p.y}) rotate(${p.angle})`}>
            <motion.rect
              x={-10}
              y={-3}
              width={20}
              height={6}
              rx={1.5}
              stroke={CYAN}
              strokeOpacity={0.7}
              initial={{ fill: "rgb(0 240 255 / 0.15)" }}
              animate={
                reduceMotion
                  ? { fill: "rgb(0 240 255 / 0.35)" }
                  : { fill: ["rgb(0 240 255 / 0.12)", "rgb(0 240 255 / 0.75)", "rgb(0 240 255 / 0.12)"] }
              }
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, delay: i * 0.14, ease: "easeInOut" }}
            />
          </g>
        </motion.g>
      ))}

      <motion.text variants={fade} custom={3} x={200} y={106} textAnchor="middle" fontSize={8} letterSpacing={1} fill="rgb(255 255 255 / 0.4)" className={mono}>
        ORR · 158 KM
      </motion.text>
      <motion.text variants={fade} custom={3.5} x={392} y={22} textAnchor="end" fontSize={8} fill="rgb(255 255 255 / 0.35)" className={mono}>
        sun → panels → grid → EV · lights
      </motion.text>
    </motion.svg>
  );
}

/** ThorGym: a miniature of the site — hero, video block and program cards with a roaming hover state. */
export function SiteMock() {
  const reduceMotion = useReducedMotion();
  const programs = ["STRENGTH", "CARDIO", "ZUMBA"];
  const cardX = [52, 154, 256];

  return (
    <motion.svg
      viewBox="0 0 400 150"
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-hidden="true"
    >
      <motion.g variants={fade} custom={0}>
        {/* Browser chrome */}
        <rect x={40} y={6} width={320} height={138} rx={10} fill="#0b0b0b" stroke="rgb(255 255 255 / 0.2)" />
        <line x1={40} y1={24} x2={360} y2={24} stroke="rgb(255 255 255 / 0.1)" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={52 + i * 8} cy={15} r={2.5} fill="rgb(255 255 255 / 0.25)" />
        ))}
        <rect x={150} y={10} width={100} height={10} rx={5} fill="rgb(255 255 255 / 0.05)" />
        {/* Nav */}
        <rect x={52} y={32} width={26} height={6} rx={2} fill={VIOLET} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={286 + i * 22} y={33} width={16} height={4} rx={2} fill="rgb(255 255 255 / 0.3)" />
        ))}
      </motion.g>

      {/* Hero */}
      <motion.text variants={fade} custom={1} x={52} y={64} fontSize={15} fontWeight={800} letterSpacing={0.5} fill="#fff" className="font-sans">
        NOT JUST A GYM.
      </motion.text>
      <motion.rect variants={fade} custom={1.4} x={52} y={71} width={112} height={4} rx={2} fill="rgb(255 255 255 / 0.25)" />
      <motion.g variants={fade} custom={1.8}>
        <rect x={52} y={80} width={46} height={12} rx={6} fill={VIOLET} />
        <text x={75} y={88.5} textAnchor="middle" fontSize={6} fontWeight={700} letterSpacing={0.8} fill="#fff" className={mono}>
          JOIN
        </text>
      </motion.g>
      <motion.g variants={fade} custom={2}>
        <rect x={228} y={44} width={120} height={48} rx={6} fill="rgb(138 43 226 / 0.16)" />
        <path d="M282 60 l14 8 l-14 8 z" fill="rgb(255 255 255 / 0.7)" />
      </motion.g>

      {/* Program cards */}
      {programs.map((label, i) => (
        <motion.g key={label} variants={fade} custom={2.5 + i * 0.3}>
          <rect x={cardX[i]} y={102} width={92} height={32} rx={6} fill="rgb(255 255 255 / 0.03)" stroke="rgb(255 255 255 / 0.12)" />
          <rect x={cardX[i] + 8} y={110} width={20} height={4} rx={2} fill="rgb(255 255 255 / 0.2)" />
          <text x={cardX[i] + 8} y={126} fontSize={6.5} letterSpacing={0.8} fill="rgb(255 255 255 / 0.65)" className={mono}>
            {label}
          </text>
        </motion.g>
      ))}

      {/* Roaming hover highlight */}
      {!reduceMotion && (
        <motion.rect
          y={102}
          width={92}
          height={32}
          rx={6}
          fill="none"
          stroke={VIOLET}
          strokeWidth={1.5}
          initial={{ x: cardX[0], opacity: 0 }}
          animate={{ x: [cardX[0], cardX[0], cardX[1], cardX[1], cardX[2], cardX[2]], opacity: [0, 1, 1, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut", delay: 1.5 }}
          style={{ filter: `drop-shadow(0 0 6px ${VIOLET})` }}
        />
      )}
    </motion.svg>
  );
}
