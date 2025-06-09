import React, { useEffect } from "react"
import "../styles/movie-card.css"

const MovieCard = (props) => {

    const posterUrl = `https://image.tmdb.org/t/p/w500${props.moviePoster}`;

    useEffect(() => {
    }, [])

    return (
        <div className="card-container">
            <img src={posterUrl} />
            <h1>{props.movieTitle}</h1>
            <h3>{props.movieRating}</h3>
        </div>
    )
}

export default MovieCard