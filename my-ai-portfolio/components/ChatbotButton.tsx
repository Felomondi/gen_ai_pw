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
                  className="w-14 h-14 rounded-full bg-slate-900/90 backdrop-blur-md text-slate-100 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-slate-700/40"
              aria-label="Open Ask Felix"
            >
              <MessageSquare size={24} />
            </button>
                <p className="text-xs font-medium text-slate-200 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700/40 shadow-sm">
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