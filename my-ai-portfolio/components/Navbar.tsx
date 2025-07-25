"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { UserCircle, Briefcase, LayoutGrid, Mail } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "About", href: "/", icon: <UserCircle size={20} /> }, // Slightly larger icons
    { label: "Experience", href: "/experience", icon: <Briefcase size={20} /> },
    { label: "Projects", href: "/projects", icon: <LayoutGrid size={20} /> },
    { label: "Contact", href: "/contact", icon: <Mail size={20} /> },
  ];

  return (
    <motion.nav
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 sm:gap-4 px-3 py-2 sm:px-4 rounded-full bg-zinc-900/50 backdrop-blur-lg shadow-lg border border-zinc-700">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-300 hover:bg-zinc-800/50"
                }
              `}
            >
              {item.icon}
              {/* This span is hidden on small screens and shown on larger screens */}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
