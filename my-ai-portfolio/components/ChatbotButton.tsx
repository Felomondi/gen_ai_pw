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
            className="fixed bottom-6 right-6 z-[60] flex flex-col items-center gap-2"
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-14 h-14 rounded-full bg-gray-900/90 backdrop-blur-md text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-white/20"
              aria-label="Open Ask Felix"
            >
              <MessageSquare size={24} />
            </button>
            <p className="text-xs font-medium text-gray-700 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/30 shadow-sm">
              Ask Felix
            </p>
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