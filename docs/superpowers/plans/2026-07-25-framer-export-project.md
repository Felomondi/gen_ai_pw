# Framer Export Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Framer Export to the portfolio project lists with a working live link.

**Architecture:** Extend the existing static project arrays in the human and agent project page components. Preserve the current rendering structure and styles, with one small agent-mode change that renders existing URL values as external anchors.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS

## Global Constraints

- Match the existing project list structure, typography, and spacing.
- Use the title `Framer Export`.
- Use the live URL `https://www.framerextract.com/`.
- Do not add a detail page, homepage feature, dependency, or source-code link.

---

### Task 1: Add the Framer Export project entry

**Files:**
- Modify: `my-ai-portfolio/app/projects/page.tsx`
- Modify: `my-ai-portfolio/components/agent/AgentProjectsPage.tsx`

**Interfaces:**
- Consumes: The existing static project object shapes in each component.
- Produces: A first-position Framer Export entry in both modes and clickable agent-mode external links.

- [ ] **Step 1: Verify the entry is initially absent**

Run:

```bash
! rg -q 'title: "Framer Export"' my-ai-portfolio/app/projects/page.tsx
! rg -q 'title: "Framer Export"' my-ai-portfolio/components/agent/AgentProjectsPage.tsx
```

Expected: Both commands succeed because the title is absent.

- [ ] **Step 2: Add the human-mode entry**

Insert this object first in the `projects` array in `my-ai-portfolio/app/projects/page.tsx`:

```tsx
{
  title: "Framer Export",
  slug: null,
  description: "exports published Framer sites to private GitHub repositories and self-hostable ZIP files.",
  tags: ["next.js", "typescript", "github oauth", "web extraction"],
  githubUrl: null,
  liveUrl: "https://www.framerextract.com/",
  hasDetailPage: false,
},
```

- [ ] **Step 3: Add the agent-mode entry**

Insert this object first in the `projects` array in `my-ai-portfolio/components/agent/AgentProjectsPage.tsx`:

```tsx
{
  title: "Framer Export",
  description:
    "Exports published Framer sites to private GitHub repositories and self-hostable ZIP files.",
  tags: ["next.js", "typescript", "github oauth", "web extraction"],
  github: null,
  live: "https://www.framerextract.com/",
},
```

Change the agent-mode `code` and `live` values from plain `span` elements to external `a` elements with `target="_blank"` and `rel="noopener noreferrer"`. Preserve the existing text sizes and colors.

- [ ] **Step 4: Verify the entries and links**

Run:

```bash
test "$(rg -l 'title: "Framer Export"' my-ai-portfolio/app/projects/page.tsx my-ai-portfolio/components/agent/AgentProjectsPage.tsx | wc -l | tr -d ' ')" = "2"
test "$(rg -o 'https://www\\.framerextract\\.com/' my-ai-portfolio/app/projects/page.tsx my-ai-portfolio/components/agent/AgentProjectsPage.tsx | wc -l | tr -d ' ')" = "2"
rg -q 'target="_blank"' my-ai-portfolio/components/agent/AgentProjectsPage.tsx
rg -q 'rel="noopener noreferrer"' my-ai-portfolio/components/agent/AgentProjectsPage.tsx
```

Expected: All commands succeed.

- [ ] **Step 5: Run project validation**

Run:

```bash
npm run lint
npm run build --prefix my-ai-portfolio
```

Expected: Both commands exit successfully.

- [ ] **Step 6: Commit the implementation**

```bash
git add my-ai-portfolio/app/projects/page.tsx my-ai-portfolio/components/agent/AgentProjectsPage.tsx
git commit -m "Add Framer Export to portfolio projects"
```
