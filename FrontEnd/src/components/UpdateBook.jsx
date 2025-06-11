import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooks, updateBooks } from '../services/BooksService';
import { toast } from 'react-toastify';
import './UpdateBook.css';

const UpdateBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters'),
    author: Yup.string()
      .required('Author is required')
      .min(2, 'Author must be at least 2 characters'),
    available: Yup.boolean(),
    dueDate: Yup.number()
      .required('Due date is required')
      .min(1, 'Due date must be at least 1 day')
      .max(30, 'Due date cannot exceed 30 days')
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBooks();
        const bookToUpdate = response.data.find(b => b.id === parseInt(id));
        if (bookToUpdate) {
          setBook(bookToUpdate);
        } else {
          toast.error('Book not found');
          navigate('/admin/dashboard');
        }
      } catch (error) {
        toast.error('Failed to fetch book details');
        navigate('/admin/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateBooks(id, values);
      toast.success('Book updated successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to update book');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="update-book-page">
        <img src="/images/Library.avif" alt="Library Background" className="updatebook-bg" />
        <Container className="py-5">
          <div className="text-center">Loading...</div>
        </Container>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="update-book-page">
      <img src="/images/Library.avif" alt="Library Background" className="updatebook-bg" />
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Update Book</h2>
          <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        <Card className="book-form-card">
          <Card.Body>
            <Formik
              initialValues={{
                title: book.title,
                author: book.author,
                available: book.available,
                dueDate: book.dueDate
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.title && errors.title}
                      placeholder="Enter book title"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={values.author}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.author && errors.author}
                      placeholder="Enter author name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.author}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Availability</Form.Label>
                    <Form.Check
                      type="switch"
                      id="available"
                      name="available"
                      checked={values.available}
                      onChange={handleChange}
                      label={values.available ? "Available" : "Not Available"}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Due Date (days)</Form.Label>
                    <Form.Control
                      type="number"
                      name="dueDate"
                      value={values.dueDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.dueDate && errors.dueDate}
                      min="1"
                      max="30"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dueDate}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Number of days the book can be borrowed (1-30 days)
                    </Form.Text>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating Book...' : 'Update Book'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UpdateBook; 