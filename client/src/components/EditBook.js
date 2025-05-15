import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    genre: '',
    description: '', // Add this
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch book details on mount
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost/book-management-system/server/books/get.php?id=${id}`);
        const data = await response.json();
        if (response.ok && data.book) {
          setFormData({
            title: data.book.title || '',
            author_name: data.book.author_name || '',
            genre: data.book.genre || '',
            description: data.book.description || '', // Add this
          });
        } 
      } catch (err) {
        setMessage('Error fetching book details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Example validation function
  const validateBook = ({ title, author_name, genre }) => {
    if (!title || title.length < 2) return 'Title must be at least 2 characters.';
    if (!author_name || author_name.length < 2) return 'Author name must be at least 2 characters.';
    if (!genre || genre.length < 2) return 'Genre must be at least 2 characters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('book_id', id);
    dataToSend.append('title', formData.title);
    dataToSend.append('author_name', formData.author_name);
    dataToSend.append('genre', formData.genre);
    dataToSend.append('description', formData.description); 

    // Validation
    const errorMsg = validateBook(formData); 
    if (errorMsg) {
      setMessage(errorMsg);
      return;
    }

    try {
      const response = await fetch('http://localhost/book-management-system/server/books/edit.php', {
        method: 'POST',
        body: dataToSend,
      });

      const data = await response.json();

      if (data.status === 'success') {
        setMessage('Book updated successfully!');
        setTimeout(() => navigate('/manage-books'), 1000); 
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Edit Book</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Author Name:</label>
          <input
            type="text"
            className="form-control"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Genre:</label>
          <input
            type="text"
            className="form-control"
            name="genre"
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
        <button type="submit" className="btn btn-primary">Update</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/manage-books')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBook;