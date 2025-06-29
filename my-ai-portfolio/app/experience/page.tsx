"use client";

// We add useState and useEffect to the imports
import React, { useState, useEffect } from "react";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  // ... (Your existing experience data is unchanged)
  {
    role: "Software Engineer Intern",
    company: "Morgan Stanley",
    date: "June 2025 - Present",
    location: "New York, NY",
    description: "Working on internal trade reporting applications.",
    skills: ["Python", "SQL", "Prometheus.io", "Grafana", "OpenTelemetry"],
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
  {
    role: "College Access Mentor",
    company: "Equity Group Foundation",
    date: "May 2022 - Aug 2022",
    location: "Nairobi, Kenya",
    description: "Guided high school graduates through college applications, provided SAT preparation, and reviewed essays, helping scholars gain admission to top US universities.",
    skills: ["Peer Tutoring", "Communication", "Team Leadership", "Community Empowerment"],
  },
];

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15 },
  },
};

const lineItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function ExperiencePage() {
  // --- FIX FOR HYDRATION ERROR ---
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code runs only in the browser, after the page has loaded
    setIsClient(true);
  }, []);
  // --- END OF FIX ---

  return (
    <main className="min-h-screen p-4 md:p-12 flex justify-center">
      <GlassCard className="w-full max-w-4xl my-12">
        <div className="p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-zinc-100 flex items-center gap-4">
            <Briefcase size={40} />
            Work Experience
          </h1>
          
          {/* We only render the animated list if we are on the client */}
          {isClient && (
            <motion.div className="space-y-8" variants={listContainerVariants} initial="hidden" animate="visible">
              {experiences.map((exp, index) => (
                <motion.div key={index} variants={cardItemVariants} className="border-l-2 border-purple-400 pl-6">
                  <motion.h2 variants={lineItemVariants} className="text-2xl font-bold text-zinc-100">{exp.role}</motion.h2>
                  <motion.div variants={lineItemVariants} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-zinc-400">
                    <p className="font-semibold text-lg text-zinc-300">{exp.company}</p>
                    <p>{exp.date}</p>
                    <p>{exp.location}</p>
                  </motion.div>
                  <motion.p variants={lineItemVariants} className="mt-2 text-zinc-300">{exp.description}</motion.p>
                  <motion.div variants={lineItemVariants} className="mt-3 flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="bg-zinc-800 text-purple-300 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </GlassCard>
    </main>
  );
}