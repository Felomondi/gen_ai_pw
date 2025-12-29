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

export default function ExperiencePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true) }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 flex items-center gap-3"
        >
          <Briefcase className="h-8 w-8 text-gray-700" />
          Work Experience
        </motion.h1>
        
        {isClient && (
          <motion.div
            className="space-y-8"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={cardItemVariants}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="border-l-4 border-gray-900 pl-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{exp.role}</h2>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-gray-600 mb-4">
                    <p className="font-medium">{exp.company}</p>
                    <p>{exp.date}</p>
                    <p>{exp.location}</p>
                  </div>
                  
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {typeof exp.description === 'string' ? (
                      <p>{exp.description}</p>
                    ) : (
                      <>
                        {exp.description.intro && <p className="mb-2">{exp.description.intro}</p>}
                        <ul className="list-disc pl-5 space-y-1.5">
                          {exp.description.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIndex) => (
                      <span
                        key={sIndex}
                        className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
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
