import { useEffect, useRef, useState } from 'react'

const STATUS_STEPS = [
  'INITIALIZING UPLINK...',
  'BYPASSING FIREWALL...',
  'DECRYPTING PAYLOAD...',
  'ESTABLISHING SECURE CHANNEL...',
  'ACCESS GRANTED.',
]

export default function Loader({ target, onDone }) {
  const [progress, setProgress] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 9) + 4
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, 90)

    const stepTimer = setInterval(() => {
      setStepIdx((s) => Math.min(s + 1, STATUS_STEPS.length - 1))
    }, 420)

    return () => {
      clearInterval(timer)
      clearInterval(stepTimer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100 && !doneRef.current) {
      doneRef.current = true
      setTimeout(() => {
        setExiting(true)
        setTimeout(onDone, 480)
      }, 350)
    }
  }, [progress, onDone])

  return (
    <div className={`loader${exiting ? ' loader-exit' : ''}`}>
      <div className="loader-percent">{progress}%</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-status">{STATUS_STEPS[stepIdx]}</div>
      <div className="loader-typing">
        {'>'} BREACHING /{target}
        <span className="blink">_</span>
      </div>
    </div>
  )
}
