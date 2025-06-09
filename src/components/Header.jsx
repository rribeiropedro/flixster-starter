import React from "react"
import '../styles/header.css'

const Header = () => {
    return (
        <header>
            <h1>Flixster</h1>
            <div className="header-features">
                <div>
                    <label>Search</label>
                    <input/>
                </div>
                <select>
                    <option disabled selected>Sort By</option>
                    <option></option>
                </select>
            </div>
        </header>
    )
}

export default Header