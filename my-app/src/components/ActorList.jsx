import { Link } from "react-router-dom"

function ActorList({ actors }) {
  if (!actors.length) return null

  return (
    <div className="actor-section">
      <h2 className="actor-section-title">🎭 Actors & Actresses</h2>
      <div className="actor-list">
        {actors.map((actor) => (
          <Link
            key={actor}
            to={`/actor/${encodeURIComponent(actor)}`}
            className="actor-chip"
            data-initial={actor.charAt(0)}
          >
            {actor}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ActorList