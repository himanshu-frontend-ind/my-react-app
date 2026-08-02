import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'

function AppRoutes(){
  const location = useLocation()
  return(
    <Routes>
        <Route path='/' element={<Home key={location.key}/>}/>
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
