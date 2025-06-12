import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import '../styles/features.css'

const Features = ({  sortList, resetValue, onQuery, onNowButton, likedList, watchedList, }) => {
    
    const [searchQuery, setSearchQuery] = useState('')
    const [sortValue, setSortValue] = useState('')

    const handleQuery = () => {
        if (searchQuery)
            onQuery(searchQuery)
    }

    const handleNowPlayingButton = () => {
        onNowButton()
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleSort = (event) => {
        setSortValue(event.target.value)
        sortList(event.target.value)
    }

    useEffect(() => {
        if (resetValue)
            setSortValue('')
    }, [resetValue])
    
    return (
        <div className="features-container">
            <div className="searching-container">
                <div style={{marginRight: '30px'}}>
                    <Sidebar 
                        likedList={likedList}
                        watchedList={watchedList}
                    />
                </div>
                <h3>Search:</h3>
                <input className="input-query" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
                <button className="submit-query" onClick={handleQuery}>Submit</button>
                <button 
                    className="submit-query" 
                    onClick={() => {
                        setSearchQuery('')
                        onNowButton()
                    }}>
                    Clear
                </button>
            </div>
            <select value={sortValue} onChange={handleSort} className="drop-down">
                <option value="" disabled selected>Sort By</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="date">Date</option>
                <option value="rating">Rating</option>
            </select>
        </div>
    )
}

export default Features