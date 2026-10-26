import Link from "next/link";

type Project = {
  title: string;
  slug: string | null;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  liveLabel?: string;
  hasDetailPage: boolean;
};

const projects: Project[] = [
  {
    title: "Remi",
    slug: null,
    category: "voice · fintech",
    description: "tracking expenses should be as easy as speaking",
    tags: ["ios", "voice recognition", "ai"],
    githubUrl: null,
    liveUrl: "https://www.getremiapp.com/",
    liveLabel: "website",
    hasDetailPage: false,
  },
  {
    title: "Relynt",
    slug: null,
    category: "ai infrastructure",
    description:
      "write-action firewall that evaluates AI agent requests against declarative policies in under 40ms, returning allow, block, or escalate decisions before execution.",
    tags: ["typescript", "python", "fastapi", "tailwind css", "supabase", "openai"],
    githubUrl: null,
    liveUrl: "https://relynt.vercel.app/",
    hasDetailPage: false,
  },
  {
    title: "Sendleaf",
    slug: null,
    category: "legal · ai",
    description:
      "an ai paralegal for immigration law firms.",
    tags: ["ai", "legal tech"],
    githubUrl: null,
    liveUrl: "https://www.sendleaf.co/",
    liveLabel: "website",
    hasDetailPage: false,
  },
  {
    title: "Pilcrow",
    slug: null,
    category: "macos · productivity",
    description:
      "a mac menu-bar app that transcribes your calls on-device and writes the summary and action items when they end — nothing leaves your computer.",
    tags: ["macos", "on-device ai", "apple intelligence"],
    githubUrl: null,
    liveUrl: "https://pilcrownotes.com/",
    liveLabel: "website",
    hasDetailPage: false,
  },
  {
    title: "Framer Export",
    slug: null,
    category: "developer tool",
    description:
      "exports published Framer sites to private GitHub repositories and self-hostable ZIP files.",
    tags: ["next.js", "typescript", "github oauth", "web extraction"],
    githubUrl: null,
    liveUrl: "https://www.framerextract.com/",
    hasDetailPage: false,
  },
  {
    title: "CoTeacher AI",
    slug: "coteacher-ai",
    category: "ai · full-stack",
    description:
      "full-stack RAG platform — instructors upload course materials, students chat with a course-specific AI. multi-role auth, vector search, streaming responses.",
    tags: ["next.js", "typescript", "supabase", "openai"],
    githubUrl: null,
    liveUrl: null,
    hasDetailPage: true,
  },
  {
    title: "SlidesDesk",
    slug: "slidesdesk",
    category: "ai tooling",
    description:
      "turns long briefs into structured presentation outlines using AI. fastapi backend with pydantic validation, react frontend with inline editing.",
    tags: ["python", "fastapi", "react", "openai"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
    hasDetailPage: true,
  },
];

function ProjectLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--text-secondary)] hover:border-[var(--text)] hover:text-[var(--text)] transition-colors";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label} <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-20 md:py-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
        projects
      </h1>
      <p className="mt-3 text-[var(--text-secondary)] text-[15px]">
        things i&apos;ve built — full-stack systems, AI tooling, and product interfaces.
      </p>

      <div className="mt-10 space-y-7">
        {projects.map((p) => (
          <article key={p.title}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-base font-medium text-[var(--text)]">{p.title}</h2>
              <span className="shrink-0 font-mono text-xs text-[var(--text-muted)]">
                {p.category}
              </span>
            </div>

            <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-snug">
              {p.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {p.tags.join(" · ")}
              </p>

              {(p.liveUrl || p.githubUrl || (p.hasDetailPage && p.slug)) && (
                <div className="flex flex-wrap gap-1.5">
                  {p.liveUrl && (
                    <ProjectLink href={p.liveUrl} label={p.liveLabel ?? "live demo"} external />
                  )}
                  {p.githubUrl && (
                    <ProjectLink href={p.githubUrl} label="source" external />
                  )}
                  {p.hasDetailPage && p.slug && (
                    <ProjectLink href={`/projects/${p.slug}`} label="case study" />
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
