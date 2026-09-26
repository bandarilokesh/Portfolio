export type Accent = "cyan" | "violet";

export const profile = {
  name: "Lokesh Bandari",
  initials: "LB",
  headline: "AI Engineering & Full-Stack with AI",
  subheadline:
    "Building RAG pipelines, agentic workflows and MCP servers — and shipping them inside full-stack MERN apps. B.Tech Class of 2028.",
  location: "Hyderabad, Telangana",
  timezone: "Asia/Kolkata",
};

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Wins", href: "#recognition" },
  { label: "Contact", href: "#contact" },
];

export type Skill = {
  id: string;
  category: string;
  summary: string;
  items: string[];
  accent: Accent;
  size: "large" | "medium" | "small";
  /** Grid placement for the asymmetric bento layout (md+ only). */
  layout: string;
  /** Column layout for the skill list inside the tile. */
  itemsLayout: string;
};

export const skills: Skill[] = [
  {
    id: "ai-engineering",
    category: "AI Engineering",
    summary: "Building LLM-powered systems, from data ingestion and retrieval to autonomous agents.",
    items: [
      "Python",
      "Generative AI & NLP",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases: Qdrant",
      "LLM Ingestion Pipelines",
      "Prompt Engineering",
      "Agentic Workflows",
      "MCP Servers",
    ],
    accent: "cyan",
    size: "large",
    layout: "md:col-span-2 lg:col-span-8 lg:row-span-2",
    itemsLayout: "grid grid-cols-2 gap-3 sm:grid-cols-4",
  },
  {
    id: "core-cs",
    category: "Core CS Subjects",
    summary: "The computer-science fundamentals everything else rests on.",
    items: [
      "Object-Oriented Programming (OOP)",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "System Design",
      "Linux",
    ],
    accent: "violet",
    size: "medium",
    layout: "lg:col-span-4 lg:row-span-2",
    itemsLayout: "grid gap-2",
  },
  {
    id: "dsa",
    category: "Data Structures & Algorithms",
    summary: "Algorithmic problem-solving with the core data structures.",
    items: [
      "Algorithmic Problem-Solving",
      "Arrays, Strings, Linked Lists, Stacks & Queues",
      "Hashing, Trees, Graphs",
      "Sorting & Searching",
      "Recursion & Dynamic Programming",
    ],
    accent: "violet",
    size: "small",
    layout: "lg:col-span-7",
    itemsLayout: "flex flex-wrap gap-2",
  },
  {
    id: "web",
    category: "Web Technologies — MERN Stack",
    summary: "Full-stack JavaScript, from the database to the UI.",
    items: ["JavaScript (ES6+)", "React.js", "Node.js", "Express.js", "MongoDB"],
    accent: "cyan",
    size: "small",
    layout: "lg:col-span-5",
    itemsLayout: "flex flex-wrap gap-2",
  },
];

/** Every skill, for the scrolling toolkit strip under the grid. */
export const toolkit = skills.flatMap((s) => s.items);

export type Project = {
  id: string;
  index: string;
  title: string;
  description: string;
  stack: string[];
  accent: Accent;
  visual: "rag" | "artisan" | "solar" | "site";
  href: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "lumina-ai",
    index: "P/01",
    title: "Lumina AI — Research Paper Assistant",
    description:
      "Chat with academic PDFs: cited answers, multi-style summaries, flashcards, quizzes, knowledge graphs and research-gap detection. Hybrid dense + BM25 retrieval with cross-encoder reranking, and every answer is verified claim-by-claim with a confidence score. Runs on Gemini or fully offline via Ollama.",
    stack: ["Python", "FastAPI", "RAG", "FAISS / ChromaDB", "Sentence Transformers", "Gemini / Ollama"],
    accent: "cyan",
    visual: "rag",
    href: "https://github.com/bandarilokesh/luminaai",
    featured: true,
  },
  {
    id: "kala-vaani",
    index: "P/02",
    title: "Kala Vaani — AI Platform for Artisans",
    description:
      "Helps rural artisans sell online: speak in Hindi or English and snap one photo, and Gemini builds the full product catalog. An AI studio creates product shots and marketing posters, a fair-wage engine suggests pricing, and buyers find products through semantic search.",
    stack: ["React Native (Expo)", "NestJS", "TypeScript", "Supabase / PostgreSQL", "Prisma", "pgvector", "Gemini", "Razorpay"],
    accent: "violet",
    visual: "artisan",
    href: "https://github.com/bandarilokesh/Kala-Vaani",
  },
  {
    id: "solar-skin-orr",
    index: "P/03",
    title: "SOLAR-SKIN ORR",
    description:
      "A reimagined-city concept that turns Hyderabad's 158 km Outer Ring Road into a solar corridor: elevated thin-film panels along the medians and shoulders power streetlights, toll plazas and EV charging. Gemini was used to explore and visualise the design.",
    stack: ["Gemini", "Prompt Engineering", "Concept Design"],
    accent: "cyan",
    visual: "solar",
    href: "https://github.com/bandarilokesh/SOLAR-SKIN-ORR-FUN-CRAZY-2.0-",
  },
  {
    id: "thorgym",
    index: "P/04",
    title: "Thor Barbell Club — Gym Website",
    description:
      "A responsive website for a Hyderabad warehouse gym: video hero, animated stat counters, programs, membership plans, a reviews carousel and a WhatsApp-linked contact section, all hand-built in a single HTML/CSS/JS page.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "violet",
    visual: "site",
    href: "https://github.com/bandarilokesh/thorgym",
  },
];

export type Win = {
  tag: string;
  title: string;
  description: string;
};

// TODO(Lokesh): PLACEHOLDER — these wins and certifications are copied from
// revanth1404.vercel.app as a layout sample. Replace them with your own before publishing.
export const recognition = {
  eyebrow: "Recognition",
  title: "Wins & Credentials",
  intro: "Hackathon stages, national evaluations and the certifications along the way.",
  wins: [
    {
      tag: "SIH 2025",
      title: "National Evaluation Presenter",
      description: "Smart India Hackathon — selected via internal hackathon to present nationwide.",
    },
    { tag: "ACM", title: "Top 5 — Webathon 4.0", description: "Led the CampusGig team to a top-five finish." },
    { tag: "ACM", title: "Runner-Up — Replicon", description: "Frontend development challenge." },
    {
      tag: "KLH",
      title: "Blockchain Hackathon",
      description: "Built PitchForge AI with Algorand x402 payment-gated export.",
    },
    { tag: "Finalist", title: "VJStartups Ideathon", description: "Pitched a fintech idea to the finals." },
    { tag: "Finalist", title: "Convergence 2k25R", description: "Turing Hut coding contest." },
  ] satisfies Win[],
  certifications: ["NPTEL Elite — Java", "Prompt Engineering"],
};

export const contact = {
  eyebrow: "Get in touch",
  title: "Let's Build Something Extraordinary",
  intro: "Have an internship, a project or an idea in mind? I'd love to hear about it.",
  email: "lokeshvardhanb@gmail.com",
  location: "Hyderabad, Telangana, India",
  availability: "Open to internships",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lokesh-vardhan", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/bandarilokesh", icon: "github" },
  { label: "LeetCode", href: "https://leetcode.com/u/bandarilokesh/", icon: "leetcode" },
  { label: "CodeChef", href: "https://www.codechef.com/users/lokeshvardhanb", icon: "codechef" },
  { label: "Email", href: `mailto:${contact.email}`, icon: "mail" },
] as const;

export const accentHex: Record<Accent, string> = {
  cyan: "#00f0ff",
  violet: "#8a2be2",
};

export const accentRgb: Record<Accent, string> = {
  cyan: "0 240 255",
  violet: "138 43 226",
};
