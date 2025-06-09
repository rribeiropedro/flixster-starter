import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import "../styles/movie-list.css"

const MovieList = () => {

    const [firstMovieList, setFirstMovieList] = useState()
    const [secondMovieList, setSecondMovieList] = useState()
    const [loading, setLoading] = useState(true)
    const [loadSecondPage, setLoadSecondPage] = useState(false)

    const urlPage1 = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
    const urlPage2 = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2'

    const callMovieAPI = async (url) => {
        const apiKey = import.meta.env.VITE_APP_API_KEY
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        }
        return fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setLoading(false)
                console.log(json.results)
                return json.results
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
                return null;
            })
    }

    useEffect(() => {
        callMovieAPI(urlPage1)
            .then(results => {
                setFirstMovieList(results)
            })

        callMovieAPI(urlPage2)
            .then(results => {
                setSecondMovieList(results)
            })
    }, [])

    return (
        <>
            <section className="movie-list-container">
                <div className="movie-grid-container">
                    {loading ? (
                        <>
                            <h1>jij</h1>
                        </>
                    ) : (
                        <>
                            {firstMovieList.map((item) => (
                                <MovieCard 
                                    key={item.id}
                                    id={item.id}
                                    movieTitle={item.title} 
                                    moviePoster={item.poster_path}
                                    movieRating={item.vote_average}
                                />
                            ))}
                            {secondMovieList && loadSecondPage ? (
                                <>
                                    {secondMovieList.map((item) => (
                                        <MovieCard 
                                            key={item.id}
                                            id={item.id}
                                            movieTitle={item.title} 
                                            moviePoster={item.poster_path}
                                            movieRating={item.vote_average}
                                        />
                                    ))}
                                </>
                            ) : []}
                        </>
                    )}
                </div>
                {!loadSecondPage ? <button onClick={() => setLoadSecondPage(true)}>Load More</button> : []}
            </section>
        </>
    )
}

export default MovieList