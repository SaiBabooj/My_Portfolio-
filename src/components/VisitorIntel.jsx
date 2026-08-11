import { useEffect, useRef, useState } from 'react'

const UA = navigator.userAgent

function parseBrowser() {
  if (UA.includes('Edg/')) return 'Edge ' + (UA.match(/Edg\/([\d.]+)/) || [])[1]
  if (UA.includes('Chrome/')) return 'Chrome ' + (UA.match(/Chrome\/([\d.]+)/) || [])[1]
  if (UA.includes('Firefox/')) return 'Firefox ' + (UA.match(/Firefox\/([\d.]+)/) || [])[1]
  if (UA.includes('Safari/')) return 'Safari ' + (UA.match(/Version\/([\d.]+)/) || [])[1]
  return 'Unknown'
}

function parseOS() {
  if (/iPhone|iPad|iPod/.test(UA)) return 'iOS'
  if (/Android/.test(UA)) return 'Android'
  if (/Mac/.test(UA)) return 'macOS'
  if (/Windows/.test(UA)) return 'Windows'
  if (/Linux/.test(UA)) return 'Linux'
  return 'Unknown'
}

function getDevice() {
  if (/Mobi|Android|iPhone/.test(UA)) return 'Mobile'
  if (/iPad|Tablet/.test(UA)) return 'Tablet'
  return 'Desktop'
}

function getGPU() {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return 'UNKNOWN'
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    if (!ext) return 'UNKNOWN'
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return renderer || 'UNKNOWN'
  } catch {
    return 'UNKNOWN'
  }
}

const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

export default function VisitorIntel({ onClose }) {
  const [phase, setPhase] = useState('scan')
  const [rows, setRows] = useState([])
  const [gpu, setGpu] = useState('UNKNOWN')
  const [battery, setBattery] = useState(null)
  const [now, setNow] = useState(new Date())
  const startRef = useRef(Date.now())

  const [visits] = useState(() => {
    try {
      const v = parseInt(localStorage.getItem('vi_visits') || '0', 10) + 1
      localStorage.setItem('vi_visits', String(v))
      return v
    } catch {
      return 1
    }
  })

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!navigator.getBattery) return
    let bat = null
    navigator
      .getBattery()
      .then((b) => {
        bat = b
        setBattery({ level: b.level, charging: b.charging })
        b.addEventListener('levelchange', () =>
          setBattery({ level: b.level, charging: b.charging })
        )
        b.addEventListener('chargingchange', () =>
          setBattery({ level: b.level, charging: b.charging })
        )
      })
      .catch(() => {})
    return () => {
      bat?.removeEventListener?.('levelchange', () => {})
    }
  }, [])

  useEffect(() => {
    setGpu(getGPU())
  }, [])

  useEffect(() => {
    let cancelled = false

    const timeout = setTimeout(() => {
      if (!cancelled) setPhase('ready')
    }, 1800)

    ;(async () => {
      let ip = 'UNKNOWN'
      let city = null
      let country = null
      let isp = null
      try {
        const ctrl = new AbortController()
        const t = setTimeout(() => ctrl.abort(), 5000)
        const res = await fetch('https://ipwho.is/', { signal: ctrl.signal })
        clearTimeout(t)
        if (res.ok) {
          const data = await res.json()
          ip = data.ip || ip
          city = data.city
          country = data.country_code
          isp = data.connection?.isp
        }
      } catch {
        try {
          const ctrl = new AbortController()
          const t = setTimeout(() => ctrl.abort(), 5000)
          const res = await fetch('https://api.ipify.org?format=json', {
            signal: ctrl.signal,
          })
          clearTimeout(t)
          if (res.ok) {
            const data = await res.json()
            ip = data.ip || ip
          }
        } catch {
          /* offline / blocked — show local metrics only */
        }
      }

      if (cancelled) return

      const conn = navigator.connection || navigator.mozConnection || null
      const location =
        city && country ? `${city}, ${country}` : country || 'PROTECTED'
      const tz =
        Intl.DateTimeFormat().resolvedOptions().timeZone || 'UNKNOWN'
      const orientation =
        screen.orientation?.type ||
        (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait')

      const rows = [
        ['IP ADDRESS', ip, true],
        ['LOCATION', location, false],
        ['ISP', isp || 'UNKNOWN', false],
        ['DEVICE', getDevice(), false],
        ['OS', parseOS(), false],
        ['BROWSER', parseBrowser(), false],
        ['SCREEN', `${screen.width}x${screen.height}`, false],
        ['DPI', `${Math.round(window.devicePixelRatio * 100)}%`, false],
        ['COLOR DEPTH', `${screen.colorDepth}-bit`, false],
        ['ORIENTATION', orientation, false],
        ['TOUCH POINTS', navigator.maxTouchPoints || 0, false],
        ['WINDOW', `${window.innerWidth}x${window.innerHeight}`, false],
        [
          'NETWORK',
          conn?.effectiveType
            ? `${conn.effectiveType.toUpperCase()} · ${conn.downlink} Mb/s`
            : 'UNKNOWN',
          false,
        ],
        ['RTT', conn?.rtt ? `${conn.rtt} ms` : 'UNKNOWN', false],
        ['CORES', navigator.hardwareConcurrency || 'UNKNOWN', false],
        ['RAM', navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'UNKNOWN', false],
        ['LANG', navigator.language || 'UNKNOWN', false],
        ['TIMEZONE', tz, false],
      ]

      setRows(rows)
    })()

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  const elapsed = Math.floor((Date.now() - startRef.current) / 1000)
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  return (
    <div className="visitor-intel">
      <div className="visitor-head">
        <span>VISITOR INTELLIGENCE</span>
        <div className="visitor-head-right">
          <span className="live">● LIVE</span>
          <button className="intel-close" onClick={onClose}>
            [X]
          </button>
        </div>
      </div>
      <div className="visitor-body">
        {phase === 'scan' ? (
          <div className="intel-row">
            <span className="intel-scan blink">SCANNING VISITOR...</span>
          </div>
        ) : (
          <>
            <div className="intel-row intel-reveal">
              <span className="k">CLOCK</span>
              <span className="v hot">{timeFmt.format(now)}</span>
            </div>
            <div className="intel-row intel-reveal">
              <span className="k">ON PAGE</span>
              <span className="v">{mm}:{ss}</span>
            </div>
            <div className="intel-row intel-reveal">
              <span className="k">VISITS</span>
              <span className="v">{visits}</span>
            </div>
            <div className="intel-row intel-reveal">
              <span className="k">BATTERY</span>
              <span className="v">
                {battery
                  ? `${Math.round(battery.level * 100)}% ${
                      battery.charging ? 'charging' : 'discharging'
                    }`
                  : 'UNKNOWN'}
              </span>
            </div>
            <div className="intel-row intel-reveal">
              <span className="k">GPU</span>
              <span className="v">{gpu}</span>
            </div>
            {rows.map(([k, v, hot], i) => (
              <div
                key={k}
                className="intel-row intel-reveal"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="k">{k}</span>
                <span className={`v${hot ? ' hot' : ''}`}>{v}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
