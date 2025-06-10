import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  getAllBooks,
  deleteBooks,
  bookUnAvailable,
  bookAvailable
} from '../services/BooksService';
import { toast } from 'react-toastify';
import './ManageBooks.css';

const ManageBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error loading books:', error);
      toast.error('Failed to load books!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBooks(bookId);
        setBooks(books.filter((book) => book.id !== bookId));
        toast.success('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Failed to delete book!');
      }
    }
  };

  const handleToggleAvailability = async (bookId, isAvailable) => {
    try {
      if (isAvailable) {
        await bookUnAvailable(bookId);
      } else {
        await bookAvailable(bookId);
      }

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? { ...book, available: !isAvailable }
            : book
        )
      );
      toast.success(
        `Book marked as ${isAvailable ? 'Unavailable' : 'Available'}`
      );
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Failed to update availability!');
    }
  };

  const handleUpdate = (bookId) => {
    navigate(`/admin/update-book/${bookId}`);
  };

  if (loading) {
    return <div className="text-center p-5">Loading books...</div>;
  }

  return (
    <div className="manage-books">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Manage Books</h2>
          <div>
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => navigate('/admin/dashboard')}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/admin/insert-book')}
            >
              Add Book
            </Button>
          </div>
        </div>

        <Table striped bordered hover responsive className="table align-middle text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Available</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const isAvailable =
                book.available === true ||
                book.available === 1 ||
                book.available === '1';

              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{isAvailable ? 'Yes' : 'No'}</td>
                  <td>
                    <Badge bg={isAvailable ? 'success' : 'danger'} className="text-uppercase">
                      {isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </td>
                  <td className="d-flex justify-content-center flex-wrap gap-1">
                    <Button
                      variant={isAvailable ? 'warning' : 'success'}
                      size="sm"
                      onClick={() =>
                        handleToggleAvailability(book.id, isAvailable)
                      }
                    >
                      {isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                    </Button>

                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleUpdate(book.id)}
                    >
                      Update
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ManageBooks;
