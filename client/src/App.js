import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ManageBooks from './components/ManageBooks';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import MyBooks from './components/MyBooks';

function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];

  return (
    <>
      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Book Management */}
        <Route path="/manage-books" element={<ManageBooks />} />
        
        {/* Add Book */}
        <Route path="/add-book" element={<AddBook />} />

        {/* Edit Book - Uncomment if needed */}
        <Route path="/edit-book/:id" element={<EditBook />} />

        {/* My Books */}
        <Route path="/my-books" element={<MyBooks />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
