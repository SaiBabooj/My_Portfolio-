import { useEffect, useState } from 'react'
import { playBootDone } from '../utils/sound'

const LINES = [
  { text: 'BIOS v4.2.0 — SAIBABOOJ BIOS', cls: 'dim' },
  { text: 'Copyright (C) 2087, Matrix Systems Inc.', cls: 'dim' },
  { text: 'CPU: NEURAL-CORE i9 @ 5.0GHz', cls: 'ok' },
  { text: 'MEM: 64GB ECC HYPER-RAM ........ [ OK ]', cls: 'ok' },
  { text: 'GPU: RAYTRACE-9000 QUANTUM ............ [ OK ]', cls: 'ok' },
  { text: 'STORAGE: 2TB NVMe SSD ........... [ OK ]', cls: 'ok' },
  { text: '', cls: '' },
  { text: 'Boot Device: /dev/hacker-zero', cls: 'dim' },
  { text: 'Mounting /etc/passwd ..................... [ OK ]', cls: 'ok' },
  { text: 'Loading kernel modules ................... [ OK ]', cls: 'ok' },
  { text: 'Decrypting neural uplink ................ [ OK ]', cls: 'ok' },
  { text: 'Bypassing firewall ....................... [ OK ]', cls: 'ok' },
  { text: 'Establishing encrypted channel ........... [ OK ]', cls: 'ok' },
  { text: 'Spoofing MAC address: DE:AD:BE:EF:13:37 ....... [ OK ]', cls: 'ok' },
  { text: 'Injecting shellcode ..................... [ WARN ]', cls: 'warn' },
  { text: 'Loading profile: saibabooj .............. [ OK ]', cls: 'ok' },
  { text: '', cls: '' },
  { text: 'ACCESS GRANTED. WELCOME, OPERATIVE.', cls: 'ok' },
]

const TOTAL_MS = 4200

export default function BootScreen({ onDone }) {
  const [visible, setVisible] = useState(0)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (skipped) {
      playBootDone()
      onDone()
      return
    }
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / TOTAL_MS, 1)
      setVisible(Math.floor(progress * LINES.length))
      if (progress >= 1) {
        clearInterval(timer)
        playBootDone()
        setTimeout(onDone, 350)
      }
    }, 40)
    return () => clearInterval(timer)
  }, [skipped, onDone])

  return (
    <div className="boot-screen">
      <div className="boot-log">
        {LINES.slice(0, visible).map((line, i) => (
          <div key={i} className={line.cls}>
            {line.text || '\u00A0'}
          </div>
        ))}
        <span className="ok blink">█</span>
      </div>
      <button className="boot-skip" onClick={() => setSkipped(true)}>
        [ SKIP &gt;&gt; ]
      </button>
    </div>
  )
}
