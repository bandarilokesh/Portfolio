"use client";

import { motion, useReducedMotion } from "framer-motion";
import { toolkit } from "@/lib/data";

/** Infinite, edge-faded strip of every skill. Static wrapped list under reduced motion. */
export function Toolkit() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <ul aria-label="Toolkit" className="mt-4 flex flex-wrap gap-2">
        {toolkit.map((t) => (
          <Chip key={t} label={t} />
        ))}
      </ul>
    );
  }

  return (
    <div
      className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 py-4"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <p className="sr-only">Toolkit: {toolkit.join(", ")}</p>
      {/* Two identical halves; sliding by -50% loops seamlessly. */}
      <motion.ul
        aria-hidden="true"
        className="flex w-max gap-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...toolkit, ...toolkit].map((t, i) => (
          <Chip key={i} label={t} />
        ))}
      </motion.ul>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <li className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/70">
      <span className="size-1 rounded-full bg-accent-cyan" />
      {label}
    </li>
  );
}
