# System Trace // Bayanda Mlomo

An interactive, terminal-themed personal portfolio. Built as a single-page React app styled like a system console, with an execution-history timeline, a live telemetry log feed, and a working command-line shell.

**Live site:** https://b-a-y-a-n-d-a.github.io/professional-profile/

## Features

- **Landing** — hero profile summary, quick metrics, and a snippet of recent activity.
- **System Trace** — an experience timeline where each role expands into an ASCII-style architecture schematic of the systems built there.
- **Logs** — a filterable/searchable feed of "telemetry" entries describing projects and milestones, with the ability to inject custom log entries and load archived history.
- **Terminal** — a working command shell (`help`, `about`, `contact`, `skills`, `logs`, `trace`, `resume`, `clear`) for navigating the site and pulling up contact info.
- **Execute_Resume** — a modal that simulates a build/compile pipeline before revealing a printable resume view.

## Tech Stack

- [React 19](https://react.dev/) + TypeScript
- [Vite 6](https://vite.dev/) for dev/build tooling
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [lucide-react](https://lucide.dev/) for icons
- [motion](https://motion.dev/) for animation

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```
3. Open the printed local URL in your browser.

Other useful scripts:

```
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # type-check with tsc
```

## Deployment

This site is deployed to GitHub Pages from the `gh-pages` branch. To publish a new build:

```
npm run deploy
```

This runs `vite build` and pushes the contents of `dist/` to `gh-pages` via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package. Make sure the repository's **Settings → Pages** source is set to deploy from the `gh-pages` branch (root).

## Project Structure

```
src/
  App.tsx                     # Main app: nav, all four views, terminal command logic
  components/ResumeModal.tsx  # Interactive resume compile/print modal
  data.ts                     # Experience timeline and log feed content
  types.ts                    # Shared TypeScript types
```

## Contact

- Email: bayandamlomo1@gmail.com
- LinkedIn: [linkedin.com/in/bayanda-mlomo-74a781312](https://www.linkedin.com/in/bayanda-mlomo-74a781312/)
- GitHub: [github.com/B-a-y-a-n-d-a](https://github.com/B-a-y-a-n-d-a)
