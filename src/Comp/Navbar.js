import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">PlaceFinder</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/categories" className="nav-link">Categories</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>
      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            <Link to="/geoapify" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="auth-button logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-button login">Login</Link>
            <Link to="/signup" className="auth-button signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;