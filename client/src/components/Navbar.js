import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ensure the CSS file is imported

const Navbar = () => {
  const [userId, setUserId] = useState(Number(localStorage.getItem('user_id')));
  const [username, setUsername] = useState(localStorage.getItem('user_name'));
  const [expanded, setExpanded] = useState(false); // <-- Add this line
  const isLoggedIn = !!userId && !isNaN(userId);
  const navigate = useNavigate();

  // Listen for storage changes (e.g., login/logout in other tabs)
  useEffect(() => {
    const syncAuth = () => {
      setUserId(Number(localStorage.getItem('user_id')));
      setUsername(localStorage.getItem('username'));
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  // Update state after login/logout in this tab
  useEffect(() => {
    setUserId(Number(localStorage.getItem('user_id')));
    setUsername(localStorage.getItem('user_name'));
  }, [localStorage.getItem('user_id'), localStorage.getItem('user_name')]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setUserId(null);
    setUsername(null);
    navigate('/register'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black"> {/* Black background */}
      <div className="container">
        <Link className="navbar-brand" to="/">Book Management</Link> {/* Title on the left */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${expanded ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* Align links to the right */}
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/">Home</Link>
            </li>
            {/* Updated this to Link for routing */}
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/manage-books">Manage Books</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to="/my-books">My Books</Link>
              </li>
            )}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">{username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" style={{ color: '#fff', textDecoration: 'none' }} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
