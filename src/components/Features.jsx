import React, { useState } from "react"
import '../styles/features.css'

const Features = ({ onQuery, onNowButton }) => {
    
    const [searchQuery, setSearchQuery] = useState('')

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
    
    return (
        <div className="features-container">
            <div className="searching-container">
                <button className="now-playing-btn" onClick={handleNowPlayingButton}>Now Playing</button>
                <h3>Search:</h3>
                <input className="input-query" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
                <button className="submit-query" onClick={handleQuery}>Submit</button>
            </div>
            <select className="drop-down">
                <option disabled selected>Sort By</option>
                <option></option>
            </select>
        </div>
    )
}

export default Features