"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Download, Rocket, GraduationCap, Github, Linkedin, BadgeCheck } from "lucide-react";

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
      staggerChildren: 0.12,
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

const skills = {
  languages: [
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "C++",
    "Kotlin",
    "OCaml",
    "SQL",
    "MySQL",
    "HTML",
    "CSS",
  ],
  frameworks: ["React", "Next.js", "Vue.js", "Android", "Django", ".NET"],
  tools: [
    "Docker",
    "Linux",
    "Git",
    "Figma",
    "REST API",
    "AWS",
    "Prometheus",
    "Grafana",
    "OpenTelemetry",
    "Scrapy",
    "Firebase",
    "PostgreSQL",
    "Azure",
  ],
};

// ---------------------------------------------
// Small UI bits
// ---------------------------------------------
const StackBadge: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ children }) => (
  <motion.span
    variants={itemVariants}
    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 backdrop-blur hover:bg-white/10 transition"
  >
    <BadgeCheck className="h-4 w-4" />
    {children}
  </motion.span>
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-transparent">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-12 md:py-20">
        <GlassCard className="w-full border border-white/10 bg-transparent backdrop-blur-xl">
          <div className="p-6 md:p-12">
            {/* ---------------- HERO ---------------- */}
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="group relative h-44 w-44 overflow-hidden rounded-full border border-white/20 p-[3px] md:h-56 md:w-56">
                  <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-teal-400 opacity-70 blur-xl" />
                  <Image
                    src="/images/ai_pic.png"
                    alt="Felix Omondi"
                    width={224}
                    height={224}
                    className="h-full w-full rounded-full object-cover shadow-xl ring-1 ring-white/20"
                    priority
                  />
                </div>
              </motion.div>

              {/* Intro */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-1 flex-col items-center md:items-start"
              >
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-300">
                  Hello, I&apos;m Felix Omondi.
                </motion.p>
                <motion.h1
                  variants={itemVariants}
                  className="mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-left md:text-5xl"
                >
                  Welcome to my digital space.
                </motion.h1>
                <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-center text-zinc-400 md:text-left">
                  I&apos;m a rising senior at Vassar College studying Computer Science & Math. I build thoughtful
                  software across the stack with a growing focus on AI/ML and delightful user experiences.
                </motion.p>

                <motion.div variants={itemVariants} className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="sm" className="shadow-md">
                    <Link href="/projects">
                      <Rocket className="mr-2 h-4 w-4" /> Explore My Work
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="secondary" className="shadow-md">
                    <a href="/Felix_Omondi_Resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" /> My Resume
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="secondary" className="shadow-md">
                    <a
                      href="https://github.com/Felomondi"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Felix Omondi GitHub"
                    >
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="secondary" className="shadow-md">
                    <a
                      href="https://www.linkedin.com/in/felomondi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Felix Omondi LinkedIn"
                    >
                      <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* ---------------- SKILLS ---------------- */}
            <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.h2
                variants={itemVariants}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-300 via-teal-300 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/20 ring-1 ring-teal-400/40">
                  <BadgeCheck className="h-5 w-5 text-teal-200" />
                </span>
                Languages & Tech Stack
              </motion.h2>

              {/* Languages */}
              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-zinc-400">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((s) => (
                    <StackBadge key={s}>{s}</StackBadge>
                  ))}
                </div>
              </motion.div>

              {/* Frameworks */}
              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-zinc-400">Frameworks & Libraries</p>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((s) => (
                    <StackBadge key={s}>{s}</StackBadge>
                  ))}
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-zinc-400">Tools & Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((s) => (
                    <StackBadge key={s}>{s}</StackBadge>
                  ))}
                </div>
              </motion.div>
            </motion.section>

            {/* Divider */}
            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* ---------------- EDUCATION ---------------- */}
            <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="space-y-4">
              <motion.h2
                variants={itemVariants}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-400 via-teal-400 to-green-500 bg-clip-text text-3xl font-bold text-transparent"
              >
                <GraduationCap className="h-7 w-7" /> Education
              </motion.h2>

              <motion.div variants={itemVariants} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-semibold text-zinc-100">{education.degree}</h3>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-zinc-400">
                  <p className="font-medium text-zinc-300">{education.college}</p>
                  <p>{education.expected}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm uppercase tracking-wider text-zinc-400">Relevant Coursework</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {education.courses.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-teal-500/40 bg-teal-600/15 px-3 py-1 text-sm text-teal-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.section>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}