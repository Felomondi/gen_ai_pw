"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, GraduationCap, Github, Linkedin, Terminal } from "lucide-react";

// ---------------------------------------------
// Animation Variants
// ---------------------------------------------
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------
// Data
// ---------------------------------------------
const education = {
  degree: "BSc Computer Science & Math (Statistics)",
  college: "Vassar College",
  expected: "Expected: May 2026",
  courses: [
    "Object Oriented Programming (Java)",
    "Data Structures & Algorithms",
    "Data Science",
    "Android Development",
    "Compilers",
    "Operating Systems",
    "Computer Networks",
  ],
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

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      <div className="absolute inset-0 noise-overlay opacity-25" />
      
      <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24 relative z-10">
        {/* ---------------- HERO ---------------- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-20 flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16"
        >
          {/* Avatar with tech border */}
          <motion.div
            variants={itemVariants}
            className="relative shrink-0 group"
          >
            <div className="relative h-40 w-40 overflow-hidden rounded-lg border-2 border-slate-700 shadow-lg md:h-48 md:w-48">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/images/ai_pic.png"
                alt="Felix Omondi"
                width={192}
                height={192}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 h-6 w-6 border-2 border-slate-700 bg-emerald-500" />
          </motion.div>

          {/* Intro with terminal aesthetic */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <motion.div variants={itemVariants} className="mb-2">
              <CodeComment>// About</CodeComment>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="mt-2 text-3xl font-bold tracking-tight text-slate-100 md:text-4xl lg:text-5xl font-mono"
            >
              <span className="text-emerald-600">&lt;</span>
              <span className="text-slate-100">Felix Omondi</span>
              <span className="text-emerald-600"> /&gt;</span>
            </motion.h1>
            <motion.div variants={itemVariants} className="mt-4 space-y-2">
              <TerminalPrompt>whoami</TerminalPrompt>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                Software Developer & Student at{" "}
                <span className="font-mono text-emerald-400">Vassar College</span>
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-4 space-y-2">
              <TerminalPrompt>cat bio.txt</TerminalPrompt>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                Senior studying Computer Science & Math. Building thoughtful software across the stack 
                with a growing focus on <span className="font-mono text-slate-100">AI/ML</span> and delightful user experiences.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <Button asChild size="default" className="font-mono bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                <Link href="/projects">
                  <Terminal className="mr-2 h-4 w-4" /> ./projects
                </Link>
              </Button>
              <Button asChild size="default" variant="outline" className="font-mono border-slate-700 text-slate-200 hover:bg-slate-900">
                <a href="/Felix_Omondi_Resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> resume.pdf
                </a>
              </Button>
              <Button asChild size="default" variant="outline" className="font-mono border-slate-700 text-slate-200 hover:bg-slate-900">
                <a
                  href="https://github.com/Felomondi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Felix Omondi GitHub"
                >
                  <Github className="mr-2 h-4 w-4" /> github
                </a>
              </Button>
              <Button asChild size="default" variant="outline" className="font-mono border-slate-700 text-slate-200 hover:bg-slate-900">
                <a
                  href="https://www.linkedin.com/in/felomondi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Felix Omondi LinkedIn"
                >
                  <Linkedin className="mr-2 h-4 w-4" /> linkedin
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

        {/* ---------------- SYSTEM SNAPSHOT ---------------- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 grid gap-6 md:grid-cols-3"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-slate-800/80 bg-slate-900/90 p-4 ring-1 ring-white/5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40"
          >
            <CodeComment>// now</CodeComment>
            <div className="mt-3 space-y-1 font-mono text-sm text-slate-200">
              <div>
                <span className="text-emerald-400">role</span>
                <span className="text-slate-500">: </span>
                <span>"Software Engineer Intern"</span>
              </div>
              <div>
                <span className="text-emerald-400">location</span>
                <span className="text-slate-500">: </span>
                <span>"New York, NY"</span>
              </div>
              <div>
                <span className="text-emerald-400">focus</span>
                <span className="text-slate-500">: </span>
                <span>"full‑stack systems & AI Agents"</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-slate-800/80 bg-slate-900/90 p-4 ring-1 ring-white/5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40"
          >
            <CodeComment>// current stack and tools</CodeComment>
            <div className="mt-3 font-mono text-sm text-slate-200 space-y-1">
              <div>
                <span className="text-emerald-400">frontend</span>
                <span className="text-slate-500">: </span>
                <span>"Next.js, React, TypeScript, HTML, CSS, JavaScript"</span>
              </div>
              <div>
                <span className="text-emerald-400">backend</span>
                <span className="text-slate-500">: </span>
                <span>"Node, Python, SQL, REST APIs, AWS, Docker, Linux, Git, Prometheus, Grafana, OpenTelemetry, Django, .NET, Firebase, PostgreSQL, Azure"</span>
              </div>
              <div>
                <span className="text-emerald-400">Mobile</span>
                <span className="text-slate-500">: </span>
                <span>"Kotlin, Java"</span>
              </div>
              <div>
                <span className="text-emerald-400">ml</span>
                <span className="text-slate-500">: </span>
                <span>"RAG, LLM tooling"</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-slate-800/80 bg-slate-900/90 p-4 ring-1 ring-white/5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40"
          >
            <CodeComment>// status</CodeComment>
            <div className="mt-3 font-mono text-sm text-slate-200 space-y-1">
              <div>
                <span className="text-emerald-400">open_to</span>
                <span className="text-slate-500">: </span>
                <span>"internships & collabs"</span>
              </div>
              <div>
                <span className="text-emerald-400">timezone</span>
                <span className="text-slate-500">: </span>
                <span>"ET (GMT‑5)"</span>
              </div>
              <div>
                <span className="text-emerald-400">coffee</span>
                <span className="text-slate-500">: </span>
                <span>"always"</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

        {/* ---------------- EDUCATION ---------------- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-emerald-400" />
            <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl font-mono">
              <span className="text-emerald-400">$</span> education
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-lg border-2 border-slate-700/90 bg-slate-900/90 p-6 ring-1 ring-white/5 shadow-[0_12px_34px_-18px_rgba(0,0,0,0.85)]"
          >
            <div className="space-y-4">
              <div>
                <TerminalPrompt>cat education.json</TerminalPrompt>
                <div className="mt-3 font-mono text-sm">
                  <div className="text-slate-500">{"{"}</div>
                  <div className="pl-4 space-y-1">
                    <div>
                      <span className="text-emerald-400">&quot;degree&quot;</span>
                      <span className="text-slate-500">: </span>
                      <span className="text-slate-300">&quot;{education.degree}&quot;</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">&quot;institution&quot;</span>
                      <span className="text-slate-500">: </span>
                      <span className="text-slate-300">&quot;{education.college}&quot;</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">&quot;expected&quot;</span>
                      <span className="text-slate-500">: </span>
                      <span className="text-slate-300">&quot;{education.expected}&quot;</span>
                    </div>
                  </div>
                  <div className="text-slate-500">{"}"}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500 mb-3 font-mono">
                  <CodeComment>// Relevant Coursework</CodeComment>
                </p>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((c) => (
                    <span
                      key={c}
                      className="rounded border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-300 font-mono hover:border-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}