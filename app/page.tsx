import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-20 md:py-28">
      {/* Name */}
      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl tracking-tight">
        felix omondi
      </h1>

      <p className="mt-4 text-[var(--text-secondary)]">
        software developer · cs + math · vassar college
      </p>

      {/* Bio */}
      <div className="mt-12 space-y-6 text-[15px] leading-[1.75] text-[var(--text-secondary)]">
        <p>
          i like building things across the full stack, places where
          systems design, clean interfaces, and AI tooling all come together.
          Always learning something new, always building something new.
        </p>

        <p>
          recent graduate of{" "}
          <a href="https://www.vassar.edu/" target="_blank" rel="noopener noreferrer" className="inline-link">
            vassar college
          </a>
          {" "}with a degree in computer science and mathematics (statistics).
          building thoughtful software with a growing focus on AI/ML and
          interfaces that feel right.
        </p>

        <p>
          founding engineer at{" "}
          <span className="text-[var(--text)]">topmarksprep</span>.
          previously software engineer intern at{" "}
          <span className="text-[var(--text)]">morgan stanley</span> and{" "}
          <span className="text-[var(--text)]">amazon</span>.
        </p>

        <p>
          reach out to me{" "} on{" "}
          <a href="https://www.linkedin.com/in/felomondi/" target="_blank" rel="noopener noreferrer" className="inline-link">
            linkedin
          </a>
          , or use the contact form.
        </p>
      </div>

      {/* Current */}
      <div className="mt-20 space-y-3">
        <div className="flex items-center gap-2 text-[15px] text-[var(--text-secondary)]">
          <span className="h-2 w-2 rounded-full bg-[var(--text)]" />
          founding engineer @ topmarksprep
        </div>
      </div>

      {/* Links */}
      <div className="mt-20 flex gap-6 text-sm">
        <Link href="/projects" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors underline underline-offset-3 decoration-[var(--border)]">
          projects
        </Link>
        <Link href="/experience" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors underline underline-offset-3 decoration-[var(--border)]">
          experience
        </Link>
        <a href="https://github.com/Felomondi" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors underline underline-offset-3 decoration-[var(--border)]">
          github
        </a>
      </div>
    </div>
  );
}
