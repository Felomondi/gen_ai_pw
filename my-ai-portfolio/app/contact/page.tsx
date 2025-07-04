"use client";

import React, { useState, useEffect } from "react";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, Loader, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => { setIsClient(true) }, []);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen p-4 md:p-12 flex items-center justify-center">
      <GlassCard className="w-full max-w-2xl">
        <div className="p-8 md:p-16">
          {isClient && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                Get In Touch
              </motion.h1>
              <motion.p variants={itemVariants} className="text-zinc-300 text-center mb-10">
                Have a question or want to work together? Drop me a message!
              </motion.p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-200 mb-2">Your Name</label>
                  <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Felix Omondi" className="bg-zinc-800/50 border-zinc-700 text-white" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-200 mb-2">Your Email</label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="bg-zinc-800/50 border-zinc-700 text-white" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-200 mb-2">Message</label>
                  {/* THE FIX IS HERE */}
                  <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Let&apos;s build something amazing..." rows={5} className="bg-zinc-800/50 border-zinc-700 text-white" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full" disabled={status === 'loading'}>
                    {status === 'loading' && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {status === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
                    {status === 'error' && <AlertCircle className="mr-2 h-4 w-4" />}
                    {status === 'idle' && <Send className="mr-2 h-4 w-4" />}
                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Try Again' : 'Send Message'}
                  </Button>
                </motion.div>
              </form>
              
              {status === 'success' && (
                  <p className="text-green-400 text-center mt-4">Thank you for your message! I&apos;ll get back to you soon.</p>
              )}
              {status === 'error' && (
                  <p className="text-red-400 text-center mt-4">Something went wrong. Please try again later.</p>
              )}
            </motion.div>
          )}
        </div>
      </GlassCard>
    </main>
  );
}