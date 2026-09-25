"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState, type ComponentType, type PointerEvent } from "react";
import { accentRgb, type Project } from "@/lib/data";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ArtisanFlow, RagPipeline, SiteMock, SolarCorridor } from "@/components/visuals/ProjectVisuals";

const visuals: Record<Project["visual"], ComponentType> = {
  rag: RagPipeline,
  artisan: ArtisanFlow,
  solar: SolarCorridor,
  site: SiteMock,
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const rgb = accentRgb[project.accent];
  const Visual = visuals[project.visual];

  // Pointer position normalised to -0.5…0.5 drives a subtle 3D tilt.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), spring);

  function handleMove(e: PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    if (reduceMotion || e.pointerType !== "mouse") return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
    setActive(false);
  }

  return (
    <div className="h-full [perspective:1200px]">
      <motion.article
        onPointerMove={handleMove}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={handleLeave}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={{ rotateX, rotateY }}
        animate={{
          scale: active ? 1.02 : 1,
          borderColor: active ? `rgb(${rgb} / 0.45)` : "rgb(255 255 255 / 0.1)",
          boxShadow: active
            ? `0 30px 80px -30px rgb(${rgb} / 0.6)`
            : `0 0px 0px 0px rgb(${rgb} / 0)`,
        }}
        transition={{ duration: 0.45, ease }}
        className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border bg-[#050505] p-6 sm:p-8"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          animate={{ opacity: active ? 1 : 0 }}
          style={{
            background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgb(${rgb} / 0.12), transparent 60%)`,
          }}
        />

        <header className="relative flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
          <span>
            <span style={{ color: `rgb(${rgb})` }}>{project.index}</span>
            {project.featured && <span className="ml-3 text-white/30">Featured</span>}
          </span>
          <motion.span
            animate={{ rotate: active ? 45 : 0, color: active ? `rgb(${rgb})` : "rgb(255 255 255 / 0.4)" }}
            transition={{ duration: 0.35, ease }}
            className="grid size-9 place-items-center rounded-full border border-white/10"
          >
            <ArrowUpRight width={16} height={16} />
          </motion.span>
        </header>

        {/* Featured card goes horizontal on desktop: copy left, diagram right. */}
        <div
          className={`flex flex-1 flex-col ${
            project.featured ? "lg:mt-6 lg:flex-row-reverse lg:items-end lg:gap-12" : ""
          }`}
        >
          <div
            className={`relative my-6 min-h-[150px] flex-1 ${
              project.featured ? "md:min-h-[240px] lg:my-0 lg:self-stretch" : "max-h-[220px]"
            }`}
          >
            <Visual />
          </div>

          {/* Not positioned, so the title's stretched link covers the whole card. */}
          <div className={project.featured ? "lg:w-[46%] lg:shrink-0" : ""}>
            <h3
              className={`font-semibold tracking-tight text-white ${
                project.featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
              }`}
            >
              {/* Stretched link: the whole card is clickable, but only the title is announced. */}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-accent-cyan/70"
              >
                {project.title}
              </a>
            </h3>
            <p className={`mt-3 leading-relaxed text-white/55 ${project.featured ? "max-w-xl text-base" : "text-sm"}`}>
              {project.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech, i) => (
                <motion.li
                  key={tech}
                  animate={{ y: active ? -2 : 0 }}
                  transition={{ duration: 0.3, ease, delay: active ? i * 0.04 : 0 }}
                  className="glass rounded-full px-3 py-1 font-mono text-[11px] text-white/75"
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
