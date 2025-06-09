import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MovieList from './components/MovieList'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <MovieList />
      </main>
      <Footer />
    </div>
  )
}

export default App
