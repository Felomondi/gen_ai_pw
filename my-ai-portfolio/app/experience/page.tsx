"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Briefcase, ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Morgan Stanley",
    date: "June 2025 - Present",
    location: "New York, NY",
    description: {
      intro:
        "Developed a key component of an observability platform focused on data quality assurance:",
      points: [
        "Architected and built a tracking tool in Python to monitor user data as it moved through our quality-check pipeline, identifying the exact stages where issues occurred.",
        "Implemented a system to analyze and report the success and failure rates of specific data quality rules, providing crucial insights for both clients and internal developers.",
        "Designed and developed intuitive monitoring dashboards using Prometheus and Grafana to visualize user process flows and rule performance, which streamlined the debugging process for all stakeholders.",
      ],
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
        "Engineered reusable UI components, which streamlined development for the team and reduced future implementation time by 20%.",
      ],
    },
    skills: ["Java"],
  },
  {
    role: "Web Editor",
    company: "Vassar Student Association",
    date: "Sep 2023 - May 2025",
    location: "Poughkeepsie, NY",
    description:
      "Responsible for managing and updating the user interface of the VSA website.",
    skills: ["User Interface Design"],
  },
  {
    role: "Software Engineering Fellow",
    company: "Netflix",
    date: "May 2024 - Dec 2024",
    location: "Remote",
    description:
      "Completed intensive training in advanced software development, focusing on Python (DSA) and System Design, with mentorship from Netflix engineers.",
    skills: ["Systems Design", "Data Structures", "Algorithm Design"],
  },
  {
    role: "Tech Developer Intern",
    company: "SEO (Sponsors for Educational Opportunity)",
    date: "June 2024 - Aug 2024",
    location: "Remote",
    description:
      "Developed a full-stack book reviewing and rating application using MySQL, Python (Flask), and React, including social integration and instant messaging features.",
    skills: ["Python", "MySQL", "React.js", "JavaScript"],
  },
  {
    role: "Associate Web Developer and Designer",
    company: "Vassar Haiti Project",
    date: "Mar 2023 - Apr 2024",
    location: "Poughkeepsie, NY",
    description:
      "Designed and implemented visually appealing user interfaces using HTML, CSS, and JavaScript. Conducted testing and debugging to ensure optimal performance.",
    skills: ["HTML", "Bootstrap", "CSS", "User Interface Design", "JavaScript"],
  },
  {
    role: "Bloomberg Engineering Princeton Tech Lab",
    company: "Bloomberg",
    date: "Jun 2023 - Jul 2023",
    location: "Princeton, NJ",
    description:
      "Selected as one of 38 software engineers for an intensive workshop. Collaborated with engineers to build a Python-based portfolio manager using Jupyter Notebooks.",
    skills: ["Python", "Jupyter Notebooks"],
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

function ExperienceCard({
  exp,
}: {
  exp: (typeof experiences)[number];
}) {
  const description = exp.description;
  const hasStructuredDescription =
    typeof description === "object" && description !== null && "points" in description;
  const points = hasStructuredDescription ? description.points : [];
  const intro =
    hasStructuredDescription && "intro" in description ? description.intro : undefined;

  return (
    <motion.article
      variants={itemVariants}
      className="group relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 p-5 ring-1 ring-white/5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.9)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.16),transparent_55%)]" />
      </div>

      <div className="relative space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="font-mono text-lg text-slate-100 md:text-xl">
              {exp.role}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <Pill>
                <span className="text-emerald-400">company</span>
                <span className="mx-1 text-slate-600">:</span>
                <span>{exp.company}</span>
              </Pill>
              <Pill>
                <span className="text-emerald-400">location</span>
                <span className="mx-1 text-slate-600">:</span>
                <span>{exp.location}</span>
              </Pill>
            </div>
          </div>

          <div className="text-right">
            <div className="font-mono text-xs text-slate-500">date</div>
            <div className="font-mono text-xs text-slate-300">{exp.date}</div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

        <div className="text-sm leading-relaxed text-slate-300">
          {typeof description === "string" ? (
            <p>{description}</p>
          ) : (
            <div className="space-y-3">
              {intro && (
                <p className="text-slate-200">{intro}</p>
              )}
              <ul className="space-y-2">
                {points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-2">
          <CodeComment>tech used</CodeComment>
          <div className="mt-2 flex flex-wrap gap-2">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-1 text-xs font-mono text-slate-200 backdrop-blur transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background layers to match home */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(56,189,248,0.07),transparent_50%),radial-gradient(900px_circle_at_50%_85%,rgba(148,163,184,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,transparent,rgba(2,6,23,0.75))]" />
        <div className="absolute inset-0 noise-overlay opacity-25" />
      </div>

      <div className="relative z-10">
        {/* Top bar with back button */}
        <div className="sticky top-0 z-20 border-b border-slate-900/70 bg-slate-950/50 backdrop-blur">
          <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-sm text-slate-200">experience</span>
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

        <div className="container mx-auto max-w-4xl px-4 py-14 md:py-20">
          {/* Header */}
          <motion.header
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 space-y-3"
          >
            <motion.div variants={itemVariants}>
              <CodeComment>experience</CodeComment>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <Briefcase className="h-7 w-7 text-emerald-400" />
              <h1 className="font-mono text-3xl font-bold text-slate-100 md:text-4xl">
                <span className="text-emerald-400">$</span> experience
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <TerminalPrompt>cat experience.log</TerminalPrompt>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                A focused timeline of internships and roles, with impact and the
                tools used.
              </p>
            </motion.div>
          </motion.header>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* Cards */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {experiences.map((exp) => (
              <ExperienceCard key={`${exp.company}-${exp.role}-${exp.date}`} exp={exp} />
            ))}
          </motion.section>

          <div className="mt-16 border-t border-slate-900/70 pt-8 text-center">
            <p className="text-xs text-slate-600">
              Tip: Keep bullets scoped to outcomes, not tasks.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}