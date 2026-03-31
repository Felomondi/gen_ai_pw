import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full border-b border-[var(--border)] bg-transparent px-0 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors outline-none focus:border-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
