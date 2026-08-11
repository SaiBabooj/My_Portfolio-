import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import BootScreen from './components/BootScreen'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Terminal from './components/Terminal'
import { playClick, playNav, unlockAudio } from './utils/sound'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import Contact from './pages/Contact'

function Shell() {
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem('booted') === '1'
  )
  const [loading, setLoading] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const location = useLocation()
  const [prevKey, setPrevKey] = useState(location.key)

  const finishBoot = () => {
    sessionStorage.setItem('booted', '1')
    setBooted(true)
  }

  useEffect(() => {
    if (location.key === prevKey) return
    setPrevKey(location.key)
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [location.key, prevKey])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '~') {
        e.preventDefault()
        setTerminalOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      unlockAudio()
      const link = e.target.closest('a')
      if (link) playNav()
      else if (e.target.closest('button')) playClick()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="crt">
      {!booted && <BootScreen onDone={finishBoot} />}
      {loading && <Loader target={location.pathname} onDone={() => {}} />}
      {terminalOpen && (
        <Terminal onClose={() => setTerminalOpen(false)} />
      )}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="footer">
        saibabooj@root:~# echo &quot;built with <span className="heart">love</span> &amp; caffeine&quot; — © {new Date().getFullYear()} SAIBABOOJ
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
