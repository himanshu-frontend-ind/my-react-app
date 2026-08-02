import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

function MovieDetail() {
    const {id} = useParams()
    const [movies, setmovies] = useState([])

   const getMovie = async () => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=b875e73f&i=${id}`)
            const data = await res.json()
            setmovies(data)
            // console.log(data)
   }

    useEffect(()=>{
         getMovie() 
    },[id])

    if(!movies) return <p>LOADING</p> 

  return (
    <div className="movie-detail">
        <h2>{movies.Title}</h2>
		<img alt={movies.Title} src={movies.Poster} />
		<p><strong>Genre:</strong> {movies.Genre}</p>
		<p><strong>Released:</strong> {movies.Released}</p>
		<p><strong>Plot:</strong> {movies.Plot}</p>
	</div>
  )
}

export default MovieDetail