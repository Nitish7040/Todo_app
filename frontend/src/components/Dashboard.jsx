// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import './index.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/v1/users/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT for auth
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear tokens or user data as needed
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Dashboard</h2>
        <div className="navbar-right">
          {user && (
            <Avatar 
            image={user.avatar}  
            name={user.name} 
            size="medium" 
          />
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="content">
        <h3>Welcome to the Dashboard</h3>
        <p>Here you can add more components and content as needed.</p>
      </div>
    </div>
  );
};

export default Dashboard;
