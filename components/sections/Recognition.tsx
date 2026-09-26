"use client";

import { motion } from "framer-motion";
import { recognition } from "@/lib/data";
import { KineticText } from "@/components/ui/KineticText";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Check } from "@/components/ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Recognition() {
  return (
    <section id="recognition" className="scroll-mt-24 px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent-cyan uppercase">
            <span className="h-px w-8 bg-accent-cyan/60" />
            {recognition.eyebrow}
          </p>
        </Reveal>
        <KineticText
          as="h2"
          trigger="inView"
          stagger={0.025}
          text={recognition.title}
          className="text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-white"
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55">{recognition.intro}</p>
        </Reveal>

        <ol className="mt-14 border-t border-white/10">
          {recognition.wins.map((win, i) => (
            <motion.li
              key={win.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: Math.min(i, 3) * 0.06 }}
              className="group relative grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 border-b border-white/10 px-2 py-6 sm:grid-cols-[3rem_9rem_1fr_auto] sm:items-center sm:gap-x-6 sm:px-4 sm:py-7"
            >
              {/* Hover wash that sweeps in from the left */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-accent-cyan/[0.07] via-accent-violet/[0.05] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="font-mono text-xs text-white/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent-cyan uppercase sm:text-xs">{win.tag}</span>
              <div className="col-start-2 sm:col-start-auto">
                <h3 className="text-xl font-semibold tracking-tight text-white transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-2xl md:text-3xl">
                  {win.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50 transition-transform delay-75 duration-500 ease-out group-hover:translate-x-2">
                  {win.description}
                </p>
              </div>
              <ArrowUpRight
                width={22}
                height={22}
                className="hidden -translate-x-2 text-accent-cyan opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
              />
            </motion.li>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
          <span className="mr-3 font-mono text-[11px] tracking-[0.3em] text-accent-cyan uppercase">Certifications</span>
          {recognition.certifications.map((c) => (
            <motion.span
              key={c}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/85"
            >
              <Check width={14} height={14} className="text-accent-cyan" />
              {c}
            </motion.span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
