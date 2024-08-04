// src/components/Dashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/index.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens or user data as needed
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="content">
        <h3>Welcome to the Dashboard</h3>
        <p>Here you can add more components and content as needed.</p>
      </div>
    </div>
  );
};

export default Dashboard;
