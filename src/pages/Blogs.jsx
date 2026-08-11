import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { currentWorks, blogPosts, qaEntries } from '../data/blogs'
import { EMAILJS_CONFIG } from '../utils/emailjsConfig'

export default function Blogs() {
  const [status, setStatus] = useState(null)

  const handleAsk = async (e) => {
    e.preventDefault()
    const form = e.target
    const payload = {
      from_name: form.qname.value || 'anonymous',
      reply_to: form.qemail.value || 'no-reply',
      question: form.question.value,
    }
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.questionTemplateId,
        payload,
        { publicKey: EMAILJS_CONFIG.publicKey }
      )
      setStatus('sent')
      form.reset()
      setTimeout(() => setStatus(null), 6000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus(null), 6000)
    }
  }

  return (
    <div className="screen">
      <h1 className="page-title text-glow glitch" data-text="BLOGS">
        BLOGS
      </h1>
      <p className="page-sub">
        <span className="prompt">saibabooj@root:~$</span> cat /var/log/thoughts
        --live
      </p>

      <section className="blog-now">
        <h3 className="section-head text-glow">// CURRENTLY WORKING ON</h3>
        <div className="now-list">
          {currentWorks.map((w) => (
            <div className="now-item" key={w.title}>
              <span className="now-status">
                {w.status === 'building' ? '⚙ BUILDING' : '☕ MAINTAINING'}
              </span>
              <div>
                <div className="now-title">{w.title}</div>
                <div className="now-detail">{w.detail}</div>
              </div>
              <span className="now-eta dim">{w.eta}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="blog-posts">
        <h3 className="section-head text-glow">// WRITE-UPS & LOGS</h3>
        <div className="post-list">
          {blogPosts.map((p) => (
            <Link to={`/blogs/${p.id}`} className="post-card" key={p.id}>
              <div className="post-meta">
                <span className="post-date">[{p.date}]</span>
                <span className="post-tags">
                  {p.tags.map((t) => `#${t}`).join(' ')}
                </span>
              </div>
              <h4 className="post-title">{p.title}</h4>
              <p className="post-excerpt">{p.excerpt}</p>
              <span className="post-read">&gt; READ LOG</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="blog-qa">
        <h3 className="section-head text-glow">// QUESTIONS &amp; ANSWERS</h3>
        <p className="blog-qa-note dim">
          Ask me anything about my work, tools or ideas. Every question gets an
          answer — posted publicly right here.
        </p>

        <div className="qa-list">
          {qaEntries.length === 0 && (
            <div className="dim">NO QUESTIONS LOGGED YET. BE THE FIRST.</div>
          )}
          {qaEntries.map((qa, i) => (
            <div className="qa-item" key={i}>
              <div className="qa-q">
                <span className="qa-num">[{String(i + 1).padStart(2, '0')}]</span>
                <span className="qa-qtext">{qa.q}</span>
              </div>
              <div className="qa-byline dim">
                &gt; asked by {qa.from}
              </div>
              <div className="qa-a">
                <span className="qa-ahead">ANSWER:</span>
                <p>{qa.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="qa-form-wrap">
          <div className="qa-form-head">&gt; ask your own question</div>
          {status === 'sent' && (
            <div className="form-sent">
              &gt; QUESTION RECEIVED. THE ANSWER WILL BE POSTED HERE SOON.
            </div>
          )}
          {status === 'error' && (
            <div className="form-sent form-error">
              &gt; TRANSMISSION FAILED. USE THE OPEN CHANNELS ON THE CONTACT
              PAGE.
            </div>
          )}
          <form onSubmit={handleAsk}>
            <div className="qa-fields">
              <div className="field">
                <label htmlFor="qname">YOUR NAME (OPTIONAL)</label>
                <input id="qname" name="qname" type="text" placeholder="Anonymous" />
              </div>
              <div className="field">
                <label htmlFor="qemail">YOUR EMAIL (OPTIONAL)</label>
                <input id="qemail" name="qemail" type="email" placeholder="you@domain.com" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="question">YOUR QUESTION</label>
              <textarea
                id="question"
                name="question"
                required
                placeholder="type your question here..."
              />
            </div>
            <button className="btn" type="submit" disabled={status === 'sending'}>
              [ SEND QUESTION &gt;&gt; ]
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
