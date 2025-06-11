import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../services/UsersService';
import { storeToken } from '../services/LocalStorage';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(''); // ✅ State for error message

  // Regex patterns for validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(nameRegex, 'Name must be 2-50 characters long and contain only letters and spaces')
      .required('Name is required'),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        passwordRegex,
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character'
      )
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        ...values,
        role: 'ROLE_USER'
      };

      const response = await RegisterUser(formData);

      if (response.data) {
        storeToken(response.data.token);
        toast.success('Registration successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      toast.error('Registration failed!');
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <img src="/images/Library.avif" alt="Library Background" className="signup-bg" />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="signup-card">
              <Card.Body>
                <h2 className="text-center mb-4">Create a User Account</h2>

                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: ''
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
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Signing Up...' : 'Sign Up as User'}
                      </Button>

                      {/* Show error if present */}
                      {error && (
                        <Alert variant="danger" className="mt-3 text-center">
                          {error}
                        </Alert>
                      )}
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
