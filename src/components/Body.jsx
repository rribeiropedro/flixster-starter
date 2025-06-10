import React, { useState, useEffect } from "react"
import MovieList from "./MovieList"
import Features from "./Features"

const Main = () => {

    const [queryPageCount, setQueryPageCount] = useState(0)
    const [nowPlayingPageCount, setNowPlayingPageCount] = useState(0)
    const [previousQuery, setPreviousQuery] = useState('')
    const [currentMovieList, setCurrentMovieList] = useState()
    const [loading, setLoading] = useState(true)
    
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
                return json.results
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
                return null;
            })
    }

    const updateQueryUrl = async (query) => {
        const queryURL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${queryPageCount + 1}`
        setQueryPageCount(prev => prev + 1)

        callMovieAPI(queryURL)
            .then(result => {
                if (previousQuery === '') {
                    setCurrentMovieList(result)
                    setPreviousQuery(query)
                    setNowPlayingPageCount(0)
                } else {
                    setCurrentMovieList([...currentMovieList, ...result])
                }
            })
    }

    const loadNowPlaying = async () => {
        if (previousQuery) {
            setPreviousQuery('')
        }
        
        const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${nowPlayingPageCount + 1}`
        setNowPlayingPageCount(prev => prev + 1)

        callMovieAPI(nowPlayingURL)
            .then(results => {
                if (nowPlayingPageCount > 0) {
                    setCurrentMovieList([...currentMovieList, ...results])
                } else {
                    setCurrentMovieList(results)
                    setQueryPageCount(0)
                }
            })
    }

    const getNextPage = async () => {
        if (previousQuery != '') {
            await updateQueryUrl(previousQuery)
        }
        else {
            await loadNowPlaying()
        }   
    }

    useEffect(() => {
        const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${nowPlayingPageCount + 1}`
        callMovieAPI(nowPlayingURL)
            .then(results => {
                setCurrentMovieList(results)
            })
    }, [])

    return (
        <>
            <Features onQuery={updateQueryUrl} onNowButton={loadNowPlaying}/>
            {currentMovieList ? <MovieList movieList={currentMovieList}/> : []}
            <button onClick={getNextPage}>Load More</button>
        </>
    )
}

export default Main