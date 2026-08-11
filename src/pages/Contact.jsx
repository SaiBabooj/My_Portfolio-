import { useState } from 'react'
import { socialData } from '../data/social'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div className="screen">
      <h1 className="page-title text-glow glitch" data-text="CONTACT">
        CONTACT
      </h1>
      <p className="page-sub">
        <span className="prompt">saibabooj@root:~$</span> ./establish_channel
        --secure
      </p>

      <div className="contact-grid">
        <div className="contact-form">
          {sent && (
            <div className="form-sent">
              &gt; TRANSMISSION SENT. I WILL GET BACK TO YOU, OPERATIVE.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">// CALLSIGN</label>
              <input id="name" name="name" type="text" required placeholder="your_name" />
            </div>
            <div className="field">
              <label htmlFor="email">// RETURN CHANNEL (EMAIL)</label>
              <input id="email" name="email" type="email" required placeholder="you@domain.com" />
            </div>
            <div className="field">
              <label htmlFor="msg">// MESSAGE PAYLOAD</label>
              <textarea id="msg" name="msg" required placeholder="type your message here..." />
            </div>
            <button className="btn" type="submit">
              [ TRANSMIT &gt;&gt; ]
            </button>
          </form>
        </div>

        <div className="contact-side">
          <h3 className="text-glow">OPEN CHANNELS</h3>
          <p>
            Prefer direct access? Ping me through any of these established
            uplinks. I usually respond within 24 hours.
          </p>

          <ul className="social-list">
            {socialData.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  <span className="idx">[&gt;]</span>
                  <span>
                    <strong>{s.label}</strong> <span className="dim">— {s.handle}</span>
                  </span>
                  <span className="arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
