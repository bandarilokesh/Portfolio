"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { contact, profile, socials } from "@/lib/data";
import { KineticText } from "@/components/ui/KineticText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Check, Copy, Download, Mail, MapPin, socialIcons } from "@/components/ui/Icons";
import { ContactForm } from "./ContactForm";
import { LocalTime } from "./LocalTime";

export function Contact({ resume }: { resume: string | null }) {
  return (
    <footer id="contact" className="relative isolate scroll-mt-24 overflow-hidden px-4 pt-24 pb-10 sm:px-8 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20rem] left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-accent-violet/20 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[24rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-accent-cyan/[0.07] blur-[140px]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent-cyan uppercase">
              <span className="h-px w-8 bg-accent-cyan/60" />
              {contact.eyebrow}
              <span className="h-px w-8 bg-accent-cyan/60" />
            </p>
          </Reveal>

          <KineticText
            as="h2"
            trigger="inView"
            stagger={0.02}
            text={contact.title}
            className="mx-auto max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-white"
          />

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">{contact.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <Reveal delay={0.1} className="h-full">
            <ContactDetails resume={resume} />
          </Reveal>
          <Reveal delay={0.2} className="h-full">
            <div className="glass h-full rounded-3xl p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <p className="flex items-center gap-3 text-sm text-white/70">
              <PulseDot />
              Currently building in {profile.location}.
            </p>
            <p className="pl-5 font-mono text-xs text-white/35">
              IST <LocalTime timeZone={profile.timezone} /> · © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 self-start font-mono text-xs tracking-[0.2em] text-white/45 uppercase transition-colors hover:text-white md:self-auto"
          >
            Back to top
            <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </a>
        </Reveal>
      </div>
    </footer>
  );
}

function ContactDetails({ resume }: { resume: string | null }) {
  const profiles = socials.filter((s) => s.icon !== "mail");

  return (
    <div className="glass flex h-full flex-col rounded-3xl p-6 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight text-white">Contact Details</h3>

      <ul className="mt-7 space-y-6">
        <DetailRow label="Email" badge={<Mail width={18} height={18} />} accent="cyan">
          <EmailValue />
        </DetailRow>
        <DetailRow label="Location" badge={<MapPin width={18} height={18} />} accent="violet">
          {contact.location}
        </DetailRow>
        <DetailRow label="Availability" badge={<PulseDot />} accent="cyan">
          <span className="font-medium text-accent-cyan">{contact.availability}</span>
        </DetailRow>
      </ul>

      <p className="mt-9 font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">Socials</p>
      <ul className="mt-3 flex gap-3" aria-label="Social links">
        {profiles.map((s) => {
          const Icon = socialIcons[s.icon];
          return (
            <li key={s.label}>
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="glass grid size-11 place-items-center rounded-full text-white/70 transition-[color,border-color,box-shadow] duration-300 hover:border-accent-cyan/50 hover:text-white hover:shadow-[0_10px_30px_-10px_rgb(0_240_255/0.6)]"
              >
                <Icon width={18} height={18} />
              </motion.a>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-9">
        <ResumeButton resume={resume} />
      </div>
    </div>
  );
}

function DetailRow({
  label,
  badge,
  accent,
  children,
}: {
  label: string;
  badge: ReactNode;
  accent: "cyan" | "violet";
  children: ReactNode;
}) {
  const tone =
    accent === "cyan"
      ? "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan"
      : "border-accent-violet/40 bg-accent-violet/15 text-[#c9a2f5]";

  return (
    <li className="flex items-start gap-4">
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl border ${tone}`}>{badge}</span>
      <div className="min-w-0 pt-0.5">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">{label}</p>
        <div className="mt-1 text-base text-white">{children}</div>
      </div>
    </li>
  );
}

/**
 * Downloads public/resume.pdf when it exists. Until then it's a placeholder
 * whose label briefly flips to "Coming soon" when clicked.
 */
function ResumeButton({ resume }: { resume: string | null }) {
  const [soon, setSoon] = useState(false);

  if (resume) {
    return (
      <MagneticButton href={resume} variant="ghost" download>
        <Download width={16} height={16} />
        Download Résumé
      </MagneticButton>
    );
  }

  return (
    <MagneticButton
      href="#"
      variant="ghost"
      onClick={(e) => {
        e.preventDefault();
        setSoon(true);
        window.setTimeout(() => setSoon(false), 1800);
      }}
    >
      <Download width={16} height={16} />
      <span aria-live="polite">{soon ? "Résumé coming soon" : "Download Résumé"}</span>
    </MagneticButton>
  );
}

/** Email link plus a copy button that morphs into a tick. */
function EmailValue() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the mailto link still works.
    }
  }

  return (
    <span className="flex flex-wrap items-center gap-2">
      <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-accent-cyan">
        {contact.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="grid size-7 place-items-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {copied ? <Check width={14} height={14} className="text-accent-cyan" /> : <Copy width={14} height={14} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </span>
  );
}

function PulseDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-cyan opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-accent-cyan" />
    </span>
  );
}
