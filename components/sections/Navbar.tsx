"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { navLinks, profile } from "@/lib/data";

export function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-accent-cyan to-accent-violet"
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
      >
        <nav
          aria-label="Primary"
          className="glass flex w-full max-w-xl items-center justify-between rounded-full py-2 pr-2 pl-5 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)]"
        >
          <a href="#top" className="font-mono text-sm font-semibold tracking-widest text-white">
            {profile.initials}
            <span className="text-accent-cyan">_</span>
          </a>

          <ul className="flex items-center" onPointerLeave={() => setHovered(null)}>
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onPointerEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  onBlur={() => setHovered(null)}
                  className="relative z-10 block rounded-full px-3 py-2 text-xs text-white/70 transition-colors hover:text-white sm:px-4 sm:text-sm"
                >
                  {link.label}
                </a>
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </>
  );
}
