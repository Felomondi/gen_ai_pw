"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Link as LinkIcon, Layers } from 'lucide-react'; // Import Layers icon
import Link from 'next/link';

// --- YOUR PROJECTS DATA, ORGANIZED FROM YOUR RESUME ---
const projects = [
  {
    title: "LitLore - Android App",
    description: "An Android app for book discovery that integrates with the Google Books API. Features include user login, dynamic search by title or author, a book details page, and the ability for users to submit text reviews and star ratings. It also has a social media aspect where users can follow other users and see their book reviews.",
    tags: ["Java", "Google Books API"],
    githubUrl: "https://github.com/Felomondi/Litlore-android",
    liveUrl: null,
  },
  {
    title: "LitLore - Website",
    description: "A website for book discovery that integrates with the Google Books API. Features include user login, dynamic search by title or author, a book details page, and the ability for users to submit text reviews and star ratings. It also has a social media aspect where users can follow other users and see their book reviews.",
    tags: ["React", "SCSS", "Python", "Docker", "Google Books API"],
    githubUrl: "https://github.com/Felomondi/Litlore-website",
    liveUrl: "https://litlore.netlify.app/",
  },
  {
    title: "Restaurant Ordering System",
    description: "Built a robust restaurant-ordering system that improved order processing speed by 40%. Implemented database solutions with SQL to reduce data retrieval time by 25%.",
    tags: ["JavaScript", "HTML", "CSS", "Vue.js", "SQL"],
    githubUrl: "https://github.com/Felomondi/Restaurant_Ordiering_System", 
    liveUrl: null,
  },
  {
    title: "Travelling Web UI/UX",
    description: "Crafted a visually appealing front-end for a hiking app, resulting in a 20% increase in user satisfaction. Designed mock interactive mapping and user journey interfaces to showcase potential offline route tracking capabilities.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    githubUrl: "https://github.com/Felomondi/Travel_web_UI_UX",
    liveUrl: "https://travel-web-ui-ux.vercel.app/",
    
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true) }, []);

  return (
    <main className="min-h-screen p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-zinc-100 flex items-center gap-4">
          <Layers size={40} />
          Projects
        </h1>
        
        {isClient && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-zinc-900/30 backdrop-blur-lg border border-zinc-700 rounded-2xl h-full flex flex-col overflow-hidden">
                  <div className="p-6 flex-grow">
                    <h2 className="text-2xl font-bold text-zinc-100 mb-2">{project.title}</h2>
                    <p className="text-zinc-400 mb-4 text-sm flex-grow">{project.description}</p>
                  </div>
                  <div className="p-6 bg-zinc-900/50">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="bg-purple-900/50 text-purple-200 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      {project.githubUrl && (
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors flex items-center gap-2">
                          <Github size={20} />
                          <span>Code</span>
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors flex items-center gap-2">
                          <LinkIcon size={20} />
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