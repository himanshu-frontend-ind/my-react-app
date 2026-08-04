import { useParams, Link } from "react-router-dom"
import MovieList from "../components/MovieList"

function loadActorIndex() {
  try {
    return JSON.parse(localStorage.getItem("actorIndex")) || {}
  } catch {
    return {}
  }
}

function ActorMovies() {
  const { name } = useParams()
  const actorName = decodeURIComponent(name)
  const actorIndex = loadActorIndex()
  const movies = actorIndex[actorName] || []

  return (
    <div className="actor-section">
      <Link
        to="/actors"
        className="btn"
        style={{ marginBottom: "1.5rem", textDecoration: "none", padding: "8px 16px" }}
      >
        ← Actors
      </Link>
      <h2 className="actor-section-title">🎬 Movies of {actorName}</h2>
      <MovieList movies={movies} />
    </div>
  )
}

export default ActorMovies