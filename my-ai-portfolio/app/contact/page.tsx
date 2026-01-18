"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Send, Loader, CheckCircle, AlertCircle, Mail } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
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

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center py-16">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      
      <div className="container mx-auto max-w-2xl px-4 relative z-10">
        <motion.div
          className="rounded-lg border-2 border-slate-700 bg-slate-900 p-8 md:p-12 shadow-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <CodeComment>contact</CodeComment>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
            <Mail className="h-6 w-6 text-emerald-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 font-mono">
              <span className="text-emerald-400">$</span> contact
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-8">
            <TerminalPrompt>send_message()</TerminalPrompt>
            <p className="mt-2 text-slate-300 text-sm">
              Have a question or want to collaborate? Fill out the form below.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-emerald-400">const</span>
                <label htmlFor="name" className="font-mono text-sm text-slate-100 font-medium">
                      name
                    </label>
                <span className="font-mono text-xs text-slate-500">=</span>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='"Your Name"'
                className="!bg-slate-900 !border-2 !border-slate-700 font-mono !text-slate-100 !placeholder:text-slate-500 focus:!border-emerald-400"
                style={{ color: '#e2e8f0', backgroundColor: '#0f172a' }}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-emerald-400">const</span>
                <label htmlFor="email" className="font-mono text-sm text-slate-100 font-medium">
                      email
                    </label>
                <span className="font-mono text-xs text-slate-500">=</span>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='"you@example.com"'
                className="!bg-slate-900 !border-2 !border-slate-700 font-mono !text-slate-100 !placeholder:text-slate-500 focus:!border-emerald-400"
                style={{ color: '#e2e8f0', backgroundColor: '#0f172a' }}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-emerald-400">const</span>
                <label htmlFor="message" className="font-mono text-sm text-slate-100 font-medium">
                      message
                    </label>
                <span className="font-mono text-xs text-slate-500">=</span>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='&quot;Let&apos;s build something amazing...&quot;'
                    rows={5}
                className="!bg-slate-900 !border-2 !border-slate-700 font-mono !text-slate-100 !placeholder:text-slate-500 focus:!border-emerald-400 resize-none"
                style={{ color: '#e2e8f0', backgroundColor: '#0f172a' }}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                className="w-full font-mono bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {status === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
                    {status === 'error' && <AlertCircle className="mr-2 h-4 w-4" />}
                    {status === 'idle' && <Send className="mr-2 h-4 w-4" />}
                    {status === 'loading'
                      ? 'sending...'
                      : status === 'success'
                        ? 'message_sent()'
                        : status === 'error'
                          ? 'retry()'
                          : 'submit()'}
                  </Button>
                </motion.div>
              </form>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <p className="font-mono text-sm text-emerald-300">
                      <span className="text-emerald-400">✓</span> Message sent successfully. I&apos;ll get back to you soon!
                    </p>
                  </div>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="font-mono text-sm text-red-300">
                      <span className="text-red-400">✗</span> Error: Failed to send message. Please try again.
                    </p>
                  </div>
                </motion.div>
              )}
        </motion.div>
      </div>
    </main>
  );
}