"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="container mx-auto max-w-2xl px-4">
        <motion.div
          className="rounded-xl border border-gray-200 bg-white p-8 md:p-12 shadow-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isClient && (
            <>
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-3 text-center text-gray-900"
              >
                Get In Touch
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-center mb-10"
              >
                Have a question or want to work together? Drop me a message!
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Felix Omondi"
                    className="bg-white"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="bg-white"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Let's build something amazing..."
                    rows={5}
                    className="bg-white"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full" disabled={status === 'loading'}>
                    {status === 'loading' && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {status === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
                    {status === 'error' && <AlertCircle className="mr-2 h-4 w-4" />}
                    {status === 'idle' && <Send className="mr-2 h-4 w-4" />}
                    {status === 'loading'
                      ? 'Sending...'
                      : status === 'success'
                        ? 'Message Sent!'
                        : status === 'error'
                          ? 'Try Again'
                          : 'Send Message'}
                  </Button>
                </motion.div>
              </form>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center mt-4 text-sm"
                >
                  Thank you for your message! I&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-center mt-4 text-sm"
                >
                  Something went wrong. Please try again later.
                </motion.p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}