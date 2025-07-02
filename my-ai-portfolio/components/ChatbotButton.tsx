"use client";

// We add useState and useEffect to the imports
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Chatbot from './Chatbot';

export default function ChatbotButton() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // --- FIX FOR HYDRATION ERROR ---
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // This code runs only in the browser, after the page has loaded
    setIsClient(true);
  }, []);
  // --- END OF FIX ---

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

  // If we are on the contact page, or not on the client yet, render nothing.
  if (pathname === '/contact' || !isClient) {
    return null;
  }

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
            exit="exit"
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