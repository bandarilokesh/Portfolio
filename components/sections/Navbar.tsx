"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navLinks, profile, socials } from "@/lib/data";
import { ArrowUpRight } from "@/components/ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** A floating "Menu" button that slides in a navigation panel from the left. */
export function Navbar({ resume }: { resume: string | null }) {
  const [open, setOpen] = useState(false);
  const [resumeSoon, setResumeSoon] = useState(false);
  const reduceMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const profiles = socials.filter((s) => s.icon !== "mail");

  // While open: lock page scroll, focus the first link, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const focusFirst = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus(), 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current || !buttonRef.current) return;
      const items = [buttonRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
      e.preventDefault();
      items[next].focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = "";
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function go(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    // Lift the scroll lock right away so the jump isn't blocked.
    document.documentElement.style.overflow = "";
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", href);
  }

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-accent-cyan to-accent-violet"
      />

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        whileTap={{ scale: 0.95 }}
        className={`glass fixed top-4 right-4 z-50 flex items-center gap-3 rounded-full py-2 pr-2 pl-5 text-sm font-medium shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)] transition-[color,border-color] duration-300 hover:border-accent-cyan/50 sm:top-6 sm:right-8 ${
          open ? "text-accent-cyan" : "text-white"
        }`}
      >
        {/* Label rolls from "Menu" to "Close" */}
        <span aria-hidden="true" className="relative h-5 overflow-hidden">
          <motion.span
            className="flex flex-col"
            animate={{ y: open ? "-50%" : "0%" }}
            transition={{ duration: 0.45, ease }}
          >
            <span className="h-5 leading-5">Menu</span>
            <span className="h-5 leading-5">Close</span>
          </motion.span>
        </span>
        {/* Two bars that cross into an X */}
        <span aria-hidden="true" className="relative grid size-8 place-items-center rounded-full bg-white/10">
          <motion.span
            className="absolute h-[1.5px] w-3.5 rounded-full bg-current"
            animate={open ? { y: 0, rotate: 45 } : { y: -3, rotate: 0 }}
            transition={{ duration: 0.4, ease }}
          />
          <motion.span
            className="absolute h-[1.5px] w-3.5 rounded-full bg-current"
            animate={open ? { y: 0, rotate: -45 } : { y: 3, rotate: 0 }}
            transition={{ duration: 0.4, ease }}
          />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Blurred, dimmed page behind the panel; click to close */}
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            />

            <motion.div
              key="panel"
              ref={menuRef}
              id="site-menu"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%", transition: { duration: 0.45, ease } }}
              transition={{ duration: 0.65, ease }}
              className="fixed inset-y-0 left-0 z-40 flex w-full max-w-[36rem] flex-col overflow-y-auto border-r border-white/10 bg-gradient-to-br from-[#16161c] to-[#0a0a0d] px-8 pt-7 pb-10 sm:px-16"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-32 size-[26rem] rounded-full bg-accent-cyan/10 blur-[120px]" />

              <a
                href="#top"
                onClick={(e) => go(e, "#top")}
                aria-label="Back to top"
                className="relative w-fit text-2xl font-bold tracking-tight text-white"
              >
                {profile.initials}
                <span className="text-accent-cyan">.</span>
              </a>

              <nav aria-label="Primary" className="relative flex flex-1 flex-col justify-center py-12">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <li key={link.href} className="overflow-hidden">
                      <motion.a
                        href={link.href}
                        onClick={(e) => go(e, link.href)}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "110%", transition: { duration: 0.25, ease } }}
                        transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.06 }}
                        className="group inline-flex items-center gap-3 py-0.5 text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-white uppercase outline-none focus-visible:text-accent-cyan"
                      >
                        <span className="transition-[transform,color] duration-500 ease-out group-hover:translate-x-3 group-hover:text-accent-cyan">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          width={32}
                          height={32}
                          className="shrink-0 -translate-x-3 text-accent-cyan opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100 group-focus-visible:translate-x-2 group-focus-visible:opacity-100"
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease, delay: 0.45 }}
                className="relative"
              >
                <p className="font-mono text-[11px] tracking-[0.3em] text-accent-cyan uppercase">Socials</p>
                <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                  {profiles.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-white/60 transition-colors hover:text-white"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Opens public/resume.pdf once it exists; a "coming soon" placeholder until then. */}
                <a
                    href={resume ?? "#"}
                    {...(resume ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={(e) => {
                      if (resume) return;
                      e.preventDefault();
                      setResumeSoon(true);
                      window.setTimeout(() => setResumeSoon(false), 1800);
                    }}
                    className="group mt-8 inline-flex items-center gap-2 border-b border-accent-cyan pb-1.5 text-base font-semibold text-white"
                  >
                    <span aria-live="polite">{resumeSoon ? "Résumé — coming soon" : "Résumé"}</span>
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
