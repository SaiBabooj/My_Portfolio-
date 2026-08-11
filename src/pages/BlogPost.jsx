import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogs'

export default function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="screen">
        <h1 className="page-title text-glow">404 — LOG NOT FOUND</h1>
        <p className="page-sub">
          <span className="prompt">saibabooj@root:~$</span> cat /dev/null
        </p>
        <Link to="/blogs" className="btn">
          [ &lt;&lt; BACK TO BLOGS ]
        </Link>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="post-article">
        <Link to="/blogs" className="post-back">
          &lt;&lt; back to logs
        </Link>
        <div className="post-meta">
          <span className="post-date">[{post.date}]</span>
          <span className="post-tags">{post.tags.map((t) => `#${t}`).join(' ')}</span>
        </div>
        <h1 className="article-title text-glow">{post.title}</h1>
        {post.sections.map((s, i) => (
          <section key={i}>
            <h3 className="article-head">
              <span className="idx">[{String(i + 1).padStart(2, '0')}]</span>
              {s.heading}
            </h3>
            <p className="article-text">{s.text}</p>
          </section>
        ))}
        <div className="article-footer dim">
          /end of log — saibabooj@root:~$ _
        </div>
      </div>
    </div>
  )
}
