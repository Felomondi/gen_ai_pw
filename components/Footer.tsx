import Link from "next/link";

const pages = [
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/contact", label: "contact" },
];

const social = [
  { href: "https://github.com/Felomondi", label: "github" },
  { href: "https://www.linkedin.com/in/felomondi/", label: "linkedin" },
  { href: "mailto:fomondi@vassar.edu", label: "email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-32">
      <div className="mx-auto max-w-[720px] px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">pages</p>
            <div className="space-y-2.5">
              {pages.map((p) => (
                <Link key={p.href} href={p.href} className="block text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">social</p>
            <div className="space-y-2.5">
              {social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="block text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-10 pt-6">
          <p className="text-sm text-[var(--text-muted)]">
            felix omondi — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
