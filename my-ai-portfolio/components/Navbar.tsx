"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { UserCircle, Briefcase, LayoutGrid, Mail, Terminal } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "./about", href: "/", icon: <UserCircle size={18} /> },
    { label: "./experience", href: "/experience", icon: <Briefcase size={18} /> },
    { label: "./projects", href: "/projects", icon: <LayoutGrid size={18} /> },
    { label: "./contact", href: "/contact", icon: <Mail size={18} /> },
  ];

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 rounded-lg border-2 border-slate-700 bg-slate-900/90 px-4 py-2 shadow-sm">
        {/* Logo / prompt */}
        <div className="hidden md:flex items-center gap-2 border-r border-slate-700 pr-3">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs text-slate-200">
            felix@portfolio<span className="text-slate-500">:~</span>
          </span>
        </div>

        {/* Nav items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 rounded-md px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm transition-colors
                ${
                  isActive
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span className="hidden xs:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
