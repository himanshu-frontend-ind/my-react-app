function ActorList({ actors, onActorClick }) {
  if (!actors.length) return null

  return (
    <div className="actor-section">
      <h2 className="actor-section-title">🎭 Actors & Actresses</h2>
      <div className="actor-list">
        {actors.map((actor) => (
          <button
            key={actor}
            type="button"
            className="actor-chip"
            data-initial={actor.charAt(0)}
            onClick={() => onActorClick(actor)}
          >
            {actor}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ActorList