"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * reducedMotion="user" makes every framer-motion animation honour the
 * OS-level prefers-reduced-motion setting: transform/layout animations are
 * dropped and only opacity/colour transitions remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
