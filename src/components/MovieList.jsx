import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import "../styles/movie-list.css"
import "../styles/card-modal.css"

const MovieList = ({ movieList }) => {

    const [displayModal, setDispalyModal] = useState(false)
    const [modalMovie, setModalMovie] = useState()

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
                        <span onClick={() => setDispalyModal(false)} className="close">&times;</span>
                        <h1>{modalMovie.original_title}</h1>
                        <img src={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`}/>
                        <h3>{modalMovie.release_date}</h3>
                        <div className="modal-genres">
                            {modalMovie.genres.map((genre) => (
                                <h4 key={genre.id}>{genre.name}</h4>
                            ))}
                        </div>
                        <p>{modalMovie.overview}</p>
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