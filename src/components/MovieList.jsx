import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import "../styles/movie-list.css"

const MovieList = ({ movieList }) => {

    return (
        <>
            <section className="movie-list-container">
                <div className="movie-grid-container">
                    {movieList.map((item) => (
                        <MovieCard 
                            key={item.id}
                            id={item.id}
                            movieTitle={item.title} 
                            moviePoster={item.poster_path}
                            movieRating={item.vote_average}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default MovieList