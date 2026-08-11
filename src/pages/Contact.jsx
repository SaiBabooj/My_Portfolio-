import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { socialData } from '../data/social'

const EMAILJS = {
  serviceId: 'service_4wtcj7h',
  templateId: 'template_1inab3c',
  publicKey: 'fwx2B2etZvmnB6fWe',
}

export default function Contact() {
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const payload = {
      from_name: form.name.value,
      reply_to: form.email.value,
      message: form.msg.value,
    }
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        payload,
        { publicKey: EMAILJS.publicKey }
      )
      setStatus('sent')
      form.reset()
      setTimeout(() => setStatus(null), 6000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus(err.status ? `error:${err.status}` : 'error')
      setTimeout(() => setStatus(null), 8000)
    }
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
          {status && (
            <div className={`form-sent ${status === 'error' ? 'form-error' : ''}`}>
              {status === 'sending' &&
                '> ESTABLISHING SECURE CHANNEL... DO NOT CLOSE THE SITE.'}
              {status === 'sent' &&
                '> TRANSMISSION SENT. I WILL GET BACK TO YOU, OPERATIVE.'}
              {status === 'error' &&
                '> TRANSMISSION FAILED. CHANNEL DISRUPTED — USE AN OPEN CHANNEL ON THE RIGHT.'}
              {status === 'error:400' &&
                '> FAILED [400]: BAD REQUEST — CHECK TEMPLATE VARIABLES ({{from_name}}, {{reply_to}}, {{message}}).'}
              {status === 'error:403' &&
                '> FAILED [403]: DOMAIN BLOCKED — WHITELIST THIS SITE IN EMAILJS SETTINGS.'}
              {status === 'error:421' &&
                '> FAILED [421]: SERVICE NOT READY — CONNECT YOUR MAIL ACCOUNT IN EMAILJS.'}
              {status === 'error:422' &&
                '> FAILED [422]: REQUEST NOT ACCEPTED — CHECK YOUR TEMPLATE AND SERVICE SETUP.'}
              {status === 'error:429' &&
                '> FAILED [429]: RATE LIMIT — TOO MANY REQUESTS, WAIT AND RETRY.'}
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
            <button className="btn" type="submit" disabled={status === 'sending'}>
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
