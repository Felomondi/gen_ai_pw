"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Morgan Stanley",
    date: "June 2025 - Present",
    location: "New York, NY",
    description: {
      intro: "Developed a key component of an observability platform focused on data quality assurance:",
      points: [
        "Architected and built a tracking tool in Python to monitor user data as it moved through our quality-check pipeline, identifying the exact stages where issues occurred.",
        "Implemented a system to analyze and report the success and failure rates of specific data quality rules, providing crucial insights for both clients and internal developers.",
        "Designed and developed intuitive monitoring dashboards using Prometheus and Grafana to visualize user process flows and rule performance, which streamlined the debugging process for all stakeholders."
      ]
    },
    skills: ["Python", "SQL", "Prometheus.io", "Grafana", "OpenTelemetry"],
  },

  {
    role: "Software Engineer Intern",
    company: "Amazon",
    date: "June 2024 - August 2024",
    location: "New York, NY",
    description: {
      points: [
        "Developed and implemented new user-facing features for the Android Alexa UI using Java, contributing to a 15% increase in user engagement with core functionalities.",
        "Collaborated with UX/UI designers and product managers to translate design mockups and wireframes into high-quality, responsive code for the Alexa interface.",
        "Engineered reusable UI components, which streamlined development for the team and reduced future implementation time by 20%."
      ]
    },
    skills: ["Java"],
  },
  {
    role: "Web Editor",
    company: "Vassar Student Association",
    date: "Sep 2023 - May 2025",
    location: "Poughkeepsie, NY",
    description: "Responsible for managing and updating the user interface of the VSA website.",
    skills: ["User Interface Design"],
  },
  {
    role: "Software Engineering Fellow",
    company: "Netflix",
    date: "May 2024 - Dec 2024",
    location: "Remote",
    description: "Completed intensive training in advanced software development, focusing on Python (DSA) and System Design, with mentorship from Netflix engineers.",
    skills: ["Systems Design", "Data Structures", "Algorithm Design"],
  },
  {
    role: "Tech Developer Intern",
    company: "SEO (Sponsors for Educational Opportunity)",
    date: "June 2024 - Aug 2024",
    location: "Remote",
    description: "Developed a full-stack book reviewing and rating application using MySQL, Python (Flask), and React, including social integration and instant messaging features.",
    skills: ["Python", "MySQL", "React.js", "JavaScript"],
  },
  {
    role: "Associate Web Developer and Designer",
    company: "Vassar Haiti Project",
    date: "Mar 2023 - Apr 2024",
    location: "Poughkeepsie, NY",
    description: "Designed and implemented visually appealing user interfaces using HTML, CSS, and JavaScript. Conducted testing and debugging to ensure optimal performance.",
    skills: ["HTML", "Bootstrap", "CSS", "User Interface Design", "JavaScript"],
  },
  {
    role: "Bloomberg Engineering Princeton Tech Lab",
    company: "Bloomberg",
    date: "Jun 2023 - Jul 2023",
    location: "Princeton, NJ",
    description: "Selected as one of 38 software engineers for an intensive workshop. Collaborated with engineers to build a Python-based portfolio manager using Jupyter Notebooks.",
    skills: ["Python", "Jupyter Notebooks"],
  },
];

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
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

export default function ExperiencePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true) }, []);

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* subtle grid to match home */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 space-y-3"
        >
          <CodeComment>// experience</CodeComment>
          <div className="flex items-center gap-3">
            <Briefcase className="h-7 w-7 text-emerald-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">
              <span className="text-emerald-600">$</span> experience
            </h1>
          </div>
          <TerminalPrompt>cat experience.log</TerminalPrompt>
        </motion.div>
        
        {isClient && (
          <motion.div
            className="space-y-6"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={cardItemVariants}
                className="rounded-lg border-2 border-gray-900 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-mono text-lg md:text-xl text-gray-900">
                      {exp.role}
                    </h2>
                    <span className="font-mono text-xs text-gray-500">
                      {exp.date}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-gray-700">
                    <span className="px-2 py-0.5 rounded border border-gray-300 bg-gray-50">
                      {exp.company}
                    </span>
                    <span className="text-gray-400">·</span>
                    <span>{exp.location}</span>
                  </div>

                  <div className="mt-3 text-gray-700 text-sm leading-relaxed space-y-1.5">
                    {typeof exp.description === 'string' ? (
                      <p>{exp.description}</p>
                    ) : (
                      <>
                        {exp.description.intro && (
                          <p className="font-medium">{exp.description.intro}</p>
                        )}
                        <ul className="list-disc pl-5 space-y-1.5">
                          {exp.description.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="mt-4">
                    <CodeComment>// tech used</CodeComment>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.skills.map((skill, sIndex) => (
                        <span
                          key={sIndex}
                          className="rounded border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-800 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
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
