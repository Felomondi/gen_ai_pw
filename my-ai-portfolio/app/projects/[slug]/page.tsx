// app/projects/[slug]/page.tsx (redesigned detail page, same theme, sticky top bar + back)

"use client";

import React, { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  Github,
  Link as LinkIcon,
  Code2,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projectDetails: Record<
  string,
  {
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    githubUrl: string | null;
    liveUrl: string | null;
    features: string[];
    challenges: string[];
    techStack: {
      frontend?: string[];
      backend?: string[];
      database?: string[];
      infrastructure?: string[];
    };
  }
> = {
  "coteacher-ai": {
    title: "CoTeacher AI – Course RAG Assistant",
    description:
      "A full-stack platform where instructors upload course materials and students chat with a course-specific AI.",
    longDescription:
      "CoTeacher AI is an intelligent course assistant platform that leverages Retrieval-Augmented Generation (RAG) to provide students with personalized, course-specific AI tutoring. The platform enables instructors to upload various course materials (PDFs, DOCX, PPTX) which are then processed, chunked, and embedded using OpenAI's API. Students can interact with a ChatGPT-style interface that answers questions based on the uploaded course content, ensuring accurate and contextually relevant responses.",
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
    features: [
      "Multi-role authentication system (Owner/TA/Student) with role-based access control",
      "Document upload and processing pipeline supporting PDF, DOCX, and PPTX formats",
      "Server-side RAG implementation with vector embeddings and semantic search",
      "Per-course vector database isolation for accurate, course-specific responses",
      "ChatGPT-style UI with conversation history and integrity guardrails",
      "Real-time chat interface with streaming responses",
      "File management system with Supabase Storage integration",
    ],
    challenges: [
      "Implementing efficient chunking strategies for different document types while preserving context",
      "Designing a scalable vector search system that maintains per-course data isolation",
      "Balancing response accuracy with response time in the RAG pipeline",
      "Creating an intuitive UI that handles complex document structures and long conversations",
    ],
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      backend: ["Node.js", "Next.js API Routes", "OpenAI API"],
      database: ["PostgreSQL", "Supabase", "Vector Embeddings"],
      infrastructure: ["Vercel", "Supabase Storage"],
    },
  },
  slidesdesk: {
    title: "SlidesDesk - Presentation Tool",
    description:
      "A web app that turns long, free-form briefs into structured presentation outlines using AI.",
    longDescription:
      "SlidesDesk is an AI-powered presentation generator that transforms unstructured text briefs into well-organized presentation outlines. The application uses OpenAI's API to analyze input text and generate structured slides with titles, talking points, visual suggestions, and speaker notes. Users can interactively edit, refine, and generate variations of their presentations, making it an ideal tool for quickly creating professional presentation structures.",
    tags: ["Python", "Tailwind CSS", "TypeScript", "FastAPI", "JavaScript", "OpenAI API"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
    features: [
      "AI-powered brief-to-outline conversion using OpenAI GPT models",
      "FastAPI backend with Pydantic-validated JSON outputs and error handling",
      "Interactive slide editor with inline editing capabilities",
      "Per-slide bullet point management (add/remove/modify)",
      'Generate Variations feature to compare 2-3 alternative outline approaches',
      "Progress indicator showing presentation completion status",
      "Clean, modern UI with light/dark mode support",
      "Framer Motion animations for smooth user interactions",
      "Docker containerization for easy deployment",
      "Railway deployment with CI/CD integration",
    ],
    challenges: [
      "Ensuring consistent JSON structure from OpenAI API responses using Pydantic validation",
      "Implementing graceful fallbacks when API responses don't match expected format",
      "Creating an intuitive editing experience that maintains presentation structure",
      "Optimizing API calls to reduce costs while maintaining response quality",
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Python", "FastAPI", "Pydantic", "OpenAI API"],
      infrastructure: ["Docker", "Railway", "Vercel"],
    },
  },
};

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

function Section({
  label,
  children,
}: React.PropsWithChildren<{ label: string }>) {
  return (
    <motion.section
      variants={itemVariants}
      className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-6 ring-1 ring-white/5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.9)]"
    >
      <CodeComment>{label}</CodeComment>
      <div className="mt-3">{children}</div>
    </motion.section>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projectDetails[slug];

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-2xl font-mono text-slate-100 mb-4">
            Project not found
          </h1>
          <Link href="/projects" className="text-emerald-400 hover:underline font-mono">
            ← Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background layers to match other pages */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(56,189,248,0.07),transparent_50%),radial-gradient(900px_circle_at_50%_85%,rgba(148,163,184,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,transparent,rgba(2,6,23,0.75))]" />
        <div className="absolute inset-0 noise-overlay opacity-25" />
      </div>

      <div className="relative z-10">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-20 border-b border-slate-900/70 bg-slate-950/50 backdrop-blur">
          <div className="container mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-sm text-slate-200">project</span>
            </div>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-slate-800 bg-slate-950/40 font-mono text-slate-200 hover:bg-slate-900"
            >
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                back
              </Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-14 md:py-20">
          {/* Header */}
          <motion.header
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 space-y-3"
          >
            <motion.div variants={itemVariants}>
              <CodeComment>{slug}</CodeComment>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <Code2 className="h-7 w-7 text-emerald-400" />
              <h1 className="font-mono text-3xl font-bold text-slate-100 md:text-4xl">
                <span className="text-emerald-400">$</span> {project.title}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <TerminalPrompt>cat project.md</TerminalPrompt>
              <p className="text-sm leading-relaxed text-slate-500">
                {project.description}
              </p>
            </motion.div>
          </motion.header>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <Section label="overview">
              <p className="text-slate-300 leading-relaxed">{project.longDescription}</p>
            </Section>

            <Section label="tech stack">
              <div className="space-y-3 font-mono text-sm">
                {project.techStack.frontend && (
                  <div>
                    <span className="text-emerald-400">frontend</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-slate-300">
                      [{project.techStack.frontend.join(", ")}]
                    </span>
                  </div>
                )}
                {project.techStack.backend && (
                  <div>
                    <span className="text-emerald-400">backend</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-slate-300">
                      [{project.techStack.backend.join(", ")}]
                    </span>
                  </div>
                )}
                {project.techStack.database && (
                  <div>
                    <span className="text-emerald-400">database</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-slate-300">
                      [{project.techStack.database.join(", ")}]
                    </span>
                  </div>
                )}
                {project.techStack.infrastructure && (
                  <div>
                    <span className="text-emerald-400">infrastructure</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-slate-300">
                      [{project.techStack.infrastructure.join(", ")}]
                    </span>
                  </div>
                )}
              </div>
            </Section>

            <Section label="features">
              <ul className="space-y-2 text-slate-300">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="challenges">
              <ul className="space-y-2 text-slate-300">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="tags">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-1 text-xs font-mono text-slate-200 backdrop-blur transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Section>

            {(project.githubUrl || project.liveUrl) && (
              <Section label="links">
                <div className="flex flex-wrap gap-4">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-sm text-slate-300 transition-colors hover:text-slate-100"
                    >
                      <Github size={18} />
                      <span>open code</span>
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-sm text-slate-300 transition-colors hover:text-slate-100"
                    >
                      <LinkIcon size={18} />
                      <span>open demo</span>
                    </Link>
                  )}
                </div>
              </Section>
            )}
          </motion.div>

          <div className="mt-16 border-t border-slate-900/70 pt-8 text-center">
            <p className="text-xs text-slate-600">
              Tip: Highlight tradeoffs, constraints, and measurable outcomes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}