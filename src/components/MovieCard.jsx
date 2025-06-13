import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck as faSquareCheckRegular } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck as faSquareCheckSolid } from '@fortawesome/free-solid-svg-icons';
import "../styles/movie-card.css"

const MovieCard = (props) => {
    const [liked, setLiked] = useState()
    const [watched, setWatched] = useState()
    const posterUrl = `https://image.tmdb.org/t/p/w500${props.moviePoster}`

    const toggleModal = () => {
        props.displayModalById(props.id)
    }

    /**
     * This function takes in events to stop propogation and sends 
     * movie to the Sidebar.jsx component to display the liked movies
     * list.
     * 
     * @param {*} event - Allows us to stop the propogation of
     * the parent components
     */
    const handleLike = (event) => {
        event.stopPropagation()
        liked ? props.removeLiked(props.id) : props.addLiked(
            props.id,
            props.movieTitle,
            props.moviePoster)
        setLiked(!liked)
    }

    /**
     * This function takes in events to stop propogation and sends 
     * movie to the Sidebar.jsx component to display the watched movies
     * list.
     * 
     * @param {*} event - Allows us to stop the propogation of
     * the parent components
     */
    const handleWatch = (event) => {
        event.stopPropagation()
        watched ? props.removeWatched(props.id) : props.addWatched(
            props.id,
            props.movieTitle,
            props.moviePoster) 
        setWatched(!watched)
    }

    return (
        <div onClick={toggleModal} className="card-container">
            <div className="card-info">
                <img alt={props.movieTitle} src={posterUrl} />
                <div className="title-like-container">
                    <h1 style={{width: '72%'}}>{props.movieTitle}</h1>
                </div>
                <h4>Rating: {Number(props.movieRating.toFixed(1))}</h4>
                <div className="liked-watched">
                    <span>
                        Like:
                        <FontAwesomeIcon 
                            style={liked || props.isLiked ? {marginLeft: '5px', color: 'red'} : {marginLeft: '5px'}}
                            icon={liked || props.isLiked ? faHeartSolid : faHeartRegular} 
                            onClick={handleLike}
                        />
                    </span>
                    <span>
                        Watched:
                        <FontAwesomeIcon 
                            style={watched || props.isWatched ? {marginLeft: '5px', color: 'green'} : {marginLeft: '5px'}}
                            icon={watched || props.isWatched ? faSquareCheckSolid : faSquareCheckRegular}
                            onClick={handleWatch}
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard