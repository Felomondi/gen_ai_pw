"use client";

import Link from "next/link";
import { useMode } from "@/components/ModeContext";
import AgentProjectsPage from "@/components/agent/AgentProjectsPage";

const projects = [
  {
    title: "CoTeacher AI",
    slug: "coteacher-ai",
    description: "full-stack RAG platform — instructors upload course materials, students chat with a course-specific AI. multi-role auth, vector search, streaming responses.",
    tags: ["next.js", "typescript", "supabase", "openai"],
    githubUrl: null,
    liveUrl: null,
    hasDetailPage: true,
  },
  {
    title: "SlidesDesk",
    slug: "slidesdesk",
    description: "turns long briefs into structured presentation outlines using AI. fastapi backend with pydantic validation, react frontend with inline editing.",
    tags: ["python", "fastapi", "react", "openai"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
    hasDetailPage: true,
  },
  {
    title: "LitLore (Android)",
    slug: null,
    description: "android app for book discovery with google books API. login, search, reviews, ratings, and a social feed.",
    tags: ["java", "google books api"],
    githubUrl: "https://github.com/Felomondi/Litlore-android",
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    title: "LitLore (Web)",
    slug: null,
    description: "web version of the book discovery platform. search, reviews, star ratings, and social following.",
    tags: ["react", "python", "docker"],
    githubUrl: "https://github.com/Felomondi/Litlore-website",
    liveUrl: "https://litlore.netlify.app/",
    hasDetailPage: false,
  },
  {
    title: "Restaurant Ordering System",
    slug: null,
    description: "ordering system that improved processing speed by 40%. sql-backed with optimized data retrieval.",
    tags: ["javascript", "vue.js", "sql"],
    githubUrl: "https://github.com/Felomondi/Restaurant_Ordiering_System",
    liveUrl: null,
    hasDetailPage: false,
  },
  {
    title: "Travelling Web UI/UX",
    slug: null,
    description: "front-end for a hiking app with interactive mapping and offline route tracking interfaces.",
    tags: ["next.js", "tailwind", "typescript"],
    githubUrl: "https://github.com/Felomondi/Travel_web_UI_UX",
    liveUrl: "https://travel-web-ui-ux.vercel.app/",
    hasDetailPage: false,
  },
];

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

      <div className="mt-14 space-y-10">
        {projects.map((p) => (
          <article key={p.title} className="group">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-base font-medium text-[var(--text)]">
                {p.hasDetailPage && p.slug ? (
                  <Link href={`/projects/${p.slug}`} className="inline-link">
                    {p.title}
                  </Link>
                ) : (
                  p.title
                )}
              </h2>
              <div className="flex gap-2">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                    code
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                    demo
                  </a>
                )}
              </div>
            </div>
            <p className="mt-1.5 text-[15px] text-[var(--text-secondary)] leading-relaxed">
              {p.description}
            </p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              {p.tags.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
