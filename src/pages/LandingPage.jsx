import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Fitness Tracker</h1>
      <div className="auth-links">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/register" className="auth-link">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
