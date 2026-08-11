import { projectsData } from '../data/projects'

export default function Projects() {
  return (
    <div className="screen projects-page">
      <h1 className="page-title text-glow glitch" data-text="PROJECTS">
        PROJECTS
      </h1>
      <p className="page-sub">
        <span className="prompt">saibabooj@root:~$</span> ls
        ~/projects --all --classify
      </p>

      {projectsData.length === 0 ? (
        <div className="empty-projects">
          <div className="big text-glow">
            [ NO PROJECTS DEPLOYED ]
          </div>
          <p>
            The registry is empty — patches are being compiled in the
            background.
          </p>
          <p className="hint">
            New projects get injected into src/data/projects.js one by one.
          </p>
        </div>
      ) : (
        <div className="projects-grid">
          {projectsData.map((p, i) => (
            <div className="project-card" key={p.name}>
              <span
                className={`project-status ${p.status === 'live' ? 'live' : 'wip'}`}
              >
                {p.status === 'live' ? '● online' : '▲ in dev'}
              </span>
              {p.openSource && (
                <span className="project-os">&#9660; open source</span>
              )}
              <h3 className="text-glow">{p.name}</h3>
              <span className="project-idx">{String(i + 1).padStart(2, '0')}</span>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                {p.demo && (
                  <a className="link-btn" href={p.demo} target="_blank" rel="noreferrer">
                    [ demo ]
                  </a>
                )}
                {p.github && (
                  <a className="link-btn" href={p.github} target="_blank" rel="noreferrer">
                    [ source ]
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
