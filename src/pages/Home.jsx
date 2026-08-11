import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MatrixRain from '../components/MatrixRain'
import VisitorIntel from '../components/VisitorIntel'
import { projectsData } from '../data/projects'

const ROLES = [
  'CYBERSECURITY ENTHUSIAST',
  'DATA ANALYST',
  'MACHINE LEARNING ENTHUSIAST',
  'AI ENGINEER',
  'FULL-STACK DEVELOPER',
  'PROBLEM SOLVER',
]

function useTypewriter(words, typeSpeed = 90, deleteSpeed = 40, pause = 1600) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          )
        },
        deleting ? deleteSpeed : typeSpeed
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause])

  return text
}

export default function Home() {
  const typed = useTypewriter(ROLES)
  const [intelOpen, setIntelOpen] = useState(false)

  return (
    <div className="home-wrap">
      <MatrixRain />
      <button
        className={`yay-btn${intelOpen ? ' hidden' : ''}`}
        onClick={() => setIntelOpen((o) => !o)}
      >
        Hmm...This is you
      </button>
      {intelOpen && <VisitorIntel onClose={() => setIntelOpen(false)} />}
      <div className="home-content">
        <div className="home-status">
          <span className="dot" />
          SYSTEM ONLINE // UNAUTHORIZED ACCESS LOGGED
        </div>

        <h1 className="home-name text-glow">
          <span className="glitch-wrap">
            <span className="glitch glitch-auto" data-text="SAI BABOOJ">
              SAI BABOOJ
            </span>
          </span>
          <span className="caret">_</span>
        </h1>

        <div className="home-title">
          &gt; <span className="type">{typed}</span>
          <span className="blink">█</span>
        </div>

        <div className="home-actions">
          <Link to="/skills">
            <button className="btn">[ Explore Skills ]</button>
          </Link>
          <Link to="/projects">
            <button className="btn">[ View Projects ]</button>
          </Link>
          <Link to="/contact">
            <button className="btn btn-outline">[ Contact Me ]</button>
          </Link>
        </div>

        <div className="home-foot">
          ACCESS THE SYSTEM SHELL WITH{' '}
          <span className="hint">Ctrl + ~</span> OR PRESS{' '}
          <span className="hint">[&gt;_ TERMINAL]</span> ABOVE
        </div>

        <div className="home-contrib">
          <div className="contrib-title">Contribution :</div>
          <div className="contrib-stats">
            <div className="stat">
              <span className="stat-label">[ total projects ]</span>
              <span className="stat-value">{projectsData.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">[ open source ]</span>
              <span className="stat-value">
                {projectsData.filter((p) => p.openSource).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
