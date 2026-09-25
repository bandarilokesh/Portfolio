import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  kicker?: string;
};

export function SectionHeading({ index, eyebrow, title, kicker }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent-cyan uppercase">
          <span className="text-white/40">// {index} —</span> {eyebrow}
        </p>
        <h2 className="max-w-3xl text-4xl leading-[0.95] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </div>
      {kicker && <p className="max-w-sm text-sm leading-relaxed text-white/50">{kicker}</p>}
    </Reveal>
  );
}
