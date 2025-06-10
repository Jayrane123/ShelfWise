import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Card, Tab, Tabs, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SignInUser, RegisterUser } from '../services/UsersService';
import { storeToken } from '../services/LocalStorage';
import './UserAuth.css';
import { toast } from 'react-toastify';

const UserAuth = () => {
  const [key, setKey] = useState('login');
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await SignInUser(formData);
      if (response.data) {
        storeToken(response.data.token);
        toast.success('User login successful!');
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
      toast.error('User login failed!');
      console.error('Login error:', err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await RegisterUser(formData);
      if (response.data) {
        storeToken(response.data.token);
        toast.success('User registration successful!');
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
      toast.error('User registration failed!');
      console.error('Signup error:', err);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(k || 'login')}
              className="mb-3"
            >
              <Tab eventKey="login" title="Login">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Library Card Number / Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email or library card number" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password" 
                      required 
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="signup" title="Sign Up">
                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password" 
                      required 
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Sign Up
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

UserAuth.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired
  })
};

export default UserAuth; 