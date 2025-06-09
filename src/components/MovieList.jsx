import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import "../styles/movie-list.css"

const MovieList = () => {

    const [loading, setLoading] = useState(true)
    const [movieList, setMovieList] = useState()

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
        const apiKey = import.meta.env.VITE_APP_API_KEY
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        }
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setMovieList(json.results)
                setLoading(false)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="movie-list-container">
            {loading ? (
                <>
                    <h1>jij</h1>
                </>
            ) : (
                <>
                    {movieList.map((item) => (
                        <MovieCard 
                            key={item.id}
                            id={item.id}
                            movieTitle={item.title} 
                            moviePoster={item.poster_path}
                            movieRating={item.vote_average}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default MovieList