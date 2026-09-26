"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent, type PointerEvent, type ReactNode } from "react";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  /** 0–1: how strongly the button follows the cursor. */
  strength?: number;
  className?: string;
  external?: boolean;
  /** Download the linked file instead of navigating to it. */
  download?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const variants = {
  primary:
    "bg-accent-cyan text-black font-semibold shadow-[0_0_0_1px_rgb(0_240_255/0.6),0_8px_40px_-8px_rgb(0_240_255/0.7)] hover:shadow-[0_0_0_1px_rgb(0_240_255/0.9),0_8px_60px_-6px_rgb(0_240_255/0.9)]",
  ghost:
    "glass text-white/90 font-medium hover:border-accent-violet/70 hover:text-white hover:shadow-[0_8px_40px_-10px_rgb(138_43_226/0.8)]",
};

/**
 * A button that is pulled toward the cursor while it is nearby.
 * The outer wrapper is padded so the "magnetic field" extends past the
 * visible button edge; the label moves a little further for parallax depth.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  strength = 0.35,
  className = "",
  external = false,
  download = false,
  onClick,
}: MagneticButtonProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const labelX = useTransform(sx, (v) => v * 0.4);
  const labelY = useTransform(sy, (v) => v * 0.4);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse" || !fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={fieldRef}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="-m-5 inline-block p-5"
    >
      <motion.a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
        onClick={onClick}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.95 }}
        className={`relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide transition-[box-shadow,border-color,color] duration-300 ${variants[variant]} ${className}`}
      >
        <motion.span style={{ x: labelX, y: labelY }} className="inline-flex items-center gap-2">
          {children}
        </motion.span>
      </motion.a>
    </div>
  );
}
