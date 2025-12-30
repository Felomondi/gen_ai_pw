"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Link as LinkIcon, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      "SlidesDeck is a web app that turns long, free-form briefs into structured presentation outlines using the OpenAI API. Features include a FastAPI backend with Pydantic-validated JSON outputs and graceful fallbacks; a React/Tailwind UI with a clean glass look, light/dark mode, and Framer Motion; inline editing of slide titles, talking points, visual suggestions, and speaker notes; per-slide add/remove bullets, a progress indicator, and a \"Generate Variations\" option to compare 2–3 alternative outlines. The app is containerized and deployed on Railway.",
    tags: ["Python", "Tailwind CSS", "TypeScript", "FastAPI", "JavaScript", "OpenAI API"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
    hasDetailPage: true,
  },
  {
    title: "LitLore - Android App",
    description:
      "An Android app for book discovery that integrates with the Google Books API. Features include user login, dynamic search by title or author, a book details page, and the ability for users to submit text reviews and star ratings. It also has a social media aspect where users can follow other users and see their book reviews.",
    tags: ["Java", "Google Books API"],
    githubUrl: "https://github.com/Felomondi/Litlore-android",
    liveUrl: null,
  },
  {
    title: "LitLore - Website",
    description:
      "A website for book discovery that integrates with the Google Books API. Features include user login, dynamic search by title or author, a book details page, and the ability for users to submit text reviews and star ratings. It also has a social media aspect where users can follow other users and see their book reviews.",
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
      "Crafted a visually appealing front-end for a hiking app, resulting in a 20% increase in user satisfaction. Designed mock interactive mapping and user journey interfaces to showcase potential offline route tracking capabilities.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    githubUrl: "https://github.com/Felomondi/Travel_web_UI_UX",
    liveUrl: "https://travel-web-ui-ux.vercel.app/",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const TerminalPrompt: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="font-mono text-sm">
    <span className="text-emerald-600">$</span>{' '}
    <span className="text-gray-700">{children}</span>
  </div>
);

const CodeComment: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="font-mono text-xs text-gray-400">// {children}</span>
);

export default function ProjectsPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* subtle grid to match home */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

      <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 space-y-3"
        >
          <CodeComment>// projects</CodeComment>
          <div className="flex items-center gap-3">
            <Layers className="h-7 w-7 text-emerald-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">
              <span className="text-emerald-600">$</span> projects
            </h1>
          </div>
          <TerminalPrompt>ls ./projects</TerminalPrompt>
        </motion.div>

        {isClient && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="rounded-lg border-2 border-gray-900 bg-white h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-5 flex-grow space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-mono text-lg text-gray-900">
                        {project.title}
                      </h2>
                      {project.hasDetailPage && (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-mono text-xs text-gray-900 hover:text-emerald-600 transition-colors flex items-center gap-1 font-medium"
                        >
                          <span>read more</span>
                          <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-3">
                    <CodeComment>// stack</CodeComment>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tIndex) => (
                        <span
                          key={tIndex}
                          className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-mono text-gray-800 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2 flex-wrap">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
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
                          className="font-mono text-xs text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                        >
                          <LinkIcon size={16} />
                          <span>open demo</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}