import React, { useState, useEffect } from "react"
import MovieList from "./MovieList"
import Features from "./Features"

const Main = () => {

    const [queryPageCount, setQueryPageCount] = useState(0)
    const [nowPlayingPageCount, setNowPlayingPageCount] = useState(0)
    const [previousQuery, setPreviousQuery] = useState('')
    const [currentMovieList, setCurrentMovieList] = useState()
    const [loading, setLoading] = useState(true)
    const [resetValue, setResetValue] = useState(false)
    
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

    const updateQueryUrl = async (query) => {
        const queryURL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${queryPageCount + 1}`
        setQueryPageCount(prev => prev + 1)

        callMovieAPI(queryURL)
            .then(result => {
                if (previousQuery === '') {
                    setCurrentMovieList(result)
                    setPreviousQuery(query)
                    setNowPlayingPageCount(0)
                    setResetValue(true)
                } else {
                    setCurrentMovieList([...currentMovieList, ...result])
                }
            })
    }

    const loadNowPlaying = async () => {
        if (previousQuery) {
            setPreviousQuery('')
            setResetValue(true)
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

    const sortMovies = (sortType) => {
        setResetValue(false)
        if (sortType === "date") {
            const newList = [...currentMovieList].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            setCurrentMovieList(newList)
        } else if (sortType === "alphabetical") {
            const newList = [...currentMovieList].sort((a, b) => b.title.localeCompare(a.title))
            setCurrentMovieList(newList)
        } else if (sortType === "rating") {
            const newList = [...currentMovieList].sort((a, b) => b.vote_average - a.vote_average)
            setCurrentMovieList(newList)
        }
    }

    return (
        <>
            <Features sortList={sortMovies} resetValue={resetValue} onQuery={updateQueryUrl} onNowButton={loadNowPlaying}/>
            {currentMovieList ? <MovieList movieList={currentMovieList}/> : []}
            <button onClick={getNextPage}>Load More</button>
        </>
    )
}

export default Main