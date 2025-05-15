import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const userId = Number(localStorage.getItem('user_id'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost/book-management-system/server/books/get.php?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        const data = await response.json();
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (err) {
        // Handle error
      }
      setLoading(false);
    };

    fetchBooks();
  }, [page, sortBy, sortOrder]);

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch('http://localhost/book-management-system/server/books/delete.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ book_id: bookId, user_id: userId }),
        });

        const result = await response.json();
        if (response.ok && result.status === 'success') {
          alert('Book deleted successfully');
          setBooks(books.filter(book => book.id !== bookId));
        } else {
          alert('Failed to delete book');
        }
      } catch (err) {
        alert('Error deleting book');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Books</h2>
      
      <div className="mb-4">
        <Link to="/add-book" className="btn btn-success">
          Add Book
        </Link>
      </div>

      <div className="mb-4 d-flex gap-2 align-items-center">
        <label>Sort by:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-select w-auto">
          <option value="title">Title</option>
          <option value="author_name">Author</option>
          <option value="genre">Genre</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="form-select w-auto">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th style={{ width: '250px' }}>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} style={{ height: 'auto', verticalAlign: 'middle' }}>
                <td>{book.title}</td>
                <td>{book.author_name}</td>
                <td>{book.genre}</td>
                <td style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                  {book.description}
                </td>
                <td>
                  {Number(book.added_by) === userId && userId > 0 ? (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        style={{ display: 'inline-block', marginRight: '8px' }}
                        onClick={() => navigate(`/edit-book/${book.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ display: 'inline-block' }}
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span>View only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination d-flex justify-content-center">
        <button 
          className="btn btn-primary" 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span className="mx-2">Page {page} of {totalPages}</span>
        <button 
          className="btn btn-primary" 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageBooks;
