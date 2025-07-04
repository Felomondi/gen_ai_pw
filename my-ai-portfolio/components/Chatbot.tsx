"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: "Hello! I'm Felix's AI assistant. Ask me about his skills, experience, or projects." }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }), // Send the whole history
      });

      const data = await response.json();
      if (response.ok) {
        const modelMessage: Message = { role: 'model', parts: [{ text: data.reply }] };
        setMessages(prev => [...prev, modelMessage]);
      } else {
        const errorMessage: Message = { role: 'model', parts: [{ text: "Sorry, I couldn't connect to the AI. Please try again later." }] };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (err) { // FIX IS HERE
        const e = err as Error;
        console.error("Chat submission error:", e.message);
        const errorMessage: Message = { role: 'model', parts: [{ text: "An error occurred. Please check the connection." }] };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
    }
  };

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
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl flex flex-col h-[70vh]">
        <header className="flex items-center justify-between p-4 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
            <h2 className="font-bold text-lg text-zinc-100">Felix AI Assistant</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors" aria-label="Close chat">
            <X size={24} />
          </button>
        </header>

        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && <Bot className="w-6 h-6 text-purple-400 flex-shrink-0" />}
              <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-blue-600/50 text-white' : 'bg-purple-900/50 text-zinc-200'}`}>
                <p className="text-sm">{msg.parts[0].text}</p>
              </div>
              {msg.role === 'user' && <User className="w-6 h-6 text-blue-300 flex-shrink-0" />}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                <Bot className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div className="p-3 rounded-lg bg-purple-900/50 text-zinc-200">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-0"></span>
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-zinc-700">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input type="text" placeholder="Ask about a project..." value={input} onChange={e => setInput(e.target.value)} disabled={isLoading} className="flex-grow bg-zinc-800/50 border-zinc-700 text-white" />
            <Button type="submit" size="icon" aria-label="Send message" disabled={isLoading}>
              <Send size={20} />
            </Button>
          </form>
        </footer>
      </div>
    </motion.div>
  );
}

