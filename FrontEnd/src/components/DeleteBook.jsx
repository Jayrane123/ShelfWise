// import React, { useState, useEffect } from 'react';
// import { Container, Table, Button, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { getBooks, deleteBooks } from '../services/BooksService';
// import { toast } from 'react-toastify';
// import './DeleteBook.css';

// const DeleteBook = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchBooks = async () => {
//     try {
//       const response = await getBooks();
//       setBooks(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch books');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this book?')) {
//       try {
//         await deleteBooks(id);
//         toast.success('Book deleted successfully');
//         // Refresh the books list
//         fetchBooks();
//       } catch (error) {
//         toast.error('Failed to delete book');
//       }
//     }
//   };

//   return (
//     <div className="delete-book-page">
//       <Container className="py-5">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2>Manage Books</h2>
//           <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
//             Back to Dashboard
//           </Button>
//         </div>

//         <Card className="books-table-card">
//           <Card.Body>
//             {loading ? (
//               <div className="text-center">Loading...</div>
//             ) : (
//               <Table responsive hover className="books-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Title</th>
//                     <th>Author</th>
//                     <th>Availability</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {books.map((book) => (
//                     <tr key={book.id}>
//                       <td>{book.id}</td>
//                       <td>{book.title}</td>
//                       <td>{book.author}</td>
//                       <td>
//                         <span className={`status-badge ${book.available ? 'available' : 'unavailable'}`}>
//                           {book.available ? 'Available' : 'Unavailable'}
//                         </span>
//                       </td>
//                       <td>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleDelete(book.id)}
//                           className="delete-btn"
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )}
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default DeleteBook;


import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getBooks, deleteBooks } from '../services/BooksService';
import { toast } from 'react-toastify';
import './DeleteBook.css';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      console.log('Fetched books:', response.data); // Debug log
      setBooks(response.data);
    } catch (error) {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Invalid book ID.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBooks(id);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  return (
    <div className="delete-book-page">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Manage Books</h2>
          <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        <Card className="books-table-card">
          <Card.Body>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <Table responsive hover className="books-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books
                    .filter((book) => book.id != null)
                    .map((book) => (
                      <tr key={book.id ?? `${book.title}-${book.author}`}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          <span className={`status-badge ${book.available ? 'available' : 'unavailable'}`}>
                            {book.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(book.id)}
                            className="delete-btn"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default DeleteBook;

