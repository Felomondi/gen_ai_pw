# Framer Export Portfolio Entry

## Goal

Add Framer Export to the existing portfolio project list with a working link to the live product.

## Design

- Place Framer Export first in the human and agent project lists.
- Match the existing typography, spacing, and list presentation without adding new UI.
- Use the live URL `https://www.framerextract.com/`.
- Describe the product as exporting published Framer sites to private GitHub repositories and self-hostable ZIP files.
- Use the tags `next.js`, `typescript`, `github oauth`, and `web extraction`.
- Do not add a source-code link because the repository is private.
- Do not add a project detail page or homepage feature.
- Render agent-mode project URLs as real external links while preserving their current visual styling.

## Verification

- Run the existing lint command.
- Run a production build.
- Verify the projects page renders Framer Export first in human and agent modes.
- Verify the live link points to `https://www.framerextract.com/` and opens safely in a new tab.
