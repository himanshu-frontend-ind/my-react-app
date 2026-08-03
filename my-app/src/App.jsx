import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Actors from './components/Actors'

function AppRoutes(){
  return(
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/actors" element={<Actors />} />
        <Route path='/movie/:id' element={<MovieDetail/>}/>
      </Routes>
  )
}

function App() {
  

  return (
    <>
    <Router>
      <Navbar/>
      <AppRoutes/>
    </Router>
    </>
  )
}

export default App
