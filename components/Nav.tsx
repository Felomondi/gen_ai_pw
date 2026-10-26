"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-8 px-6 py-2.5 bg-white/70 backdrop-blur-xl border rounded-full shadow-lg shadow-black/[0.04] transition-all duration-300"
        style={{ borderColor: "var(--border)" }}
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
      </div>
    </nav>
  );
}
