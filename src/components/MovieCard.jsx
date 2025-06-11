import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck as faSquareCheckRegular } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck as faSquareCheckSolid } from '@fortawesome/free-solid-svg-icons';
import "../styles/movie-card.css"

const MovieCard = (props) => {

    const [liked, setLiked] = useState(false)
    const [watched, setWatched] = useState(false)
    const posterUrl = `https://image.tmdb.org/t/p/w500${props.moviePoster}`;

    const toggleModal = () => {
        props.displayModalById(props.id)
    }

    return (
        <div onClick={toggleModal} className="card-container">
            <img src={posterUrl} />
            <div className="card-info">
                <div className="title-like-container">
                    <h1 style={{width: '72%'}}>{props.movieTitle}</h1>
                    <span>
                        Like:
                        <FontAwesomeIcon 
                            style={liked ? {marginLeft: '5px', color: 'red'} : {marginLeft: '5px'}}
                            icon={liked ? faHeartSolid : faHeartRegular} 
                            onClick={event => {
                                    event.stopPropagation()
                                    setLiked(!liked)
                                }
                            }
                        />
                    </span>
                </div>
                <h4>Rating: {Number(props.movieRating.toFixed(1))}</h4>
                <span>
                    Watched:
                    <FontAwesomeIcon 
                        style={watched ? {marginLeft: '5px', color: 'green'} : {marginLeft: '5px'}}
                        icon={watched ? faSquareCheckSolid : faSquareCheckRegular}
                        onClick={event => {
                            event.stopPropagation()
                            setWatched(!watched)
                        }}
                    />
                </span>
            </div>
        </div>
    )
}

export default MovieCard