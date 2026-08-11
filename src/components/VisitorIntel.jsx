import { useEffect, useState } from 'react'

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

export default function VisitorIntel({ onClose }) {
  const [phase, setPhase] = useState('scan')
  const [rows, setRows] = useState([])

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

      const rows = [
        ['IP ADDRESS', ip, true],
        ['LOCATION', location, false],
        ['ISP', isp || 'UNKNOWN', false],
        ['DEVICE', getDevice(), false],
        ['OS', parseOS(), false],
        ['BROWSER', parseBrowser(), false],
        ['SCREEN', `${screen.width}x${screen.height}`, false],
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
          rows.map(([k, v, hot], i) => (
            <div
              key={k}
              className="intel-row intel-reveal"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="k">{k}</span>
              <span className={`v${hot ? ' hot' : ''}`}>{v}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
