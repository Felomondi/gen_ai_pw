"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMode } from "@/components/ModeContext";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { mode, toggleMode } = useMode();
  const isAgent = mode === "agent";

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-8 px-6 py-2.5 bg-white/70 backdrop-blur-xl border rounded-full shadow-lg shadow-black/[0.04] transition-all duration-300"
        style={{
          borderColor: isAgent ? "rgba(34,197,94,0.4)" : "var(--border)",
          boxShadow: isAgent
            ? "0 0 12px rgba(34,197,94,0.12), 0 4px 6px rgba(0,0,0,0.04)"
            : "0 4px 6px rgba(0,0,0,0.04)",
        }}
      >
        <Link
          href="/"
          className="text-sm font-medium text-[var(--text)] hover:opacity-60 transition-opacity"
        >
          felix omondi
        </Link>

        <div className="flex items-center gap-5">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive ? "text-[var(--text)]" : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={toggleMode}
          className="flex items-center rounded-full border border-[var(--border)] overflow-hidden text-[11px] leading-none transition-all"
        >
          <span
            className="px-2.5 py-1.5 transition-all duration-200"
            style={{
              background: !isAgent ? "#1a1a1a" : "transparent",
              color: !isAgent ? "#fff" : "var(--text-muted)",
            }}
          >
            human
          </span>
          <span
            className="px-2.5 py-1.5 transition-all duration-200"
            style={{
              background: isAgent ? "#1a1a1a" : "transparent",
              color: isAgent ? "#fff" : "var(--text-muted)",
            }}
          >
            agent
          </span>
        </button>
      </div>
    </nav>
  );
}
