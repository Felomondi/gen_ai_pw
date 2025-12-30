"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, Link as LinkIcon, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const projectDetails: Record<string, {
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
}> = {
  "coteacher-ai": {
    title: "CoTeacher AI – Course RAG Assistant",
    description: "A full-stack platform where instructors upload course materials and students chat with a course-specific AI.",
    longDescription: "CoTeacher AI is an intelligent course assistant platform that leverages Retrieval-Augmented Generation (RAG) to provide students with personalized, course-specific AI tutoring. The platform enables instructors to upload various course materials (PDFs, DOCX, PPTX) which are then processed, chunked, and embedded using OpenAI's API. Students can interact with a ChatGPT-style interface that answers questions based on the uploaded course content, ensuring accurate and contextually relevant responses.",
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
  "slidesdesk": {
    title: "SlidesDesk - Presentation Tool",
    description: "A web app that turns long, free-form briefs into structured presentation outlines using AI.",
    longDescription: "SlidesDesk is an AI-powered presentation generator that transforms unstructured text briefs into well-organized presentation outlines. The application uses OpenAI's API to analyze input text and generate structured slides with titles, talking points, visual suggestions, and speaker notes. Users can interactively edit, refine, and generate variations of their presentations, making it an ideal tool for quickly creating professional presentation structures.",
    tags: ["Python", "Tailwind CSS", "TypeScript", "FastAPI", "JavaScript", "OpenAI API"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
    features: [
      "AI-powered brief-to-outline conversion using OpenAI GPT models",
      "FastAPI backend with Pydantic-validated JSON outputs and error handling",
      "Interactive slide editor with inline editing capabilities",
      "Per-slide bullet point management (add/remove/modify)",
      "Generate Variations feature to compare 2-3 alternative outline approaches",
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

const TerminalPrompt: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="font-mono text-sm">
    <span className="text-emerald-600">$</span>{" "}
    <span className="text-gray-700">{children}</span>
  </div>
);

const CodeComment: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-mono text-xs text-gray-400">// {children}</span>
);

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projectDetails[slug];

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-mono text-gray-900 mb-4">Project not found</h1>
          <Link href="/projects" className="text-emerald-600 hover:underline font-mono">
            ← Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24 relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/projects">
            <Button variant="outline" className="font-mono border-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              back
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-3"
        >
          <CodeComment>// {slug}</CodeComment>
          <div className="flex items-center gap-3">
            <Code2 className="h-7 w-7 text-emerald-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">
              <span className="text-emerald-600">$</span> {project.title.toLowerCase()}
            </h1>
          </div>
          <TerminalPrompt>cat project.md</TerminalPrompt>
        </motion.div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 md:p-8 mb-6"
        >
          <div className="space-y-6">
            {/* Description */}
            <div>
              <CodeComment>// overview</CodeComment>
              <p className="mt-3 text-gray-700 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <CodeComment>// tech stack</CodeComment>
              <div className="mt-3 space-y-3">
                {project.techStack.frontend && (
                  <div>
                    <span className="font-mono text-sm text-emerald-600">frontend</span>
                    <span className="font-mono text-sm text-gray-400">: </span>
                    <span className="font-mono text-sm text-gray-700">
                      [{project.techStack.frontend.join(", ")}]
                    </span>
                  </div>
                )}
                {project.techStack.backend && (
                  <div>
                    <span className="font-mono text-sm text-emerald-600">backend</span>
                    <span className="font-mono text-sm text-gray-400">: </span>
                    <span className="font-mono text-sm text-gray-700">
                      [{project.techStack.backend.join(", ")}]
                    </span>
                  </div>
                )}
                {project.techStack.database && (
                  <div>
                    <span className="font-mono text-sm text-emerald-600">database</span>
                    <span className="font-mono text-sm text-gray-400">: </span>
                    <span className="font-mono text-sm text-gray-700">
                      [{project.techStack.database.join(", ")}]
                    </span>
                  </div>
                )}
                {project.techStack.infrastructure && (
                  <div>
                    <span className="font-mono text-sm text-emerald-600">infrastructure</span>
                    <span className="font-mono text-sm text-gray-400">: </span>
                    <span className="font-mono text-sm text-gray-700">
                      [{project.techStack.infrastructure.join(", ")}]
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div>
              <CodeComment>// features</CodeComment>
              <ul className="mt-3 space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-600 font-mono">-</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div>
              <CodeComment>// challenges & solutions</CodeComment>
              <ul className="mt-3 space-y-2">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-600 font-mono">→</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <CodeComment>// tags</CodeComment>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-800 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div>
                <CodeComment>// links</CodeComment>
                <div className="mt-3 flex flex-wrap gap-4">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
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
                      className="font-mono text-sm text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    >
                      <LinkIcon size={18} />
                      <span>open demo</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

