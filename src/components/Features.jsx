import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import '../styles/features.css'

const Features = ({ sortList, resetValue, onQuery, clickedClear, likedList, watchedList, }) => {
    
    const [searchQuery, setSearchQuery] = useState('')
    const [sortValue, setSortValue] = useState('')

    const handleQuery = () => {
        if (searchQuery)
            onQuery(searchQuery, 1)
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleSort = (event) => {
        setSortValue(event.target.value)
        sortList(event.target.value)
    }

    const handleClear = () => {
        setSearchQuery('')
        clickedClear()
    }

    useEffect(() => {
        if (resetValue)
            setSortValue('')
    }, [resetValue])
    
    return (
        <div className="features-container">
            <div className="sidebar-container">
                <Sidebar 
                    likedList={likedList}
                    watchedList={watchedList}
                />
                <h1 className="header-title">Flixster</h1>
            </div>
            <div className="buttons-container">
                <div className="searching-container">
                    <h3>Search:</h3>
                    <input className="input-query" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
                    <button className="submit-query" onClick={handleQuery}>Submit</button>
                    <button 
                        className="submit-query" 
                        onClick={handleClear}>
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
                
        </div>
    )
}

export default Features