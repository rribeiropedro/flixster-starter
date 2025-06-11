import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faB, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css'

const Sidebar = ({favoriteList, watchList}) => {
    const [toggleSideBar, setToggleSideBar] = useState(false)

    return (
        <>
            <FontAwesomeIcon style={{color: 'whitesmoke'}} icon={faBars} onClick={() => setToggleSideBar(true)}>click</FontAwesomeIcon>
            <div className={`sidebar-overlay ${toggleSideBar ? "open" : ""}`} onClick={() => setToggleSideBar(false)} />
            <aside className={`sidebar ${toggleSideBar ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setToggleSideBar(false)}>×</button>
                <div>
                    {favoriteList ? favoriteList.map((key, item) => {
                        <h1>card</h1>
                    }) : []}
                </div>
                <div>
                    {watchList ? watchList.map((key, item) => {
                        <h1>card</h1>
                    }) : []}
                </div>
            </aside>
        </>
    )
}

export default Sidebar