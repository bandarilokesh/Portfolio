"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Animated "scroll down" cue pinned to the bottom of the hero; fades out as you scroll. */
export function ScrollCue({ href = "#skills" }: { href?: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 bottom-6 flex justify-center"
    >
      <motion.a
        href={href}
        aria-label="Scroll to skills"
        style={{ opacity }}
        whileHover="hover"
        className="group flex flex-col items-center gap-2 rounded-full p-2 text-white/50 transition-colors hover:text-white"
      >
        {/* Mouse outline with a dropping wheel dot */}
        <span className="glass relative flex h-10 w-6 justify-center rounded-full">
          <motion.span
            className="mt-2 size-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgb(0_240_255)]"
            animate={reduceMotion ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>

        {/* Cascading chevrons */}
        <span className="flex flex-col items-center -space-y-2" aria-hidden="true">
          {[0, 1].map((i) => (
            <motion.svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={reduceMotion ? undefined : { opacity: [0.15, 1, 0.15], y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
              variants={{ hover: { color: "#00f0ff" } }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          ))}
        </span>

        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.a>
    </motion.div>
  );
}
