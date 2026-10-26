import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full border-b border-[var(--border)] bg-transparent px-0 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors outline-none focus:border-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
