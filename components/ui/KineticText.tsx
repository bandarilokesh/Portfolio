"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";

type KineticTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "mount" animates on page load; "inView" waits until scrolled into view. */
  trigger?: "mount" | "inView";
};

const letter: Variants = {
  hidden: { y: "110%", rotate: 6, opacity: 0 },
  visible: ({ delay }: { delay: number }) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Letter-by-letter kinetic heading. Each word is a clipping mask so letters
 * rise into place from below. Screen readers get the plain text once.
 */
export function KineticText({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  stagger = 0.035,
  trigger = "mount",
}: KineticTextProps) {
  const words = text.split(" ");
  let letterIndex = 0;

  const play =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden="true" initial="hidden" {...play}>
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom whitespace-nowrap">
              {Array.from(word).map((char, ci) => {
                const i = letterIndex++;
                return (
                  <motion.span
                    key={ci}
                    className="inline-block will-change-transform"
                    variants={letter}
                    custom={{ delay: delay + i * stagger }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
