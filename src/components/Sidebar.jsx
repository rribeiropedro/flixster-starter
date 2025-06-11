import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faB, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css'

const Sidebar = ({likedList, watchedList}) => {
    const [toggleSideBar, setToggleSideBar] = useState(false)
    const [liked, setLiked] = useState([])

    useEffect(() => {
        console.log(liked)
        likedList ? setLiked(likedList) : []
    }, [likedList])

    return (
        <>
            <FontAwesomeIcon 
                style={{color: 'whitesmoke'}}
                icon={faBars}
                onClick={() => {
                    setToggleSideBar(true)
                }}
            >
            </FontAwesomeIcon>
            <div className={`sidebar-overlay ${toggleSideBar ? "open" : ""}`} onClick={() => setToggleSideBar(false)} />
            <aside className={`sidebar ${toggleSideBar ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setToggleSideBar(false)}>×</button>
                <div>
                    {liked && liked.map((item) => (
                        <h1 style={{color: 'white'}}>{item.title}</h1>
                    ))}
                </div>
                <div>
                    {watchedList && watchedList.map((item) => (
                        <h1 style={{color: 'white'}}>{item.title}</h1>
                    ))}
                </div>
            </aside>
        </>
    )
}

export default Sidebar