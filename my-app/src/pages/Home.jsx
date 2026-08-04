import { useState, useEffect, useRef } from "react"
import MovieList from "../components/MovieList"
import SkeletonList from "../components/SkeletonList"

const API_KEY = "b875e73f"

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

function Home() {
  const [movies, setmovies] = useState([])
  const [loading, setloading] = useState(true)
  const [actorIndex, setActorIndex] = useState(loadActorIndex)
  const inputRef = useRef()

  const fetchMovieDetails = async (imdbID) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
    return res.json()
  }

  const indexActors = (detailsList) => {
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

  const fetchMovie = async (query) => {
    setloading(true)
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    const data = await res.json()
    const results = data.Search || []
    setmovies(results)

    const detailsList = await Promise.all(results.map((m) => fetchMovieDetails(m.imdbID)))
    indexActors(detailsList)

    setloading(false)
  }

  useEffect(() => {
    fetchMovie("Avengers")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const query = inputRef.current.value.trim()
    if (query) {
      fetchMovie(query)
      inputRef.current.value = ""
    }
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        <input ref={inputRef} className="searchInput" placeholder="Search for a movie..." />
        <button className="btn" type="submit">🔎 Search</button>
      </form>

      {loading ? <SkeletonList count={10} /> : <MovieList movies={movies} />}
    </div>
  )
}

export default Home