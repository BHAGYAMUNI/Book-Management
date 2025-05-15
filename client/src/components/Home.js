import React from 'react';
import './Home.css';

const Home = () => {
  const username = localStorage.getItem('user_name'); // Fetch username from localStorage
  const userId = Number(localStorage.getItem('user_id'));
  const isLoggedIn = !!userId && !isNaN(userId);

  return (
    <div
      className="home-banner d-flex align-items-center text-center text-white"
      style={{
        minHeight: '87.8vh',
        backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        backgroundSize: 'cover',         
        backgroundPosition: 'center',     
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold">Welcome to the Book Management System</h1>
        <p className="lead">Add, explore, and manage your personal book collection in a single place.</p>
        <a href="/register" className="btn btn-warning btn-lg mt-3 fw-semibold me-3">Get Started</a>

        {isLoggedIn && username && (
          <div className="mt-4">
            <h2>Hello, {username}!</h2>
          </div>
        )}
      </div>
      <div className="home-container">
        {/* ...your welcome content... */}
      </div>
    </div>
  );
};

export default Home;
