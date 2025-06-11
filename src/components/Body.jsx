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
    
    /**
     * This functions calls the TMDB API for the desired request.
     * It takes in the desired url as an argument and outputs the 
     * results from the json.
     * 
     * @param {*} url - The desired url for the API call.
     * @returns {Object} The results attribute of the json response.
     */
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

    /**
     * This function takes in a query from the search bar in Features.jsx
     * and appends it to the url for the API call. Additionally, page count
     * is properly updated for both Now Playing and Query.
     * 
     * @param {*} query - Query from the search bar that is appendeded
     * to the url.
     */
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

    /**
     * This function creates a new url for the Now Playing API call
     * and takes into account the current page state.
     */
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
                console.log(results)
                setCurrentMovieList(results)
            })
    }, [])

    /**
     * This function takes a sort type and and creates a deep copy
     * of the currentMovieList state, sorts it based of the sort type,
     * and stores it in the state.
     * 
     * @param {*} sortType - The sort type passed from Features.jsx 
     * select and options tags.
     */
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
        <div style={{backgroundColor: '#ececec'}}>
            <Features sortList={sortMovies} resetValue={resetValue} onQuery={updateQueryUrl} onNowButton={loadNowPlaying}/>
            {currentMovieList ? <MovieList movieList={currentMovieList}/> : []}
            <button 
                style={{
                    padding: '8px 15px',
                    marginRight: '40px',
                    color: 'black',
                    backgroundColor: '#f2f2f2',
                    borderRadius: '5px',
                    marginBottom: '30px'
                }}
                onClick={getNextPage}
            >
                Load More
            </button>
        </div>
    )
}

export default Main