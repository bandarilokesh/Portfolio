"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { profile } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero portrait: a photo in a glowing, HUD-style frame with a one-time
 * "biometric scan" on load. Falls back to a monogram when no photo exists.
 */
export function Portrait({ photo }: { photo: string | null }) {
  const reduceMotion = useReducedMotion();

  // Gentle parallax tilt toward the cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 });

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[24rem] [perspective:1200px] lg:max-w-[28rem]"
      onPointerMove={handleMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {/* Rotating accent ring behind the frame */}
      <div aria-hidden="true" className="absolute -inset-px overflow-hidden rounded-[2rem]">
        <motion.div
          className="absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "conic-gradient(from 0deg, #00f0ff, transparent 30%, #8a2be2 55%, transparent 80%, #00f0ff)" }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-accent-cyan/25 to-accent-violet/30 blur-3xl"
      />

      <motion.figure
        initial={{ opacity: 0, clipPath: "inset(100% 0 0 0 round 2rem)" }}
        animate={{ opacity: 1, clipPath: "inset(0% 0 0 0 round 2rem)" }}
        transition={{ duration: 1.2, ease, delay: 0.4 }}
        style={{ rotateX, rotateY }}
        className="relative m-px aspect-[4/5] overflow-hidden rounded-[calc(2rem-1px)] bg-[#050505]"
      >
        {photo ? (
          <Image
            src={photo}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 28rem, 24rem"
            className="object-cover"
          />
        ) : (
          <Monogram />
        )}

        {/* Soft fade at the bottom edge only, so the photo stays bright */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/40 to-transparent" />

        {/* One-shot scan line on load */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent-cyan/25 to-transparent"
            initial={{ top: "-25%", opacity: 0 }}
            animate={{ top: ["-25%", "105%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 1.4 }}
          />
        )}

        <HudCorners />

      </motion.figure>
    </div>
  );
}

function Monogram() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span
        role="img"
        aria-label={profile.name}
        className="text-gradient relative text-[9rem] leading-none font-semibold tracking-[-0.06em]"
      >
        {profile.initials}
      </span>
    </div>
  );
}

function HudCorners() {
  const corner = "absolute size-6 border-accent-cyan/40";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4">
      <span className={`${corner} top-0 left-0 rounded-tl-lg border-t border-l`} />
      <span className={`${corner} top-0 right-0 rounded-tr-lg border-t border-r`} />
      <span className={`${corner} bottom-0 left-0 rounded-bl-lg border-b border-l`} />
      <span className={`${corner} right-0 bottom-0 rounded-br-lg border-r border-b`} />
    </div>
  );
}
