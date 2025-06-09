import React, { useState } from "react"
import '../styles/features.css'

const Features = () => {
    
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }
    
    return (
        <div className="features-container">
            <div>
                <button>Now Playing</button>
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
            </div>
            <select>
                <option disabled selected>Sort By</option>
                <option></option>
            </select>
        </div>
    )
}

export default Features