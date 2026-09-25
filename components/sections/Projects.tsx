import { projects } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Featured Builds"
          title="Architectures, shipped."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 0.1}
              className={project.featured ? "md:col-span-2 lg:col-span-3" : "md:last:col-span-2 lg:last:col-span-1"}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
