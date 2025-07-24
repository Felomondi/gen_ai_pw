import React from "react";
import { twMerge } from "tailwind-merge";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={twMerge(
        // I've reduced the background opacity from 50% to 10%
        "bg-zinc-900/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
