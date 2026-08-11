import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { path: '/', label: 'home', idx: '00' },
  { path: '/skills', label: 'skills', idx: '01' },
  { path: '/projects', label: 'projects', idx: '02' },
  { path: '/achievements', label: 'achievements', idx: '03' },
  { path: '/contact', label: 'contact', idx: '04' },
]

export default function Navbar({ onOpenTerminal }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
        saibabooj<span className="cursor">_</span>
      </NavLink>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <li key={l.path}>
            <NavLink
              to={l.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              <span className="idx">[{l.idx}]</span>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button className="nav-terminal-btn" onClick={onOpenTerminal}>
          &gt;_ terminal
        </button>
        <button
          className="hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label="menu"
        >
          {open ? '[X]' : '[=]'}
        </button>
      </div>
    </nav>
  )
}
