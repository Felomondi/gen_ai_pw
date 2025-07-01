"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Chatbot from './Chatbot';

export default function ChatbotButton() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (pathname === '/contact') {
    return null;
  }

  // Animation variants for the button itself, including an exit animation
  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8,
    },
  };

  return (
    <>
      {/* AnimatePresence for the floating button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            className="fixed top-1/2 -translate-y-1/2 right-6 z-[60] flex flex-col items-center gap-2"
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" // This tells it to use the exit animation
          >
            <p className="text-sm font-medium text-zinc-200 bg-zinc-900/50 backdrop-blur-sm px-3 py-1 rounded-full border border-zinc-700">
              Chat with Felix AI
            </p>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="sparkle-button relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Open AI Chat"
            >
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              
              <MessageSquare size={32} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AnimatePresence for the Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <Chatbot onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}