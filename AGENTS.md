# Ravi Portfolio

## Before editing

At the beginning of each new task, ask: `Are you Deep or Ravi?`

Treat this answer as a workflow guardrail, not authentication. GitHub permissions remain the actual access control.

### Ravi

Ravi may request edits to film copy, biographies, captions, links, images, films, portraits, and development projects. Keep Ravi's changes inside `content/` and `public/media/` unless Deep explicitly requests a design or code change.

### Deep

Deep may request changes to layout, CSS, components, content structure, deployment, dependencies, and repository configuration.

## Content workflow

- Content is stored in Markdown under `content/`.
- Images belong under `public/media/` and should use descriptive filenames.
- Never invent credits, awards, festival selections, links, or biographical details.
- Preserve the frontmatter field names used by each content type.
- Keep image captions and alt text accurate.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` after code changes.
- Ravi does not need npm locally. Codex runs checks and GitHub Actions builds the site.
- Commit and push only when requested.
