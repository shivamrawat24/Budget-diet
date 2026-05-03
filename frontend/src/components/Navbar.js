import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">🍽️ Budget Diet Planner</h1>
        <div className="navbar-menu">
          {user ? (
            <>
              <span className="navbar-user">Welcome, {user.name}!</span>
              <button onClick={onLogout} className="navbar-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <span className="navbar-user">Please login to continue</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
