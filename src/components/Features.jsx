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
            <div>
                <button onClick={handleNowPlayingButton}>Now Playing</button>
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
                <button onClick={handleQuery}>Submit</button>
            </div>
            <select>
                <option disabled selected>Sort By</option>
                <option></option>
            </select>
        </div>
    )
}

export default Features