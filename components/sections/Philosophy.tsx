"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

const lines: { lead: string; key: string; tail: string }[] = [
  { lead: "It's about knowing what to ", key: "retrieve", tail: "," },
  { lead: "what to ", key: "trust", tail: "," },
  { lead: "what to ", key: "question", tail: "," },
  { lead: "and when to ", key: "admit uncertainty", tail: "." },
];

/** Opening statement; each line lights up as it scrolls into focus. */
export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="philosophy" className="scroll-mt-24 px-4 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-8 font-mono text-xs tracking-[0.2em] text-accent-cyan uppercase">
            <span className="text-white/40">//</span> Philosophy
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-white">
            Intelligence isn&apos;t just about generating answers.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-12 pl-6 sm:pl-10">
          {/* Rail that fills as you read down the lines */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-white/10">
            <motion.div
              style={{ scaleY: rail }}
              className="h-full w-full origin-top bg-gradient-to-b from-accent-cyan to-accent-violet"
            />
          </div>

          {lines.map((line, i) => (
            <Line key={line.key} progress={scrollYProgress} range={[i / lines.length, (i + 1) / lines.length]}>
              {line.lead}
              <span className="text-gradient">{line.key}</span>
              {line.tail}
            </Line>
          ))}
        </div>
      </div>
    </section>
  );
}

function Line({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const opacity = useTransform(progress, range, [0.18, 1]);
  const x = useTransform(progress, range, [-12, 0]);

  return (
    <motion.p
      style={reduceMotion ? undefined : { opacity, x }}
      className="text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.2] font-medium tracking-[-0.02em] text-white"
    >
      {children}
    </motion.p>
  );
}
