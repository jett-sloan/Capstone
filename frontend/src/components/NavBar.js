// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Nav.css'; // Import custom styles

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <Link className="navbar-brand" to="/">Almost Heaven Window Washing</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
            <li className="nav-item"><Link to="/quote" className="nav-link">Quote</Link></li>
            {user ? (
              <>
                <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/signup" className="nav-link">Sign Up</Link></li>
                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


