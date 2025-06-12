import React, { useState, useEffect } from "react"
import MovieList from "./MovieList"
import Features from "./Features"

const Main = () => {
    const [pageCount, setPageCount] = useState(1)
    const [previousQuery, setPreviousQuery] = useState('')
    const [currentMovieList, setCurrentMovieList] = useState()
    const [loading, setLoading] = useState(true)
    const [resetValue, setResetValue] = useState(false)
    const [likedList, setLikedList] = useState([])
    const [watchedList, setWatchedList] = useState([])
    const [recentSort, setRecentSort] = useState('')

    /**
     * Initial call to the TMDB api, the first page of the
     * Now PLaying movies are displayed.
     */
    useEffect(() => {
        const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageCount}`
        callMovieAPI(nowPlayingURL)
            .then(results => {
                setCurrentMovieList(results)
            })
    }, [])

    useEffect(() => {
        pageCount > 1 && (previousQuery !== '' ? updateQueryUrl(previousQuery, pageCount) : loadNowPlaying(pageCount))
    }, [pageCount])

    /**
     * This function takes in the list of movies and removes any
     * repeating movies. The api at times stores duplicate movies
     * in different pages so this function filters the duplicates out.
     * 
     * @param {*} list - The list of movies that will have
     * any duplicated filtered out
     * @returns True
     */
    const uniqueById = (list) => {
        const seen = new Set()
        return list.filter(item => {
            if (seen.has(item.id)) return false
            seen.add(item.id);
            return true
        })
    }
    
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
    const updateQueryUrl = async (query, page) => {
        const queryURL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`

        callMovieAPI(queryURL)
            .then(result => {
                if (page === 1) {
                    setCurrentMovieList(result)
                    setPreviousQuery(query)
                    setResetValue(true)
                    setPageCount(1)
                } else {
                    setCurrentMovieList(prev => uniqueById([...prev, ...result]))
                }
            })
    }

    /**
     * This function creates a new url for the Now Playing API call
     * and takes into account the current page state.
     */
    const loadNowPlaying = async (page) => {
        if (page === 1) {
            setPreviousQuery('')
            setResetValue(true)
            setPageCount(1)
        }
        
        const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`

        callMovieAPI(nowPlayingURL)
            .then(results => {
                page > 1 ? setCurrentMovieList(prev => uniqueById([...prev, ...results])) : setCurrentMovieList(results)
            })
    }

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
        setRecentSort(sortType)
        if (sortType === "date") {
            const newList = [...currentMovieList].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            setCurrentMovieList(newList)
        } else if (sortType === "alphabetical") {
            const newList = [...currentMovieList].sort((a, b) => a.title.localeCompare(b.title))
            setCurrentMovieList(newList)
        } else if (sortType === "rating") {
            const newList = [...currentMovieList].sort((a, b) => b.vote_average - a.vote_average)
            setCurrentMovieList(newList)
        }
    }

    const clickedClear = () => {
        setCurrentMovieList()
        loadNowPlaying(1)
    }

    const addLiked = (id, title, poster) => {
        setLikedList(likedList => [...likedList, {
            id: id,
            title: title,
            poster: `https://image.tmdb.org/t/p/w500${poster}`
        }])
    }

    const removeLiked = (id) => {
        setLikedList(likedList =>
            likedList.filter(curr => curr.id !== id)
        )
    }

    const addWatched = (id, title, poster) => {
        setWatchedList(watchedList => [...watchedList, {
            id: id,
            title: title,
            poster: `https://image.tmdb.org/t/p/w500${poster}`
        }])
    }

    const removeWatched = (id) => {
        setWatchedList(watchedList =>
            watchedList.filter(curr => curr.id !== id)
        )
    }

    return (
        <div style={{backgroundColor: '#ececec'}}>
            <Features 
                sortList={sortMovies}
                resetValue={resetValue}
                onQuery={updateQueryUrl}
                clickedClear={clickedClear}
                likedList={likedList}
                watchedList={watchedList}
            />
            {currentMovieList ? 
                <MovieList 
                    movieList={currentMovieList}
                    addLiked={addLiked}
                    removeLiked={removeLiked}
                    addWatched={addWatched}
                    removeWatched={removeWatched}
                    likedList={likedList}
                    watchedList={watchedList}
                /> : []}
            <div style={{width: '100%', backgroundColor: 'black'}}>
                <button 
                    style={{
                        padding: '8px 15px',
                        marginRight: '40px',
                        color: 'black',
                        backgroundColor: '#f2f2f2',
                        borderRadius: '5px',
                        marginBottom: '40px'
                    }}
                    onClick={() => {
                        setPageCount(prev => prev + 1)
                    }}
                >
                    Load More
                </button>
            </div>
        </div>
    )
}

export default Main