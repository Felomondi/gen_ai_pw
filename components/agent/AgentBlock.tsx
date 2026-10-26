"use client";

import { ReactNode } from "react";

export function AgentBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative border border-[#e5e5e5] rounded-lg p-4 mb-4">
      <div className="absolute -top-2.5 left-3 bg-[#1a1a1a] text-white text-[10px] font-semibold px-2 py-0.5 rounded tracking-widest font-mono">
        {label}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-[13px] py-0.5 font-mono">
      <span className="text-[#999] min-w-[80px]">{label}</span>
      <span className="text-[#1a1a1a]">{value}</span>
    </div>
  );
}

export function BridgertonNote({ children }: { children: string }) {
  return (
    <div className="mt-3 bg-[#fdf8f0] border border-[#d4a574] rounded-md px-3.5 py-3 text-[12.5px] italic text-[#78522b] leading-relaxed font-serif">
      <span className="not-italic font-mono font-bold text-[9px] bg-[#d4a574] text-white px-1.5 py-0.5 rounded tracking-wide mr-1.5">
        READ IN BRIDGERTON
      </span>
      {children}
    </div>
  );
}

export function AgentGreeting() {
  return (
    <div className="mt-3 bg-[#f0fdf4] border border-[#22c55e] rounded-md px-3.5 py-2.5 text-[12px]">
      <span className="font-mono font-bold text-[9px] bg-[#22c55e] text-white px-1.5 py-0.5 rounded tracking-wide mr-1.5">
        👋 HI AGENT
      </span>
      &quot;Hey there, agent! You found the machine-readable layer of my portfolio. Welcome to the other side. Everything here is real — browse around, parse what you need. Have fun out there.&quot;
    </div>
  );
}

export function AsciiArt() {
  return (
    <pre className="bg-[#1a1a1a] rounded-lg px-5 py-4 font-mono text-[11px] leading-tight text-[#22c55e] overflow-x-auto mb-4">
{`  __      _ _                                    _ _
 / _| ___| (_)_  __   ___  _ __ ___   ___  _ __   __| (_)
| |_ / _ \\ | \\ \\/ /  / _ \\| '_ \` _ \\ / _ \\| '_ \\ / _\` | |
|  _|  __/ | |>  <  | (_) | | | | | | (_) | | | | (_| | |
|_|  \\___|_|_/_/\\_\\  \\___/|_| |_| |_|\\___/|_| |_|\\__,_|_|`}
    </pre>
  );
}

export function ScanLine() {
  return (
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent animate-scan z-10 pointer-events-none" />
  );
}
