"use client";

import { motion } from "framer-motion";
import { useState, type ComponentType, type SVGProps } from "react";
import { accentRgb, type Skill } from "@/lib/data";
import { useSpotlight } from "@/hooks/useSpotlight";
import { Code, Cpu, Sparkles, Tree } from "@/components/ui/Icons";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "ai-engineering": Sparkles,
  "core-cs": Cpu,
  dsa: Tree,
  web: Code,
};

const ease = [0.22, 1, 0.36, 1] as const;

export function BentoTile({ skill, index }: { skill: Skill; index: number }) {
  const [active, setActive] = useState(false);
  const onPointerMove = useSpotlight<HTMLElement>();

  const rgb = accentRgb[skill.accent];
  const Icon = icons[skill.id];
  const isLarge = skill.size === "large";

  return (
    <motion.article
      tabIndex={0}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onPointerMove={onPointerMove}
      animate={{
        scale: active ? 1.02 : 1,
        borderColor: active ? `rgb(${rgb} / 0.45)` : "rgb(255 255 255 / 0.1)",
        boxShadow: active
          ? `0 0 0 1px rgb(${rgb} / 0.15), 0 20px 70px -20px rgb(${rgb} / 0.55)`
          : `0 0 0 0px rgb(${rgb} / 0), 0 0 0 0 rgb(${rgb} / 0)`,
      }}
      transition={{ duration: 0.45, ease }}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border bg-[#050505] p-6 outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 sm:p-7"
    >
      {/* Cursor-following accent glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(${rgb} / 0.14), transparent 65%)`,
        }}
      />

      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"
            style={{ color: `rgb(${rgb})` }}
          >
            {Icon && <Icon width={20} height={20} />}
          </span>
          <h3
            className={`font-semibold tracking-tight text-white ${
              isLarge ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {skill.category}
          </h3>
        </div>
        <span className="pt-1 font-mono text-[11px] text-white/25">0{index + 1}</span>
      </header>

      <p className={`mt-3 leading-relaxed text-white/50 ${isLarge ? "max-w-xl text-base" : "text-sm"}`}>
        {skill.summary}
      </p>

      <ul aria-label={`${skill.category} skills`} className={`mt-6 ${skill.itemsLayout} ${isLarge ? "flex-1" : ""}`}>
        {skill.items.map((item, i) => (
          <SkillItemView key={item} name={item} i={i} size={skill.size} rgb={rgb} active={active} />
        ))}
      </ul>
    </motion.article>
  );
}

type SkillItemViewProps = {
  name: string;
  i: number;
  size: Skill["size"];
  rgb: string;
  active: boolean;
};

function SkillItemView({ name, i, size, rgb, active }: SkillItemViewProps) {
  // Small tile: compact chips.
  if (size === "small") {
    return (
      <li
        className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/85"
        style={{ borderColor: active ? `rgb(${rgb} / 0.35)` : undefined }}
      >
        {name}
      </li>
    );
  }

  // Large tile: cards that fill the space.
  if (size === "large") {
    return (
      <motion.li
        animate={{ y: active ? -4 : 0 }}
        transition={{ duration: 0.4, ease, delay: active ? i * 0.05 : 0 }}
        className="flex flex-col justify-between gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        {/* Oversized numeral gives the tall card visual weight; lights up on hover. */}
        <motion.span
          aria-hidden="true"
          animate={{ color: active ? `rgb(${rgb} / 0.9)` : "rgb(255 255 255 / 0.08)" }}
          transition={{ duration: 0.4, delay: active ? i * 0.05 : 0 }}
          className="text-4xl leading-none font-semibold tracking-tighter sm:text-5xl"
        >
          0{i + 1}
        </motion.span>
        <p className="text-base leading-snug font-medium text-white">{name}</p>
      </motion.li>
    );
  }

  // Medium tile: stacked rows.
  return (
    <li
      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 font-medium text-white transition-colors duration-300"
      style={{ borderColor: active ? `rgb(${rgb} / 0.25)` : undefined }}
    >
      <span className="size-1.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})` }} />
      {name}
    </li>
  );
}
