import React, { useState } from "react"

const Header = () => {
    return (
        <header style={{
            padding: '20px 125px 5px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: '#1772c1',
            fontFamily: "'Lato', sans-serif",
            fontSize: '20px',
            color: 'whitesmoke',
        }}>
            <h1 style={{padding: '0', margin: '0'}}>Flixster</h1>
        </header>
    )
}

export default Header