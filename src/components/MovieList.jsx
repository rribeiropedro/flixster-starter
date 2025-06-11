import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import "../styles/movie-list.css"
import "../styles/card-modal.css"

const MovieList = ({ movieList, addLiked, removeLiked, addWatched, removeWatched, likedList, watchedList }) => {

    const [displayModal, setDispalyModal] = useState(false)
    const [modalMovie, setModalMovie] = useState()
    const [trailerURL, setTrailerURL] = useState()
    const [toggleTrailer, setToggleTrailer] = useState(false)

    /**
     * This function takes the id of the movie and pulls in all
     * the information possible from the api for the requested movie.
     * Additionally, this api call toggles the modal to display
     * additional information.
     * 
     * @param {*} movieID - The id from the movie which was pulled
     * from the key of the card declared when it was mapped out.
     */
    const displayMovieById = async (movieID) => {
        const apiKey = import.meta.env.VITE_APP_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${movieID}`
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
                setModalMovie(json)
                console.log(json)
                setDispalyModal(true)
            })
            .catch(error => console.log(error))
    }

    /**
     * This function uses the id stored in the modalMovie state and
     * fetches all videos related to the movie id. After fetching,
     * it filters out any video not a trailer and stores the url of
     * the first child trailer.
     */
    const fetchTrailer = async () => {
        const apiKey = import.meta.env.VITE_APP_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${modalMovie.id}/videos?language=en-US`
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
                const trailerList = json.results.filter((item) => item.type === "Trailer")
                const url = `https://www.youtube.com/embed/${trailerList[0].key}`
                setTrailerURL(url)
                setToggleTrailer(true)
            })
            .catch(error => console.log(error))

    }

    return (
        <>
            {displayModal ? 
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="close-container">
                            <span 
                                onClick={() => {
                                    setDispalyModal(false)
                                    setToggleTrailer(false)
                                }} 
                                className="close">&times;
                            </span>
                        </div>
                        <div className="modal-content">
                            {toggleTrailer ? 
                                <div style={{boxSizing: 'border-box', display: 'flex', flexDirection: 'column', width: '100%', gap: '20px'}}>
                                    <iframe src={trailerURL}></iframe>
                                    <button 
                                        onClick={() => setToggleTrailer(false)}
                                        style={{width: '25%'}}
                                    >
                                        Return
                                    </button> 
                                </div> : 
                                <>
                                    <img src={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`}/>
                                    <div className="modal-info">
                                        <h1>{modalMovie.original_title}</h1>
                                        <h3>Release Date: {modalMovie.release_date}</h3>
                                        <h4 className="modal-genres"> Genres: {modalMovie.genres.map((genre) => (<span>{genre.name};</span>))}
                                        </h4>
                                        <p>Overview: <br />{modalMovie.overview}</p>
                                        <button onClick={fetchTrailer}>Watch Trailer</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            : []}
            <section className="movie-list-container">
                <div className="movie-grid-container">
                    {movieList.map((item) => (
                        <MovieCard 
                            key={item.id}
                            id={item.id}
                            movieTitle={item.title} 
                            moviePoster={item.poster_path}
                            movieRating={item.vote_average}
                            displayModalById={displayMovieById}
                            addLiked={addLiked} 
                            removeLiked={removeLiked}
                            addWatched={addWatched}
                            removeWatched={removeWatched}
                            isLiked={likedList.some(element => element.id === item.id)}
                            isWatched={watchedList.some(element => element.id === item.id)}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default MovieList