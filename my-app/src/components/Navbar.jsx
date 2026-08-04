import { Link } from "react-router-dom"

function Navbar() {
  return (
     <nav className="navbar">
          
                <h2>FLICKOLOGY</h2>
            
            <Link to="/">Home</Link>
            <Link to="/actors">Actors</Link>
        </nav>
  )
}

export default Navbar