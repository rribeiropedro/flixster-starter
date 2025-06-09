import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MovieList from './components/MovieList'
import Features from './components/Features'
import Main from './components/Main'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
