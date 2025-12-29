"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Link as LinkIcon, Layers } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: "CoTeacher AI – Course RAG Assistant",
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
  },
  {
    title: "SlidesDesk - Presentation Tool",
    description:
      "SlidesDeck is a web app that turns long, free-form briefs into structured presentation outlines using the OpenAI API. Features include a FastAPI backend with Pydantic-validated JSON outputs and graceful fallbacks; a React/Tailwind UI with a clean glass look, light/dark mode, and Framer Motion; inline editing of slide titles, talking points, visual suggestions, and speaker notes; per-slide add/remove bullets, a progress indicator, and a \"Generate Variations\" option to compare 2–3 alternative outlines. The app is containerized and deployed on Railway.",
    tags: ["Python", "Tailwind CSS", "TypeScript", "FastAPI", "JavaScript", "OpenAI API"],
    githubUrl: "https://github.com/Felomondi/slidesdeck-frontend",
    liveUrl: "https://slidesdeck.vercel.app/",
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

export default function ProjectsPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 flex items-center gap-3"
        >
          <Layers className="h-8 w-8 text-gray-700" />
          Projects
        </motion.h1>

        {isClient && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h2>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tIndex) => (
                        <span
                          key={tIndex}
                          className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <Github size={18} />
                          <span>Code</span>
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <LinkIcon size={18} />
                          <span>Live Demo</span>
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