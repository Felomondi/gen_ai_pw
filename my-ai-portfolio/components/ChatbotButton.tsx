"use client";

// We add useState and useEffect to the imports
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Chatbot from './Chatbot';

export default function ChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  // Don't show on contact page
  if (pathname === '/contact') {
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
                  className="relative w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center ring-2 ring-emerald-400/40 shadow-[0_18px_45px_-18px_rgba(16,185,129,0.35)] hover:shadow-[0_22px_55px_-18px_rgba(16,185,129,0.45)] hover:scale-105 transition-all border border-emerald-300/40 chat-glow"
                  aria-label="Open Ask Felix"
                >
                  <span className="absolute -inset-2 rounded-full border border-emerald-400/25 blur-[2px]" />
                  <MessageSquare size={24} />
                </button>
                <p className="text-xs font-semibold text-emerald-100 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-400/30 shadow-sm">
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