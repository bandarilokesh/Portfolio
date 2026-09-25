"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { KineticText } from "@/components/ui/KineticText";
import { Portrait } from "./Portrait";
import { ScrollCue } from "./ScrollCue";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function Hero({ photo }: { photo: string | null }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-4 pt-32 pb-36 sm:px-8"
    >
      <Backdrop />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <KineticText
            text={profile.name}
            delay={0.25}
            className="text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.88] font-semibold tracking-[-0.045em] text-white"
          />

          <motion.p
            {...fadeUp(0.9)}
            className="text-gradient mt-6 text-[clamp(1.5rem,3vw,2.6rem)] leading-tight font-medium tracking-tight text-balance"
          >
            {profile.headline}
          </motion.p>

          <motion.p {...fadeUp(1.05)} className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            {profile.subheadline}
          </motion.p>
        </div>

        <Portrait photo={photo} />
      </div>

      <ScrollCue />
    </section>
  );
}

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Faint engineering grid, masked to fade out at the edges */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-accent-cyan/20 blur-[140px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut", delay: 0.3 }}
        className="absolute -right-32 bottom-0 size-[32rem] rounded-full bg-accent-violet/25 blur-[140px]"
      />
    </div>
  );
}
