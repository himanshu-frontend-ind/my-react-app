import { useState,useEffect,useRef } from "react"
import MovieList from "../components/MovieList"

function Home() {
     const [movies, setmovies] = useState([])
     const [loading, setloading] = useState(false)
     const inputRef = useRef()

     const fetchMovie = async(query) =>{
        setloading(true)
        const res = await fetch(`https://www.omdbapi.com/?apikey=b875e73f&s=${query}`)
        const data = await res.json()
        setmovies(data.Search || [])
        // console.log(data.Search)
        setloading(false)
     }

     useEffect(()=>{
        fetchMovie("Avengers")
     },[])

     const handleSearch = (e)=>{
        e.preventDefault()
        const query = inputRef.current.value.trim()
        if(query) {
           
            fetchMovie(query)
           inputRef.current.value = ""
      }
         
     }
  return (
    <div className="home">
		<form onSubmit={handleSearch}>
			<input ref={inputRef} className="searchInput" placeholder="Search for a movie..." />
			<button type="submit">Search 🔎</button>
		</form>

        {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
		
	</div>
  )
}

export default Home