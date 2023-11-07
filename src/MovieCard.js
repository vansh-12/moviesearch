import React from 'react'

const MovieCard = ({ movie,details }) => {
    return (
        <div className="movie" key={movie.imdbID}>
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} />
                <p></p>
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
                <p>{movie.details.Plot}</p>
                
            </div>
        </div>
    )
}

export default MovieCard