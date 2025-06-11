import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userIssuedBooks } from '../services/BooksService';

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await userIssuedBooks(userEmail);
        setIssuedBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch issued books:', error);
      }
    };

    fetchIssuedBooks();
  }, [userEmail]);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">My Issued Books</h2>
      <div className="mb-4">
        <Button variant="secondary" onClick={() => navigate('/user/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
      {issuedBooks.length === 0 ? (
        <div className="text-center">No books issued yet.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Issue Date</th>
              <th>Due In (Days)</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.issueDate}</td>
                <td>{book.dueDate || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default IssuedBooks;
