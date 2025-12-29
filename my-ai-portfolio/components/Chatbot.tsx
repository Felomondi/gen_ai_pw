"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      parts: [
        {
          text: "Hello! I'm Felix's AI assistant. Ask me about his skills, experience, or projects.",
        },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", parts: [{ text: trimmed }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const payload = { messages: [...messages, userMessage] }; // send entire history (server filters user turns safely)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        const modelMessage: Message = {
          role: "model",
          parts: [{ text: String(data.reply || "").trim() || "…" }],
        };
        setMessages((prev) => [...prev, modelMessage]);
      } else {
        const errMsg =
          data?.error || "Sorry, I couldn't connect to the AI. Please try again.";
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: errMsg }] },
        ]);
      }
    } catch (err) {
      console.error("Chat submission error:", (err as Error).message);
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "An error occurred. Please check the connection." }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const chatWindowVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 50 },
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 w-[calc(100vw-48px)] max-w-md"
      variants={chatWindowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg flex flex-col h-[70vh]">
        <header className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <h2 className="font-semibold text-lg text-gray-900">Ask Felix</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50/50 backdrop-blur-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "model" && (
                <Bot className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
              )}
              <div
                className={`p-3 rounded-lg max-w-xs backdrop-blur-sm ${
                  msg.role === "user"
                    ? "bg-gray-900/90 text-white"
                    : "bg-white/80 text-gray-900 border border-white/30"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.parts[0].text}</p>
              </div>
              {msg.role === "user" && (
                <User className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <Bot className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
              <div className="p-3 rounded-lg bg-white/80 text-gray-900 border border-white/30 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-white/20 bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Ask about a project..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-grow bg-white/90 backdrop-blur-sm"
            />
            <Button type="submit" size="icon" aria-label="Send message" disabled={isLoading}>
              <Send size={18} />
            </Button>
          </form>
        </footer>
      </div>
    </motion.div>
  );
}