"use client";

import { motion } from "framer-motion";
import { profile, socials } from "@/lib/data";
import { KineticText } from "@/components/ui/KineticText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, socialIcons } from "@/components/ui/Icons";
import { LocalTime } from "./LocalTime";

export function Contact() {
  const email = socials.find((s) => s.icon === "mail");

  return (
    <footer id="contact" className="relative isolate scroll-mt-24 overflow-hidden px-4 pt-24 pb-10 sm:px-8 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20rem] left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-accent-violet/20 blur-[160px]"
      />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-6 font-mono text-xs tracking-[0.2em] text-accent-cyan uppercase">
            <span className="text-white/40">// 03 —</span> Initialize Contact
          </p>
        </Reveal>

        <KineticText
          as="h2"
          trigger="inView"
          stagger={0.025}
          text="Let's build something secure."
          className="max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.04em] text-white"
        />

        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
          {email && (
            <MagneticButton href={email.href} variant="primary">
              Open a secure channel
              <ArrowUpRight width={16} height={16} />
            </MagneticButton>
          )}
          <p className="max-w-sm text-sm text-white/50">
            Open to internships, research collaborations, and AI-security problems worth losing sleep over.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-24 flex flex-col-reverse gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <p className="flex items-center gap-3 text-sm text-white/70">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-cyan opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-cyan" />
              </span>
              Currently building in {profile.location}.
            </p>
            <p className="pl-5 font-mono text-xs text-white/35">
              IST <LocalTime timeZone={profile.timezone} /> · © {new Date().getFullYear()} {profile.name}
            </p>
          </div>

          <ul className="flex gap-3" aria-label="Social links">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              const external = s.icon !== "mail";
              return (
                <li key={s.label}>
                  <motion.a
                    href={s.href}
                    aria-label={s.label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="glass group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-white/70 transition-[color,border-color,box-shadow] duration-300 hover:border-accent-cyan/50 hover:text-white hover:shadow-[0_10px_30px_-10px_rgb(0_240_255/0.6)]"
                  >
                    <Icon width={16} height={16} />
                    <span className="hidden sm:inline">{s.label}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </footer>
  );
}
