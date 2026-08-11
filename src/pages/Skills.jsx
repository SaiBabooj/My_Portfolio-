import { useEffect, useRef, useState } from 'react'
import { skillsData } from '../data/skills'

function SkillRow({ name, level }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-name">
        <span>{name}</span>
        <span className="pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={inView ? { width: `${level}%` } : undefined}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <div className="screen">
      <h1 className="page-title text-glow glitch" data-text="SKILLS">
        SKILLS
      </h1>
      <p className="page-sub">
        <span className="prompt">saibabooj@root:~$</span> cat
        /root/skills.dat --decrypted
      </p>

      <div className="skills-grid">
        {skillsData.map((cat) => (
          <div className="skill-card" key={cat.category}>
            <div className="skill-cat">{cat.category}</div>
            {cat.items.map((s) => (
              <SkillRow key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
