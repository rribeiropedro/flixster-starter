import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"

const MovieList = () => {

    const [loading, setLoading] = useState(true)
    const [movieList, setMovieList] = useState()

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/account/22066535/favorite/movies?language=en-US&page=1&sort_by=created_at.asc';
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
        <>
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
        </>
    )
}

export default MovieList