import React, { useEffect, useState } from "react"

const MovieList = () => {

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
            .then(json => setMovieList(json))
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            
        </>
    )
}

export default MovieList