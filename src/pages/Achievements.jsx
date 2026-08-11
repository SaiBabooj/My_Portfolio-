import { achievementsData } from '../data/achievements'

export default function Achievements() {
  return (
    <div className="screen">
      <h1 className="page-title text-glow glitch" data-text="ACHIEVEMENTS">
        ACHIEVEMENTS
      </h1>
      <p className="page-sub">
        <span className="prompt">saibabooj@root:~$</span> tail -n 50
        /var/log/achievements.log
      </p>

      {achievementsData.length === 0 ? (
        <div className="empty-projects">
          <div className="big text-glow">[ LOG EMPTY ]</div>
          <p>No confirmed achievements logged yet.</p>
          <p className="hint">
            New entries get added to src/data/achievements.js.
          </p>
        </div>
      ) : (
        <div className="achv-list">
          {achievementsData.map((a) => (
            <div className="achv-item" key={a.title}>
              <div className="achv-date">{a.date}</div>
              <h3 className="text-glow">{a.title}</h3>
              <p>{a.description}</p>
              {a.org && <div className="org">&gt; {a.org}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
