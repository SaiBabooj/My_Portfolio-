import { Fragment as ReactFragment } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playKey } from '../utils/sound'
import { skillsData } from '../data/skills'
import { projectsData } from '../data/projects'
import { achievementsData } from '../data/achievements'
import { blogPosts, qaEntries } from '../data/blogs'
import { socialData } from '../data/social'

const ASCII = `
  ____    _    ___   ____    _    ____   ___   ___      _ 
 / ___|  / \\  |_ _| | __ )  / \\  | __ ) / _ \\ / _ \\    | |
 \\___ \\ / _ \\  | |  |  _ \\ / _ \\ |  _ \\| | | | | | |_  | |
  ___) / ___ \\ | |  | |_) / ___ \\| |_) | |_| | |_| | |_| |
 |____/_/   \\_\\___| |____/_/   \\_\\____/ \\___/ \\___/ \\___/ 
`

const HELP = [
  ['help', 'show this list of commands'],
  ['whoami', 'who the hell is saibabooj'],
  ['skills', 'list skill modules'],
  ['projects', 'list deployed projects'],
  ['achievements', 'list confirmed achievements'],
  ['blogs', 'read my write-ups and Q&A log'],
  ['contact', 'show contact intel'],
  ['social', 'open my profiles'],
  ['clear', 'wipe terminal history'],
  ['sudo', 'try it. you know you want to'],
  ['hack', 'initiate pentest sequence'],
  ['exit', 'close terminal'],
]

const PROMPT = 'saibabooj@root:~$'

function BANNER() {
  return (
    <>
      <div className="art">{ASCII}</div>
      <div className="dim">Interactive shell v1.0 — type 'help' to begin.</div>
    </>
  )
}

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState([{ type: 'art', node: BANNER() }])
  const [input, setInput] = useState('')
  const [hackProgress, setHackProgress] = useState(null)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const pushText = (text, type = 'out') =>
    setLines((prev) => [...prev, { type, node: text }])

  const go = (path) => {
    onClose()
    setTimeout(() => navigate(path), 150)
  }

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines, hackProgress])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!hackProgress) return
    const timer = setInterval(() => {
      setHackProgress((p) => {
        const next = p + Math.floor(Math.random() * 14) + 6
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            pushText(
              'ERROR: CONNECTION REFUSED. You are already the root, you dummy.',
              'err'
            )
            setHackProgress(null)
          }, 300)
          return 100
        }
        return next
      })
    }, 160)
    return () => clearInterval(timer)
  }, [hackProgress])

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setLines((prev) => [
      ...prev,
      { type: 'cmdline', node: PROMPT + ' ' + raw },
    ])

    const [name, arg] = cmd.split(/\s+/)

    switch (name) {
      case 'help':
        pushText(
          <div className="cmd-table">
            {HELP.map(([c, d]) => (
              <ReactFragment key={c}>
                <span className="c">{c}</span>
                <span className="dim">{d}</span>
              </ReactFragment>
            ))}
          </div>
        )
        break

      case 'whoami':
        pushText(
          <>
            saibabooj — Computer Science student specializing in Cybersecurity.
            {'\n'}SOC orchestration, detection rule engineering & AI-driven
            security tooling.
            {'\n'}Mission: bridge Data Science and Cybersecurity to build
            proactive defense systems.
          </>
        )
        break

      case 'skills':
      case 'ls':
      case 'cat':
        pushText(
          <>
            <span className="cmd">[skill modules detected]</span>
            {'\n'}
            {skillsData
              .flatMap((cat) => cat.items.map((s) => `- ${s.name} [${s.level}]`))
              .join('\n')}
            {'\n'}
            <span className="dim">
              run `open skills` to see the full skill tree.
            </span>
          </>
        )
        break

      case 'projects': {
        if (projectsData.length === 0) {
          pushText('NO PROJECTS DETECTED. DROPPING PATCHES SOON...', 'dim')
        } else {
          pushText(
            <>
              <span className="cmd">[project registry]</span>
              {'\n'}
              {projectsData
                .map((p, i) => `[${i + 1}] ${p.name} — ${p.status}`)
                .join('\n')}
              {'\n'}
              <span className="dim">
                run `open projects` to see the full dossier.
              </span>
            </>
          )
        }
        break
      }

      case 'achievements':
        if (achievementsData.length === 0) {
          pushText('NO ACHIEVEMENTS LOGGED YET.', 'dim')
        } else {
          pushText(
            <>
              <span className="cmd">[achievement log]</span>
              {'\n'}
              {achievementsData.map((a) => `- ${a.title}`).join('\n')}
              {'\n'}
              <span className="dim">
                run `open achievements` for the full briefing.
              </span>
            </>
          )
        }
        break

      case 'contact':
      case 'email':
        pushText(
          <>
            <span className="cmd">[contact intel]</span>
            {'\n'}
            {socialData
              .map((s) => `- ${s.label}: ${s.url}`)
              .join('\n')}
          </>
        )
        break

      case 'blogs':
        pushText(
          <>
            <span className="cmd">[thought log]</span>
            {'\n'}
            {blogPosts.map((p) => `- ${p.title} (${p.date})`).join('\n')}
            {'\n'}
            <span className="dim">
              {qaEntries.length} answered question{qaEntries.length === 1 ? '' : 's'} on
              file. run `open blogs` to read everything.
            </span>
          </>
        )
        break

      case 'social': {
        socialData.forEach((s) => window.open(s.url, '_blank'))
        pushText('OPENING ALL CHANNELS...', 'dim')
        break
      }

      case 'open':
        if (!arg) {
          pushText(
            'usage: open [skills|projects|achievements|blogs|contact]',
            'err'
          )
        } else {
          const routes = {
            skills: '/skills',
            projects: '/projects',
            achievements: '/achievements',
            blogs: '/blogs',
            contact: '/contact',
            home: '/',
          }
          if (routes[arg]) {
            pushText(`NAVIGATING TO /${arg}...`, 'dim')
            setTimeout(() => go(routes[arg]), 400)
          } else {
            pushText(`open: unknown target "${arg}"`, 'err')
          }
        }
        break

      case 'sudo':
        pushText(
          <>Permission denied. The root is already you, fool. Nice try though.</>,
          'err'
        )
        break

      case 'hack':
      case 'nmap':
      case 'crack':
        setHackProgress(0)
        break

      case 'clear':
        setLines([{ type: 'art', node: BANNER() }])
        break

      case 'exit':
      case 'quit':
      case 'close':
        onClose()
        break

      case 'help-':
      case '?':
      case 'ls-l':
        pushText(`command not found: ${name}`, 'err')
        break

      default:
        pushText(
          <>
            command not found: {name}
            {'\n'}
            <span className="dim">type `help` to see available commands.</span>
          </>
        )
        break
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'Escape') {
      onClose()
    } else if (e.key.length === 1) {
      playKey()
    }
  }

  return (
    <div className="terminal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="terminal">
        <div className="terminal-head">
          <div className="terminal-dots">
            <span className="dot-r" />
            <span className="dot-y" />
            <span className="dot-g" />
          </div>
          <span>saibabooj@root: ~/portfolio — SHELL</span>
          <button className="terminal-close" onClick={onClose}>
            [X]
          </button>
        </div>

        <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((line, i) => {
            if (line.type === 'cmdline') {
              return (
                <div key={i} className="terminal-line">
                  <span className="prompt">{PROMPT}</span>{' '}
                  <span className="cmd">{line.node}</span>
                </div>
              )
            }
            if (line.type === 'err') {
              return (
                <div key={i} className="terminal-line err">
                  {line.node}
                </div>
              )
            }
            if (line.type === 'dim') {
              return (
                <div key={i} className="terminal-line dim">
                  {line.node}
                </div>
              )
            }
            return (
              <div key={i} className="terminal-line out">
                {line.node}
              </div>
            )
          })}

          {hackProgress !== null && (
            <div className="terminal-line">
              <div className="loader-bar-wrap" style={{ width: '70%' }}>
                <div className="loader-bar" style={{ width: `${hackProgress}%` }} />
              </div>
              <span className="dim">
                {' '}
                INTRUSION IN PROGRESS... {hackProgress}%
              </span>
            </div>
          )}

          <div className="terminal-input-line">
            <span className="prompt">{PROMPT}</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
