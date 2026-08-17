"use client";

import Link from "next/link";
import { useMode } from "@/components/ModeContext";
import AgentProjectsPage from "@/components/agent/AgentProjectsPage";

const projects = [
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
  {
    title: "LitLore (Android)",
    slug: null,
    category: "mobile app",
    description:
      "android app for book discovery with google books API. login, search, reviews, ratings, and a social feed.",
    tags: ["java", "google books api"],
    githubUrl: "https://github.com/Felomondi/Litlore-android",
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    title: "LitLore (Web)",
    slug: null,
    category: "web app",
    description:
      "web version of the book discovery platform. search, reviews, star ratings, and social following.",
    tags: ["react", "python", "docker"],
    githubUrl: "https://github.com/Felomondi/Litlore-website",
    liveUrl: "https://litlore.netlify.app/",
    hasDetailPage: false,
  },
  {
    title: "Restaurant Ordering System",
    slug: null,
    category: "full-stack",
    description:
      "ordering system that improved processing speed by 40%. sql-backed with optimized data retrieval.",
    tags: ["javascript", "vue.js", "sql"],
    githubUrl: "https://github.com/Felomondi/Restaurant_Ordiering_System",
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    title: "Travelling Web UI/UX",
    slug: null,
    category: "frontend",
    description:
      "front-end for a hiking app with interactive mapping and offline route tracking interfaces.",
    tags: ["next.js", "tailwind", "typescript"],
    githubUrl: "https://github.com/Felomondi/Travel_web_UI_UX",
    liveUrl: "https://travel-web-ui-ux.vercel.app/",
    hasDetailPage: false,
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
    "inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--text)] hover:text-[var(--text)] transition-colors";

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
  const { mode } = useMode();

  if (mode === "agent") return <AgentProjectsPage />;

  return (
    <div className="mx-auto max-w-[720px] px-6 py-20 md:py-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
        projects
      </h1>
      <p className="mt-3 text-[var(--text-secondary)] text-[15px]">
        things i&apos;ve built — full-stack systems, AI tooling, and product interfaces.
      </p>

      <div className="mt-14 space-y-12">
        {projects.map((p) => (
          <article key={p.title}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-medium text-[var(--text)]">{p.title}</h2>
              <span className="shrink-0 font-mono text-xs text-[var(--text-muted)]">
                {p.category}
              </span>
            </div>

            <p className="mt-2 text-[15px] text-[var(--text-secondary)] leading-relaxed">
              {p.description}
            </p>

            <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
              {p.tags.join(" · ")}
            </p>

            {(p.liveUrl || p.githubUrl || (p.hasDetailPage && p.slug)) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.liveUrl && (
                  <ProjectLink href={p.liveUrl} label="live demo" external />
                )}
                {p.githubUrl && (
                  <ProjectLink href={p.githubUrl} label="source" external />
                )}
                {p.hasDetailPage && p.slug && (
                  <ProjectLink href={`/projects/${p.slug}`} label="case study" />
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
