import { skills } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoTile } from "./BentoTile";
import { Toolkit } from "./Toolkit";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          eyebrow="Skillset"
          title="What I work with."
        />

        {/*
          Asymmetric bento: 1 col on mobile → 2 cols on tablet → 12-col grid with
          fixed row heights on desktop.
        */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[16.5rem] lg:grid-cols-12">
          {skills.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 0.08} className={skill.layout}>
              <BentoTile skill={skill} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Toolkit />
        </Reveal>
      </div>
    </section>
  );
}
