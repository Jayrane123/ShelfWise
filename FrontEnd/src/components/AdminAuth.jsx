import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Card, Tab, Tabs, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SignInAdmin, RegisterAdmin } from '../services/AdminService';
import { storeToken } from '../services/LocalStorage';
import './AdminAuth.css';
import { toast } from 'react-toastify';

const AdminAuth = () => {
  const [key, setKey] = useState('login');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await SignInAdmin({ email, password });
      if (response.data) {
        storeToken(response.data.token);
        toast.success('Admin login successful!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
      toast.error('Admin login failed!');
      console.error('Login error:', err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await RegisterAdmin({ name, email, password, confirmPassword });
      if (response.data) {
        storeToken(response.data.token);
        toast.success('Admin registration successful!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
      toast.error('Admin registration failed!');
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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      placeholder="Enter email" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="password"
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name"
                      placeholder="Enter name" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      placeholder="Enter email" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="password"
                      placeholder="Password" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="confirmPassword"
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

AdminAuth.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired
  })
};

export default AdminAuth; 