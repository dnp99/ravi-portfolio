# Ravi Rekhi Portfolio

An editorial film portfolio for Ravi Rekhi, built with Next.js and Markdown content.

## Content updates

Ravi does not need npm installed locally. Ask Codex to update the files in `content/` and add or replace images in `public/media/`. The root `AGENTS.md` explains the editing guardrails and asks whether the user is Deep or Ravi before each new task.

Content files:

- `content/site.md` controls the profile, about copy, contact links, and section introductions.
- `content/films/*.md` controls film entries. Set `heroImage` to a path such as `/media/cupid-still.jpg` when a real still is available.
- `content/portraits/*.md` controls portrait captions and image paths.
- `content/development/*.md` controls projects in development.
- `public/media/` stores portfolio images.

## Development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`. Content changes are picked up by the Next.js development server.

## Deployment

GitHub Actions builds and deploys the static site to GitHub Pages after changes land on `main`. Ravi only needs to work with Codex and GitHub; the build runs remotely.

The site uses the custom domain `ravirekhi.com`. In GitHub, open **Settings > Pages**, select **GitHub Actions** as the source, and add `ravirekhi.com` as the custom domain. Configure the domain's DNS with the GitHub Pages records shown there. The committed `public/CNAME` file keeps the custom-domain setting in the deployed artifact.
