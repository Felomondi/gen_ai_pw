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
        // Base styles for the glass effect
        "bg-zinc-900/30", // Semi-transparent background (dark for contrast)
        "backdrop-blur-lg", // The core blur effect
        "border border-zinc-500/30", // A subtle border to catch the light
        "rounded-2xl", // Nicely rounded corners
        className // Allows for additional custom classes
      )}
    >
      {children}
    </div>
  );
}