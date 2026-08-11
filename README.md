# Sai Babooj — Portfolio Website

Personal portfolio website built with React and Vite. It combines a
terminal-style interface with animated page transitions and data-driven
sections for skills, projects, achievements, and contact.

## Tech Stack

- React 19 + Vite
- React Router (hash-based routing)
- Custom CSS animations (no UI framework)

## Getting Started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build (dist/)
npm run lint     # lint with oxlint
```

## Site Structure

| Route            | Description                                  |
| ---------------- | -------------------------------------------- |
| `/`              | Home — animated background, typewriter roles |
| `/skills`        | Skill categories with animated proficiency bars |
| `/projects`      | Project cards, pulled from `src/data/projects.js` |
| `/achievements`  | Achievement timeline                        |
| `/contact`       | Contact form + social links                 |

## Terminal Interface

The site includes a built-in terminal shell:

- Press `Ctrl + ~` (or `Cmd + ~` on macOS) anywhere to open/close it
- Type `help` inside the terminal to list available commands
- Commands can browse the site (e.g. `open projects`) and show content from
  the same data files used by the pages

## Content Management

All site content is data-driven. Edit these files to update the site:

- `src/data/projects.js` — project entries
- `src/data/skills.js` — skill categories and levels
- `src/data/achievements.js` — achievements
- `src/data/social.js` — profile links

### Adding a project

```js
{
  name: 'Project Name',
  description: 'Short description of the project.',
  tags: ['React', 'Python', 'API'],
  status: 'live', // 'live' | 'wip'
  openSource: true, // optional — shows an open source badge
  demo: 'https://example.com', // optional
  github: 'https://github.com/SaiBabooj/repo', // optional — omit for private projects
},
```

## Deployment

Connect the repository to Vercel (Vite preset). Each push to `main` is
deployed automatically — no manual build step required.
