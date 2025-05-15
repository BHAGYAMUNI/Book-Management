import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    genre: '',
    description: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateBook = ({ title, author_name, genre }) => {
    if (!title || title.length < 2) return 'Title must be at least 2 characters.';
    if (!author_name || author_name.length < 2) return 'Author name must be at least 2 characters.';
    if (!genre || genre.length < 2) return 'Genre must be at least 2 characters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = Number(localStorage.getItem('user_id'));
    if (!userId) {
      setError('User not logged in.');
      return;
    }

    const errorMsg = validateBook(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const response = await fetch('http://localhost/book-management-system/server/books/add.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          author_name: formData.author_name,
          genre: formData.genre,
          description: formData.description,
          user_id: userId,
        }),
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        alert('Book added successfully');
        navigate('/manage-books');
      } else {
        setError(result.message || 'Failed to add book.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Add Book</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Author Name</label>
          <input
            type="text"
            name="author_name"
            className="form-control"
            value={formData.author_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            className="form-control"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
