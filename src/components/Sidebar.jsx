import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faB, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css'

const Sidebar = ({likedList, watchedList}) => {
    const [toggleSideBar, setToggleSideBar] = useState(false)

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
                {!likedList.length > 0 && !watchedList.length > 0 && <h1>No Movies Liked Or Watched</h1>}
                {likedList.length > 0 && (
                    <>
                        <h1>Liked Videos</h1>
                        <hr style={{marginBottom: '20px', width: '100%'}}/>
                        <div className="list-container">
                            {likedList.map((item) => (
                                <div className="list-item">
                                    <img src={item.poster}/>
                                    <h1 style={{color: 'white'}}>{item.title}</h1>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {watchedList.length > 0 && (
                    <>
                        <h1 style={{marginTop: '20px'}}>Watched Videos</h1>
                        <hr style={{width: '100%'}}/>
                        <div className="list-container">
                            {watchedList.map((item) => (
                                <div className="list-item">
                                    <img src={item.poster}/>
                                    <h1>{item.title}</h1>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </aside>
        </>
    )
}

export default Sidebar