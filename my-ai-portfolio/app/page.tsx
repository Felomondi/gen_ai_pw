"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Rocket, GraduationCap, Github, Linkedin } from "lucide-react";

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
const StackBadge: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.span
    variants={itemVariants}
    className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
  >
    {children}
  </motion.span>
);

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        {/* ---------------- HERO ---------------- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-20 flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16"
        >
          {/* Avatar */}
          <motion.div
            variants={itemVariants}
            className="relative shrink-0"
          >
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl shadow-lg md:h-48 md:w-48">
              <Image
                src="/images/ai_pic.png"
                alt="Felix Omondi"
                width={192}
                height={192}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Intro */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <motion.p variants={itemVariants} className="text-base text-gray-600 md:text-lg">
              Hello, I&apos;m Felix Omondi.
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl"
            >
              Software Developer & Student
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg"
            >
              I&apos;m a rising senior at Vassar College studying Computer Science & Math. I build thoughtful
              software across the stack with a growing focus on AI/ML and delightful user experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <Button asChild size="default">
                <Link href="/projects">
                  <Rocket className="mr-2 h-4 w-4" /> View Projects
                </Link>
              </Button>
              <Button asChild size="default" variant="outline">
                <a href="/Felix_Omondi_Resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
              <Button asChild size="default" variant="outline">
                <a
                  href="https://github.com/Felomondi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Felix Omondi GitHub"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button asChild size="default" variant="outline">
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
          </div>
        </motion.div>

        {/* ---------------- SKILLS ---------------- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-20 space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-900 md:text-3xl"
          >
            Skills & Technologies
          </motion.h2>

          {/* Languages */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Languages</p>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((s) => (
                <StackBadge key={s}>{s}</StackBadge>
              ))}
            </div>
          </motion.div>

          {/* Frameworks */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Frameworks & Libraries
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.frameworks.map((s) => (
                <StackBadge key={s}>{s}</StackBadge>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Tools & Platforms</p>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((s) => (
                <StackBadge key={s}>{s}</StackBadge>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ---------------- EDUCATION ---------------- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.h2
            variants={itemVariants}
            className="flex items-center gap-3 text-2xl font-semibold text-gray-900 md:text-3xl"
          >
            <GraduationCap className="h-6 w-6 text-gray-700" /> Education
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900">{education.degree}</h3>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-gray-600">
              <p className="font-medium">{education.college}</p>
              <p>{education.expected}</p>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Relevant Coursework
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {education.courses.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}