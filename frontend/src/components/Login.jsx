// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/login', { username, password });
      setMessage('Login successful');
      // Handle the response (e.g., store tokens, redirect user)
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      setMessage('Login failed');
      console.error(error);
    }
  };

  return (
    <div className="login-form-container ">
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="nav-link">Register</Link>
        {message && <p className="message">{message}</p>}
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* {message && <p className="message">{message}</p>} */}
    </div>
  );
};

export default LoginForm;
