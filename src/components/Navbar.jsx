import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">Profile</Link>
        </li>
        <li className="navbar-item logout">
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
