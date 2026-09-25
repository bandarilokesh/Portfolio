"use client";

import { useCallback, type PointerEvent } from "react";

/**
 * Writes the pointer position into --mx / --my CSS variables on the element,
 * so a radial-gradient "spotlight" can follow the cursor without re-rendering.
 */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: PointerEvent<T>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
}
