import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Cpu = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </svg>
);

export const Tree = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="4.5" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="3.5" cy="19.5" r="1.5" />
    <circle cx="9" cy="19.5" r="1.5" />
    <path d="M11 6 7 10.5M13 6l4 4.5M5.2 13.8l-1 4.3M7 13.8l1.5 4.3" />
  </svg>
);

export const Sparkles = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.8 4.9L18.7 9.7 13.8 11.5 12 16.4 10.2 11.5 5.3 9.7 10.2 7.9 12 3Z" />
    <path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8L19 15Z" />
  </svg>
);

export const Code = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
  </svg>
);

export const Github = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

export const Linkedin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const Send = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8-8-4 19-7Z" />
  </svg>
);

export const Download = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Copy = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
  </svg>
);

/** Text monogram badge, used for profiles without a simple outline icon. */
const Monogram = ({ text, ...p }: IconProps & { text: string }) => (
  <svg {...base} {...p}>
    <text
      x="12"
      y="16.2"
      textAnchor="middle"
      fontSize="12"
      fontWeight="700"
      letterSpacing="0.3"
      fill="currentColor"
      stroke="none"
      className="font-mono"
    >
      {text}
    </text>
  </svg>
);

export const LeetCode = (p: IconProps) => <Monogram text="LC" {...p} />;

export const CodeChef = (p: IconProps) => <Monogram text="CC" {...p} />;

export const socialIcons = { github: Github, linkedin: Linkedin, leetcode: LeetCode, codechef: CodeChef, mail: Mail };
