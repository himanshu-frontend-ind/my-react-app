import { useState, useEffect } from "react"
import ActorList from "./ActorList"
import SkeletonList from "./SkeletonList"

const API_KEY = "b875e73f"
const SEED_QUERIES = ["Avengers", "Batman", "Harry Potter", "Mission Impossible", "Fast"]

function loadActorIndex() {
  try {
    return JSON.parse(localStorage.getItem("actorIndex")) || {}
  } catch {
    return {}
  }
}

function saveActorIndex(index) {
  localStorage.setItem("actorIndex", JSON.stringify(index))
}

function Actors() {
  const [actorIndex, setActorIndex] = useState(loadActorIndex)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchMovieDetails = async (imdbID) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
    return res.json()
  }

  const addToIndex = (detailsList) => {
    setActorIndex((prev) => {
      const updated = { ...prev }
      detailsList.forEach((detail) => {
        if (!detail || !detail.Actors || detail.Actors === "N/A") return
        detail.Actors.split(",").map((a) => a.trim()).forEach((actor) => {
          const existing = updated[actor] || []
          const alreadyThere = existing.some((m) => m.imdbID === detail.imdbID)
          updated[actor] = alreadyThere ? existing : [...existing, detail]
        })
      })
      saveActorIndex(updated)
      return updated
    })
  }

  const seedActors = async () => {
    setLoading(true)
    for (const query of SEED_QUERIES) {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      const data = await res.json()
      const results = data.Search || []
      const detailsList = await Promise.all(results.map((m) => fetchMovieDetails(m.imdbID)))
      addToIndex(detailsList)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (Object.keys(actorIndex).length === 0) {
      seedActors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  const sortedActors = Object.keys(actorIndex)
    .filter((actor) => actor.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  return (
    <div className="home">
      <form className="actor-search-form" onSubmit={handleSearchSubmit}>
        <input
          className="searchInput"
          placeholder="Search actor or actress..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn" type="submit">🔎 Search</button>
      </form>

      {loading && <SkeletonList count={10} />}

      <ActorList actors={sortedActors} />
    </div>
  )
}

export default Actors