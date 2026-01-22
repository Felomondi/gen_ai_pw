"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  ArrowLeft,
  Terminal,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
      },
    }),
    []
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const TerminalPrompt: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className="font-mono text-sm">
      <span className="text-emerald-400">$</span>{" "}
      <span className="text-slate-300">{children}</span>
    </div>
  );

  const CodeComment: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="font-mono text-xs text-slate-500">// {children}</span>
  );

  const FieldLabel = ({ children }: React.PropsWithChildren) => (
    <div className="mb-2 flex items-center gap-2">
      <span className="font-mono text-xs text-emerald-400">const</span>
      <span className="font-mono text-sm font-medium text-slate-100">{children}</span>
      <span className="font-mono text-xs text-slate-500">=</span>
    </div>
  );

  const inputClass =
    "h-11 !bg-slate-950/40 !border-slate-800/80 font-mono !text-slate-100 !placeholder:text-slate-500 " +
    "focus:!border-emerald-400/70 focus:!ring-2 focus:!ring-emerald-500/20 " +
    "transition-colors";

  const textareaClass =
    "!bg-slate-950/40 !border-slate-800/80 font-mono !text-slate-100 !placeholder:text-slate-500 " +
    "focus:!border-emerald-400/70 focus:!ring-2 focus:!ring-emerald-500/20 " +
    "transition-colors resize-none";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background layers (matches your other pages) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(56,189,248,0.07),transparent_50%),radial-gradient(900px_circle_at_50%_85%,rgba(148,163,184,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,transparent,rgba(2,6,23,0.75))]" />
        <div className="absolute inset-0 noise-overlay opacity-25" />
      </div>

      <div className="relative z-10">
        {/* Sticky top bar + back */}
        <div className="sticky top-0 z-20 border-b border-slate-900/70 bg-slate-950/50 backdrop-blur">
          <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-sm text-slate-200">contact</span>
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

        <div className="container mx-auto grid max-w-5xl gap-8 px-4 py-14 md:py-20 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* Left: header + small “card” */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <CodeComment>contact</CodeComment>

              <div className="flex items-center gap-3">
                <Mail className="h-7 w-7 text-emerald-400" />
                <h1 className="font-mono text-3xl font-bold text-slate-100 md:text-4xl">
                  <span className="text-emerald-400">$</span> contact
                </h1>
              </div>

              <div className="space-y-2">
                <TerminalPrompt>send_message()</TerminalPrompt>
                <p className="max-w-xl text-sm leading-relaxed text-slate-500">
                  For collaborations, internships, or interesting systems work. I usually respond within
                  24–48 hours.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 ring-1 ring-white/5 shadow-[0_18px_60px_-34px_rgba(0,0,0,0.95)]"
            >
              <div className="pointer-events-none absolute -inset-24 opacity-50 blur-3xl">
                <div className="h-full w-full bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.14),transparent_55%)]" />
              </div>

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <CodeComment>quick notes</CodeComment>
                  <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                    open_to: collabs
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    <span>Be specific about timeline and what you need.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    <span>If you have links (GitHub, spec, deck), include them.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                    <span>I read every message. No spam, please.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.section>

          {/* Right: form */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 ring-1 ring-white/5 shadow-[0_18px_60px_-34px_rgba(0,0,0,0.95)] md:p-8"
          >
            <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-300 hover:opacity-100">
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.16),transparent_55%)]" />
            </div>

            <div className="relative">
              <motion.div variants={itemVariants} className="mb-5">
                <CodeComment>contact_form</CodeComment>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <div className="rounded-lg border border-slate-800/70 bg-slate-950/35 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-mono text-xs text-slate-500">
                      <span className="text-emerald-400">POST</span>
                      <span className="text-slate-600"> </span>/api/contact
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {status === "loading"
                        ? "status: sending"
                        : status === "success"
                        ? "status: delivered"
                        : status === "error"
                        ? "status: error"
                        : "status: idle"}
                    </span>
                  </div>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={itemVariants}>
                  <FieldLabel>name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='"Your name"'
                    className={inputClass}
                    autoComplete="name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FieldLabel>email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='"you@example.com"'
                    className={inputClass}
                    autoComplete="email"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FieldLabel>message</FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='"Let’s build something."'
                    rows={6}
                    className={textareaClass}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="pt-1">
                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 font-mono text-slate-950 hover:bg-emerald-400"
                    disabled={status === "loading"}
                  >
                    {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {status === "success" && <CheckCircle2 className="mr-2 h-4 w-4" />}
                    {status === "error" && <AlertCircle className="mr-2 h-4 w-4" />}
                    {status === "idle" && <Send className="mr-2 h-4 w-4" />}
                    {status === "loading"
                      ? "sending..."
                      : status === "success"
                      ? "message_sent()"
                      : status === "error"
                      ? "retry()"
                      : "submit()"}
                  </Button>

                  <p className="mt-3 text-center font-mono text-xs text-slate-600">
                    By submitting, you agree to be contacted back at your email address.
                  </p>
                </motion.div>
              </form>

              {/* Alerts */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="font-mono text-sm text-emerald-300">
                        <span className="text-emerald-400">✓</span> Delivered.
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        Thanks for reaching out. I will get back to you soon.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 p-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-red-400" />
                    <div>
                      <p className="font-mono text-sm text-red-300">
                        <span className="text-red-400">✗</span> Failed to send.
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        Please try again. If it persists, reach out on LinkedIn.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}