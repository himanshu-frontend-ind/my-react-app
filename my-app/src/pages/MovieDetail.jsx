import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

function MovieDetail() {
    const {id} = useParams()
    const [movies, setmovies] = useState([])

   const getMovie = async () => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=b875e73f&i=${id}`)
            const data = await res.json()
            setmovies(data)
            console.log(data)
   }

    useEffect(()=>{
         getMovie() 
    },[id])

    if(!movies) return <p>LOADING</p> 

  return (
    <div className="movie-card-wrapper">
      <div className="movie-card">
        
        {/* Left: Poster Section */}
        <div className="poster-box">
          <img
            src={movies.Poster !== "N/A" ? movies.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
            alt={movies.Title}
            className="poster-img"
          />
          {movies.imdbRating && movies.imdbRating !== "N/A" && (
            <div className="badge-imdb">
              ★ {movies.imdbRating}<span>/10</span>
            </div>
          )}
        </div>

        {/* Right: Content Section */}
        <div className="content-box">
          
          {/* Header Info */}
          <div className="header-info">
            <div className="meta-tags">
              {movies.Rated && movies.Rated !== "N/A" && (
                <span className="rated-tag">{movies.Rated}</span>
              )}
              {movies.Runtime && movies.Runtime !== "N/A" && (
                <span className="dot-info">• {movies.Runtime}</span>
              )}
              {movies.Released && movies.Released !== "N/A" && (
                <span className="dot-info">• {movies.Released}</span>
              )}
            </div>

            <h1 className="title-heading">
              {movies.Title}{" "}
              <span className="year-text">({movies.Year})</span>
            </h1>

            {/* Genre List */}
            <div className="genre-wrapper">
              {movies.Genre?.split(", ").map((genre, index) => (
                <span key={index} className="genre-chip">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Plot */}
          <p className="plot-text">{movies.Plot}</p>

          {/* Cast Details */}
          <div className="cast-grid">
            <div className="cast-row">
              <span className="label">Director</span>
              <span className="value">{movies.Director}</span>
            </div>
            <div className="cast-row">
              <span className="label">Writers</span>
              <span className="value">{movies.Writer}</span>
            </div>
            <div className="cast-row">
              <span className="label">Actors</span>
              <span className="value">{movies.Actors}</span>
            </div>
          </div>

          {/* Footer Ratings */}
          <div className="card-footer">
            {movies.Ratings && movies.Ratings.length > 0 && (
              <div className="ratings-container">
                {movies.Ratings.map((rating, index) => (
                  <div key={index} className="rating-card">
                    <span className="source-name">
                      {rating.Source === "Internet Movie Database"
                        ? "IMDb"
                        : rating.Source}
                    </span>
                    <span className="source-val">{rating.Value}</span>
                  </div>
                ))}
              </div>
            )}

            {movies.BoxOffice && movies.BoxOffice !== "N/A" && (
              <div className="boxoffice-box">
                <span className="source-name">Box Office</span>
                <span className="boxoffice-val">{movies.BoxOffice}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieDetail