import { useEffect, useRef } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_()[]{}<>!?@;:~^\\|'.split('')

const BASE_SPEED = 4.6
const REPULSE_R = 130
const REPULSE_POWER = 18
const CURSOR_KICK = 1.8
const MAX_PARTICLES = 1300

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999 }
    let particles = []
    let raf = 0
    let last = 0
    const FPS = 30
    const FRAME_MS = 1000 / FPS

    const spawn = (x, y, initial = false) => ({
      x: x + (Math.random() - 0.5) * 8,
      y: initial ? y : -20 - Math.random() * 100,
      vx: 0,
      vy: 0,
      baseSpeed: BASE_SPEED * (0.6 + Math.random() * 0.9),
      char: randomChar(),
      bright: Math.random() > 0.97,
      rot: 0,
      flash: 0,
    })

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      let spacing = 24
      const cols = Math.ceil(canvas.width / spacing)
      const rows = Math.ceil(canvas.height / spacing)
      if (cols * rows > MAX_PARTICLES) {
        spacing = Math.sqrt((canvas.width * canvas.height) / MAX_PARTICLES)
      }

      particles = []
      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          particles.push(spawn(x, y, true))
        }
      }
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.px = mouse.x
      mouse.py = mouse.y
      mouse.x = x
      mouse.y = y
    }

    const onTouch = (e) => {
      const t = e.touches[0]
      if (!t) return
      const rect = canvas.getBoundingClientRect()
      mouse.px = mouse.x
      mouse.py = mouse.y
      mouse.x = t.clientX - rect.left
      mouse.y = t.clientY - rect.top
    }

    const draw = (ts) => {
      raf = requestAnimationFrame(draw)

      if (document.hidden) return
      if (ts - last < FRAME_MS) return
      last = ts

      const cvx = (mouse.x - mouse.px) * CURSOR_KICK
      const cvy = (mouse.y - mouse.py) * CURSOR_KICK
      mouse.px = mouse.x
      mouse.py = mouse.y

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const rzx = canvas.width * 0.44
      const rzy = canvas.height * 0.44

      ctx.fillStyle = 'rgba(2, 8, 5, 0.16)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '18px monospace'
      ctx.textBaseline = 'middle'

      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)

        if (d < REPULSE_R && d > 0.001) {
          const inv = 1 - d / REPULSE_R
          const f = REPULSE_POWER * inv * inv
          p.vx += (dx / d) * f + cvx * inv * 2
          p.vy += (dy / d) * f + cvy * inv * 2
          p.flash = 1
        }

        p.vx *= 0.88
        p.vy *= 0.9
        p.x += p.vx
        p.y += p.vy + p.baseSpeed
        p.rot += p.vx * 0.02
        p.flash = Math.max(0, p.flash - 0.06)

        if (p.y > canvas.height + 40) {
          p.x = Math.random() * canvas.width
          p.y = -20
          p.vx = 0
          p.vy = 0
          p.rot = 0
          p.flash = 0
          p.bright = Math.random() > 0.97
          p.baseSpeed = BASE_SPEED * (0.6 + Math.random() * 0.9)
          p.char = randomChar()
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        if (Math.abs(p.rot) > 0.005) ctx.rotate(p.rot)
        const nz = ((p.x - cx) / rzx) ** 2 + ((p.y - cy) / rzy) ** 2
        if (nz < 1) ctx.globalAlpha = 0.25 + 0.75 * Math.sqrt(nz)
        ctx.fillStyle = p.flash > 0.05 ? '#eaffea' : p.bright ? '#b8ffcf' : '#00e02e'
        ctx.fillText(p.char, 0, 0)
        ctx.restore()
      }

      if (mouse.x > -1000) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, REPULSE_R, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.12)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-canvas" />
}
