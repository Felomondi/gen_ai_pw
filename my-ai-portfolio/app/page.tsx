"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Download, Rocket, GraduationCap, Github, Linkedin } from "lucide-react"; // Added Github and Linkedin icons
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

// Your education data
const education = {
    degree: "BSc Computer Science & Math (Statistics)",
    college: "Vassar College",
    expected: "Expected: May 2026",
    courses: ["Object Oriented Programming (Java)", "Data Structures & Algorithms", "Data Science", 
      "Android Development", "Compilers", "Operating Systems", "Calculuc I, II & III", "Linear Algebra",
      "probability"]
};

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const lineItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
}

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true) }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <GlassCard className="w-full max-w-6xl">
        <div className="p-8 md:p-12">
          {/* --- SECTION 1: HERO / WELCOME --- */}
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <div className="w-48 h-48 md:w-60 md:h-60 flex-shrink-0">
              <Image
                src="/images/ai_pic.png"
                alt="Felix Omondi"
                width={240}
                height={240}
                className="rounded-full object-cover border-4 border-zinc-500/30 shadow-lg"
                priority
              />
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-xl md:text-2xl text-zinc-300">
                Hello, I&apos;m Felix Omondi.
              </p>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Welcome to my digital space.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-zinc-400">
                I am a rising Senior at Vassar College studying Computer Science and Math. I am interested in AI, Machine Learning, and Software Development.
              </p>
              <div className="mt-6 flex gap-4">
                <Button asChild>
                  <Link href="/projects">
                    <Rocket className="mr-2 h-4 w-4" />
                    Explore My Work
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/Felix_Omondi_Resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    My Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* --- SEPARATOR --- */}
          <div className="border-t border-zinc-500/30 my-4"></div>

          {/* --- SECTION 2: SOCIAL LINKS (New Section) --- */}
          {isClient && (
            <motion.section 
                className="py-6 text-center"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-2xl font-bold text-zinc-200 mb-4">Connect With Me</h2>
                <div className="flex justify-center gap-4">
                    <Button asChild variant="secondary">
                        <a href="https://github.com/Felomondi" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                        </a>
                    </Button>
                     <Button asChild variant="secondary">
                        <a href="https://www.linkedin.com/in/felomondi/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn
                        </a>
                    </Button>
                </div>
            </motion.section>
          )}

          {/* --- SEPARATOR --- */}
          <div className="border-t border-zinc-500/30 my-4"></div>

          {/* --- SECTION 3: EDUCATION --- */}
          {isClient && (
            <motion.section 
              className="px-8 md:px-12 py-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-500 flex items-center gap-4">
                <GraduationCap size={36} />
                Education
              </h2>
              <div className="border-l-2 border-teal-400 pl-6">
                <motion.h3 variants={lineItemVariants} className="text-2xl font-bold text-zinc-100">{education.degree}</motion.h3>
                <motion.div variants={lineItemVariants} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-zinc-400">
                    <p className="font-semibold text-lg text-zinc-300">{education.college}</p>
                    <p>{education.expected}</p>
                </motion.div>
                <motion.div variants={lineItemVariants} className="mt-4">
                    <h4 className="text-xl font-semibold text-zinc-200 mb-3">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                        {education.courses.map((course, index) => (
                            <span key={index} className="bg-teal-900/50 text-teal-200 text-sm font-medium px-3 py-1 rounded-full border border-teal-500/50">
                                {course}
                            </span>
                        ))}
                    </div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </div>
      </GlassCard>
    </main>
  );
}