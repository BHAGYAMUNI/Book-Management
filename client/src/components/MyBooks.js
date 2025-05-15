import React, { useEffect, useState } from 'react';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = Number(localStorage.getItem('user_id'));

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await fetch(`http://localhost/book-management-system/server/books/get.php`);
        const data = await res.json();
        const userBooks = data.books.filter(book => book.added_by == userId);

        setBooks(userBooks);
      } catch (err) {
        console.error('Failed to fetch books:', err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h3 className="mb-3">My Books</h3>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th style={{ width: '250px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author_name}</td>
                <td>{book.genre}</td>
                <td style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                  {book.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBooks;
