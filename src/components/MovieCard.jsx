import React, { useEffect } from "react"
import "../styles/movie-card.css"

const MovieCard = (props) => {

    const posterUrl = `https://image.tmdb.org/t/p/w500${props.moviePoster}`;

    useEffect(() => {
    }, [])

    return (
        <div className="card-container">
            <img src={posterUrl} />
            <div className="card-info">
                <h1>{props.movieTitle}</h1>
                <h4>Rating: {Number(props.movieRating.toFixed(1))}</h4>
            </div>
        </div>
    )
}

export default MovieCard