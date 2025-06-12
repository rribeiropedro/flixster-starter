import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MovieList from './components/MovieList'
import Features from './components/Features'
import Body from './components/Body'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Body />
      <Footer />
    </div>
  )
}

export default App
