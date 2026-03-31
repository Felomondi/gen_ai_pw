"use client";

import { use } from "react";
import Link from "next/link";
import { useMode } from "@/components/ModeContext";
import AgentProjectDetailPage from "@/components/agent/AgentProjectDetailPage";

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
    title: "CoTeacher AI",
    description: "a full-stack platform where instructors upload course materials and students chat with a course-specific AI.",
    longDescription: "CoTeacher AI is an intelligent course assistant platform that leverages Retrieval-Augmented Generation (RAG) to provide students with personalized, course-specific AI tutoring. The platform enables instructors to upload various course materials (PDFs, DOCX, PPTX) which are then processed, chunked, and embedded using OpenAI's API. Students can interact with a ChatGPT-style interface that answers questions based on the uploaded course content, ensuring accurate and contextually relevant responses.",
    tags: ["next.js", "typescript", "tailwind css", "supabase", "postgres", "rag", "openai api", "vercel", "node.js"],
    githubUrl: null,
    liveUrl: null,
    features: [
      "multi-role authentication system (owner/TA/student) with role-based access control",
      "document upload and processing pipeline supporting PDF, DOCX, and PPTX formats",
      "server-side RAG implementation with vector embeddings and semantic search",
      "per-course vector database isolation for accurate, course-specific responses",
      "ChatGPT-style UI with conversation history and integrity guardrails",
      "real-time chat interface with streaming responses",
      "file management system with supabase storage integration",
    ],
    challenges: [
      "implementing efficient chunking strategies for different document types while preserving context",
      "designing a scalable vector search system that maintains per-course data isolation",
      "balancing response accuracy with response time in the RAG pipeline",
      "creating an intuitive UI that handles complex document structures and long conversations",
    ],
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      backend: ["Node.js", "Next.js API Routes", "OpenAI API"],
      database: ["PostgreSQL", "Supabase", "Vector Embeddings"],
      infrastructure: ["Vercel", "Supabase Storage"],
    },
  },
  slidesdesk: {
    title: "SlidesDesk",
    description: "a web app that turns long, free-form briefs into structured presentation outlines using AI.",
    longDescription: "SlidesDesk is an AI-powered presentation generator that transforms unstructured text briefs into well-organized presentation outlines. The application uses OpenAI's API to analyze input text and generate structured slides with titles, talking points, visual suggestions, and speaker notes. Users can interactively edit, refine, and generate variations of their presentations.",
    tags: ["python", "tailwind css", "typescript", "fastapi", "javascript", "openai api"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
    features: [
      "AI-powered brief-to-outline conversion using OpenAI GPT models",
      "FastAPI backend with Pydantic-validated JSON outputs and error handling",
      "interactive slide editor with inline editing capabilities",
      "generate variations feature to compare 2-3 alternative outline approaches",
      "progress indicator showing presentation completion status",
      "docker containerization for easy deployment",
    ],
    challenges: [
      "ensuring consistent JSON structure from OpenAI API responses using Pydantic validation",
      "implementing graceful fallbacks when API responses don't match expected format",
      "creating an intuitive editing experience that maintains presentation structure",
      "optimizing API calls to reduce costs while maintaining response quality",
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Python", "FastAPI", "Pydantic", "OpenAI API"],
      infrastructure: ["Docker", "Railway", "Vercel"],
    },
  },
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { mode } = useMode();
  const { slug } = use(params);
  const project = projectDetails[slug];

  if (!project) {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-28 text-center">
        <h1 className="text-xl font-medium">project not found</h1>
        <Link href="/projects" className="mt-4 inline-block text-[var(--text-secondary)] inline-link">
          back to projects
        </Link>
      </div>
    );
  }

  if (mode === "agent") return <AgentProjectDetailPage project={project} />;

  return (
    <div className="mx-auto max-w-[720px] px-6 py-20 md:py-28">
      <Link href="/projects" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
        ← projects
      </Link>

      <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
        {project.title}
      </h1>
      <p className="mt-3 text-[15px] text-[var(--text-secondary)]">{project.description}</p>

      {(project.githubUrl || project.liveUrl) && (
        <div className="mt-4 flex gap-4 text-sm">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
              source code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
              live demo
            </a>
          )}
        </div>
      )}

      <hr className="my-12 border-[var(--border)]" />

      <div className="space-y-10 text-[15px]">
        <section>
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">overview</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{project.longDescription}</p>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">tech stack</h2>
          <div className="space-y-2 text-[var(--text-secondary)]">
            {Object.entries(project.techStack).map(([category, items]) =>
              items ? (
                <p key={category}>
                  <span className="text-[var(--text)]">{category}</span> — {items.join(", ")}
                </p>
              ) : null
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">features</h2>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">challenges</h2>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            {project.challenges.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-[var(--text-muted)]">
          {project.tags.join(" · ")}
        </p>
      </div>
    </div>
  );
}
