// app/projects/page.tsx (redesigned list page with back button, same theme)

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Github,
  Link as LinkIcon,
  Layers,
  ArrowRight,
  ArrowLeft,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "CoTeacher AI – Course RAG Assistant",
    slug: "coteacher-ai",
    description:
      "A full-stack platform where instructors upload course materials and students chat with a course-specific AI. Features owner/TA/student roles, Supabase Storage + Postgres, server-side RAG indexing (PDF/DOCX/PPTX parsing, chunking, OpenAI embeddings), per-course vector search, and a ChatGPT-style UI with integrity guardrails.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Postgres",
      "RAG",
      "OpenAI API",
      "Vercel",
      "Node.js",
    ],
    githubUrl: null,
    liveUrl: null,
    hasDetailPage: true,
  },
  {
    title: "SlidesDesk - Presentation Tool",
    slug: "slidesdesk",
    description:
      'SlidesDeck turns long briefs into structured presentation outlines using the OpenAI API. FastAPI + Pydantic JSON outputs, React/Tailwind UI, inline slide editing, progress indicator, and "Generate Variations". Containerized and deployed on Railway.',
    tags: ["Python", "Tailwind CSS", "TypeScript", "FastAPI", "JavaScript", "OpenAI API"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
    hasDetailPage: true,
  },
  {
    title: "LitLore - Android App",
    description:
      "An Android app for book discovery that integrates with the Google Books API. User login, dynamic search, book details, text reviews, star ratings, and a social feed.",
    tags: ["Java", "Google Books API"],
    githubUrl: "https://github.com/Felomondi/Litlore-android",
    liveUrl: null,
  },
  {
    title: "LitLore - Website",
    description:
      "A website for book discovery with Google Books API integration. User login, dynamic search, book details, text reviews, star ratings, and social following.",
    tags: ["React", "SCSS", "Python", "Docker", "Google Books API"],
    githubUrl: "https://github.com/Felomondi/Litlore-website",
    liveUrl: "https://litlore.netlify.app/",
  },
  {
    title: "Restaurant Ordering System",
    description:
      "Built a robust restaurant-ordering system that improved order processing speed by 40%. Implemented database solutions with SQL to reduce data retrieval time by 25%.",
    tags: ["JavaScript", "HTML", "CSS", "Vue.js", "SQL"],
    githubUrl: "https://github.com/Felomondi/Restaurant_Ordiering_System",
    liveUrl: null,
  },
  {
    title: "Travelling Web UI/UX",
    description:
      "Crafted a visually appealing front-end for a hiking app, increasing user satisfaction by 20%. Designed interactive mapping and user journey interfaces for offline route tracking.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    githubUrl: "https://github.com/Felomondi/Travel_web_UI_UX",
    liveUrl: "https://travel-web-ui-ux.vercel.app/",
  },
];

// ---------------------------------------------
// Animations
// ---------------------------------------------
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------
// Small UI bits
// ---------------------------------------------
const TerminalPrompt: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="font-mono text-sm">
    <span className="text-emerald-400">$</span>{" "}
    <span className="text-slate-300">{children}</span>
  </div>
);

const CodeComment: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-mono text-xs text-slate-500">// {children}</span>
);

const Pill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-800/70 bg-slate-950/35 px-2.5 py-1 text-xs text-slate-300 backdrop-blur">
    {children}
  </span>
);

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 ring-1 ring-white/5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.9)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.16),transparent_55%)]" />
      </div>

      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-mono text-lg text-slate-100">{project.title}</h2>

          {project.hasDetailPage && project.slug && (
            <Link
              href={`/projects/${project.slug}`}
              className="shrink-0 font-mono text-xs font-medium text-slate-200 transition-colors hover:text-emerald-400"
            >
              <span className="inline-flex items-center gap-1">
                read more <ArrowRight size={12} />
              </span>
            </Link>
          )}
        </div>

        <div className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-5">
          {project.description}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Pill>
            <span className="text-emerald-400 font-mono">stack</span>
            <span className="mx-1 text-slate-600">:</span>
            <span>{project.tags.length} tags</span>
          </Pill>

          {project.liveUrl && (
            <Pill>
              <span className="text-emerald-400 font-mono">demo</span>
              <span className="mx-1 text-slate-600">:</span>
              <span>available</span>
            </Pill>
          )}

          {project.githubUrl && (
            <Pill>
              <span className="text-emerald-400 font-mono">code</span>
              <span className="mx-1 text-slate-600">:</span>
              <span>public</span>
            </Pill>
          )}
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

        <div className="mt-4">
          <CodeComment>stack</CodeComment>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.slice(0, 8).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-1 text-xs font-mono text-slate-200 backdrop-blur transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 8 && (
              <span className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-1 text-xs font-mono text-slate-400">
                +{project.tags.length - 8} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 pt-1">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate-300 transition-colors hover:text-slate-100 inline-flex items-center gap-2"
            >
              <Github size={16} />
              <span>open code</span>
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate-300 transition-colors hover:text-slate-100 inline-flex items-center gap-2"
            >
              <LinkIcon size={16} />
              <span>open demo</span>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background layers to match home/experience */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(56,189,248,0.07),transparent_50%),radial-gradient(900px_circle_at_50%_85%,rgba(148,163,184,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,transparent,rgba(2,6,23,0.75))]" />
        <div className="absolute inset-0 noise-overlay opacity-25" />
      </div>

      <div className="relative z-10">
        {/* Top bar with back button */}
        <div className="sticky top-0 z-20 border-b border-slate-900/70 bg-slate-950/50 backdrop-blur">
          <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-sm text-slate-200">projects</span>
            </div>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-slate-800 bg-slate-950/40 font-mono text-slate-200 hover:bg-slate-900"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                back
              </Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          {/* Header */}
          <motion.header
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 space-y-3"
          >
            <motion.div variants={itemVariants}>
              <CodeComment>projects</CodeComment>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <Layers className="h-7 w-7 text-emerald-400" />
              <h1 className="font-mono text-3xl font-bold text-slate-100 md:text-4xl">
                <span className="text-emerald-400">$</span> projects
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <TerminalPrompt>ls ./projects</TerminalPrompt>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
                Selected work across full-stack systems, RAG tooling, and product UI.
              </p>
            </motion.div>
          </motion.header>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* Grid */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((p) => (
              <ProjectCard
                key={`${p.title}-${p.githubUrl ?? "no-gh"}-${p.liveUrl ?? "no-live"}`}
                project={p}
              />
            ))}
          </motion.section>

          <div className="mt-16 border-t border-slate-900/70 pt-8 text-center">
            <p className="text-xs text-slate-600">
              Tip: Keep project summaries outcome-driven (impact, constraints, tradeoffs).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}