import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import "../styles/movie-list.css"
import "../styles/card-modal.css"

const MovieList = ({ movieList }) => {

    const [displayModal, setDispalyModal] = useState(false)
    const [modalMovie, setModalMovie] = useState()

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
                setDispalyModal(true)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {displayModal ? 
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="close-container">
                            <span onClick={() => setDispalyModal(false)} className="close">&times;</span>
                        </div>
                        <div className="modal-content">
                            <img src={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`}/>
                            <div className="modal-info">
                                <h1>{modalMovie.original_title}</h1>
                                <h3>Release Date: {modalMovie.release_date}</h3>
                                <h4 className="modal-genres"> Genres: {modalMovie.genres.map((genre) => (<span>{genre.name};</span>))}
                                </h4>
                                <p>Overview: <br />{modalMovie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            : []}
            <section className="movie-list-container">
                <div className="movie-grid-container">
                    {movieList.map((item) => (
                        <MovieCard 
                            displayModalById={displayMovieById}
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