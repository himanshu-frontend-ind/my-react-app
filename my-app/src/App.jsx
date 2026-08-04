import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Actors from './components/Actors'
import ActorMovies from './components/ActorMovies'

function AppRoutes(){
  return(
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/actors" element={<Actors />} />
        <Route path="/actor/:name" element={<ActorMovies />} />
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