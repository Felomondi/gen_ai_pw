"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Define the props the component will accept
interface ChatbotProps {
  onClose: () => void; // A function to close the chat
}

export default function Chatbot({ onClose }: ChatbotProps) {
  // Animation for the chat window
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
        
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
            <h2 className="font-bold text-lg text-zinc-100">Felix AI Assistant</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors" aria-label="Close chat">
            <X size={24} />
          </button>
        </header>

        {/* Message Area */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {/* Placeholder for messages */}
          <div className="p-3 bg-purple-900/50 rounded-lg max-w-xs self-start">
            <p className="text-sm text-zinc-200">Hello! I'm Felix's AI assistant. Feel free to ask me any questions about his skills, experience, or projects.</p>
          </div>
        </div>

        {/* Input Form */}
        <footer className="p-4 border-t border-zinc-700">
          <form className="flex items-center gap-2">
            <Input 
              type="text" 
              placeholder="Ask about a project..." 
              className="flex-grow bg-zinc-800/50 border-zinc-700 text-white" 
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send size={20} />
            </Button>
          </form>
        </footer>
      </div>
    </motion.div>
  );
}