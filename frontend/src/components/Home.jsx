import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>Welcome App</h2>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>
      <div className="welcome-message">
        <h1>Welcome to Our TODO Application</h1>
        <p>Please register or login to continue.</p>
      </div>
    </div>
  );
};

export default Home;