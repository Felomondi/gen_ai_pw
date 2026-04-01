"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMode } from "@/components/ModeContext";
import AgentContactPage from "@/components/agent/AgentContactPage";

export default function ContactPage() {
  const { mode } = useMode();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (mode === "agent") return <AgentContactPage />;

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

  return (
    <div className="mx-auto max-w-[720px] px-6 py-20 md:py-28">
      <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight">
        say hello
      </h1>
      <p className="mt-3 text-[var(--text-secondary)] text-[15px]">
        have a question or just want to chat? drop me a message.
      </p>

      <div className="mt-14 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm text-[var(--text)] mb-1.5">name</label>
            <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="your name" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-[var(--text)] mb-1.5">email</label>
            <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-[var(--text)] mb-1.5">message</label>
            <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="what's on your mind?" rows={5} />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="text-sm font-medium text-[var(--text)] underline underline-offset-3 decoration-[var(--border)] hover:decoration-[var(--text)] transition-all disabled:opacity-50"
          >
            {status === "loading" ? "sending..." : status === "success" ? "sent!" : status === "error" ? "try again" : "send message →"}
          </button>

          {status === "success" && (
            <p className="text-sm text-[var(--text-secondary)]">
              thanks! i&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">
              something went wrong. try again or reach out on{" "}
              <a href="https://www.linkedin.com/in/felomondi/" target="_blank" rel="noopener noreferrer" className="inline-link">linkedin</a>.
            </p>
          )}
        </form>
      </div>

      <div className="mt-16 text-[15px] text-[var(--text-secondary)]">
        <p>
          or find me on{" "}
          <a href="https://github.com/Felomondi" target="_blank" rel="noopener noreferrer" className="inline-link">github</a>,{" "}
          <a href="https://www.linkedin.com/in/felomondi/" target="_blank" rel="noopener noreferrer" className="inline-link">linkedin</a>.{" "}
        </p>
      </div>
    </div>
  );
}
