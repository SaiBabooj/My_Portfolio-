# saibabooj — Hacker Portfolio

Hacker-green themed portfolio with boot sequence, matrix rain, an in-page
terminal shell, and animated page transitions.

## Run

```bash
npm install
npm run dev      # dev server
npm run build    # production build (dist/)
npm run lint     # oxlint
```

## Terminal shortcuts

- `Ctrl + ~` (or `Cmd + ~` on macOS) anywhere — open/close the terminal shell
- Type `help` inside the terminal for the command list

## Add projects (one at a time)

Edit `src/data/projects.js` — uncomment the template and fill it in:

```js
{
  name: 'Project Name',
  description: 'Short description of the project.',
  tags: ['React', 'Python', 'API'],
  status: 'live', // 'live' | 'wip'
  demo: 'https://example.com',
  github: 'https://github.com/SaiBabooj',
},
```

Same pattern for achievements in `src/data/achievements.js` and skills in
`src/data/skills.js`. Links live in `src/data/social.js`.

## Pages

`/` home (matrix bg + typewriter) · `/skills` · `/projects` · `/achievements` · `/contact`
