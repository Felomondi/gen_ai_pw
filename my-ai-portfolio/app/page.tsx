"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  GraduationCap,
  Github,
  Linkedin,
  Terminal,
  ArrowRight,
} from "lucide-react";

// ---------------------------------------------
// Animation Variants
// ---------------------------------------------
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
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

const Pill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-800/70 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300 backdrop-blur">
    {children}
  </span>
);

function Card({
  title,
  lines,
}: {
  title: string;
  lines: Array<{ k: string; v: string }>;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 ring-1 ring-white/5 shadow-[0_14px_40px_-24px_rgba(0,0,0,0.85)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.18),transparent_55%)]" />
      </div>

      <CodeComment>{title}</CodeComment>

      <div className="mt-3 space-y-1.5 font-mono text-sm text-slate-200">
        {lines.map((l) => (
          <div key={l.k} className="flex gap-2">
            <span className="min-w-[84px] text-emerald-400">{l.k}</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-200">{l.v}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
        <span>active</span>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(56,189,248,0.07),transparent_50%),radial-gradient(900px_circle_at_50%_85%,rgba(148,163,184,0.06),transparent_55%)]" />
        {/* fade edges */}
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,transparent,rgba(2,6,23,0.75))]" />
        {/* keep your existing noise utility if you have it */}
        <div className="absolute inset-0 noise-overlay opacity-25" />
      </div>

      <div className="relative z-10">
        {/* Top bar */}
        <div className="sticky top-0 z-20 border-b border-slate-900/70 bg-slate-950/50 backdrop-blur">
          <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-sm text-slate-200">felix</span>
              <span className="font-mono text-xs text-slate-500">v1</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-slate-800 bg-slate-950/40 font-mono text-slate-200 hover:bg-slate-900"
              >
                <Link href="/projects">
                  ./projects <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-slate-800 bg-slate-950/40 font-mono text-slate-200 hover:bg-slate-900"
              >
                <Link href="/experience">
                  ./experience <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-slate-800 bg-slate-950/40 font-mono text-slate-200 hover:bg-slate-900"
              >
                <Link href="/contact">
                  ./contact <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-slate-800 bg-slate-950/40 font-mono text-slate-200 hover:bg-slate-900"
              >
                <a
                  href="https://github.com/Felomondi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-slate-800 bg-slate-950/40 font-mono text-slate-200 hover:bg-slate-900"
              >
                <a
                  href="https://www.linkedin.com/in/felomondi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
          {/* ---------------- HERO ---------------- */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 grid gap-10 md:grid-cols-[220px_1fr] md:items-start"
          >
            {/* Avatar */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative mx-auto h-40 w-40 md:mx-0 md:h-48 md:w-48">
                <div className="absolute -inset-3 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.25),transparent_55%)] blur-xl" />
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-[0_18px_60px_-34px_rgba(0,0,0,0.95)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/12 via-transparent to-transparent" />
                  <Image
                    src="/images/ai_pic.png"
                    alt="Felix Omondi"
                    fill
                    sizes="(max-width: 768px) 160px, 192px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                </div>
                <div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-md border border-slate-700 bg-emerald-500/90 shadow" />
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                <Pill>
                  <span className="font-mono text-emerald-400">ET</span>
                  <span className="mx-1 text-slate-600">|</span>
                  <span>GMT-5</span>
                </Pill>
                <Pill>
                  <span className="font-mono text-emerald-400">open_to</span>
                  <span className="mx-1 text-slate-600">:</span>
                  <span>Full-time Roles</span>
                </Pill>
                <Pill>
                  <span className="font-mono text-emerald-400">focus</span>
                  <span className="mx-1 text-slate-600">:</span>
                  <span>full-stack + AI</span>
                </Pill>
              </div>
            </motion.div>

            {/* Intro */}
            <div className="text-center md:text-left">
              <motion.div variants={itemVariants} className="mb-2">
                <CodeComment>About</CodeComment>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl lg:text-5xl"
              >
                <span className="font-mono">
                  <span className="text-emerald-500">&lt;</span>
                  Felix Omondi
                  <span className="text-emerald-500"> /&gt;</span>
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="mt-5 space-y-2">
                <TerminalPrompt>whoami</TerminalPrompt>
                <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                  Software Developer and student at{" "}
                  <span className="font-mono text-emerald-400">
                    Vassar College
                  </span>
                  .
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-5 space-y-2">
                <TerminalPrompt>cat bio.txt</TerminalPrompt>
                <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                  Senior studying Computer Science and Math. Building thoughtful
                  software across the stack with a growing focus on{" "}
                  <span className="font-mono text-slate-200">AI/ML</span> and
                  clean, high-signal UX.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
              >
                <Button
                  asChild
                  size="default"
                  className="bg-emerald-500 font-mono text-slate-950 hover:bg-emerald-400"
                >
                  <Link href="/projects">
                    <Terminal className="mr-2 h-4 w-4" /> ./projects
                  </Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-slate-800 bg-slate-950/30 font-mono text-slate-200 hover:bg-slate-900"
                >
                  <a href="/Felix_Omondi_Resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" /> resume.pdf
                  </a>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-slate-800 bg-slate-950/30 font-mono text-slate-200 hover:bg-slate-900"
                >
                  <a
                    href="https://github.com/Felomondi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Felix Omondi GitHub"
                  >
                    <Github className="mr-2 h-4 w-4" /> github
                  </a>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-slate-800 bg-slate-950/30 font-mono text-slate-200 hover:bg-slate-900"
                >
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

              <motion.div variants={itemVariants} className="mt-8">
                <div className="rounded-xl border border-slate-900/80 bg-slate-950/40 p-4 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-left">
                      <div className="font-mono text-xs text-slate-500">
                        <span className="text-emerald-400">status</span>
                        <span className="text-slate-600">:</span> available for
                        roles starting summer 2026
                      </div>
                      <div className="mt-1 text-sm text-slate-400">
                        For full-time roles, collabs, and interesting work.
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                        ping me
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          {/* ---------------- SYSTEM SNAPSHOT ---------------- */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="mb-5">
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-emerald-400" />
                <h2 className="font-mono text-xl font-semibold text-slate-100 md:text-2xl">
                  <span className="text-emerald-400">$</span> system_snapshot
                </h2>
              </div>
              <p className="mt-2 max-w-3xl text-sm text-slate-500">
                A compact view of what I am doing now and what I use to build.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card
                title="now"
                lines={[
                  { k: "role", v: `"Software Engineer Intern"` },
                  { k: "location", v: `"New York, NY"` },
                  { k: "focus", v: `"full-stack systems & AI agents"` },
                ]}
              />

              <Card
                title="stack_and_tools"
                lines={[
                  {
                    k: "frontend",
                    v: `"Next.js, React, TypeScript, HTML, CSS, JavaScript"`,
                  },
                  {
                    k: "backend",
                    v: `"Node, Python, SQL, REST, AWS, Docker, Linux, Git, Postgres"`,
                  },
                  { k: "mobile", v: `"Kotlin, Java"` },
                  { k: "ml", v: `"RAG, LLM tooling"` },
                ]}
              />

              <Card
                title="status"
                lines={[
                  { k: "open_to", v: `"internships & collabs"` },
                  { k: "timezone", v: `"ET (GMT-5)"` },
                  { k: "coffee", v: `"always"` },
                ]}
              />
            </div>
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
              <h2 className="font-mono text-2xl font-semibold text-slate-100 md:text-3xl">
                <span className="text-emerald-400">$</span> education
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 p-6 ring-1 ring-white/5 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.9)]"
            >
              <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl">
                <div className="h-full w-full bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.14),transparent_60%)]" />
              </div>

              <div className="relative space-y-5">
                <div>
                  <TerminalPrompt>cat education.json</TerminalPrompt>

                  <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-800/70 bg-slate-950/40 p-4 text-sm leading-relaxed text-slate-300">
                    <code className="font-mono">
{`{
  "degree": "${education.degree}",
  "institution": "${education.college}",
  "expected": "${education.expected}"
}`}
                    </code>
                  </pre>
                </div>

                <div className="pt-2">
                  <p className="mb-3 font-mono text-xs uppercase tracking-wide text-slate-500">
                    <CodeComment>Relevant Coursework</CodeComment>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {education.courses.map((c) => (
                      <span
                        key={c}
                        className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-1.5 text-sm text-slate-300 backdrop-blur transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/10"
                      >
                        <span className="font-mono">{c}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <div className="mt-16 border-t border-slate-900/70 pt-8 text-center">
            <p className="text-xs text-slate-600">
              Built with Next.js, Tailwind, and a terminal-inspired visual
              system.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}