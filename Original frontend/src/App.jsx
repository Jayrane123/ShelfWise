import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AdminAuth from './components/AdminAuth';
import UserAuth from './components/UserAuth';
import BookList from './components/BookList';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ManageBooks from './components/ManageBooks';
import AddBook from './components/AddBook';
import ManageUsers from './components/ManageUsers';
import CreateAdmin from './components/CreateAdmin';
import IssuedBooks from './components/IssuedBooks';
import MoreInfo from './components/MoreInfo';
import { PrivateRoute } from './components/PrivateRoute';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import InsertBook from './components/InsertBook';
import DeleteBook from './components/DeleteBook';
import UpdateBook from './components/UpdateBook';

// Initial books data
const initialBooks = [
  {
    id: "1",
    title: "Effective Java",
    author: "Joshua Bloch",
    isbn: "978-0134685991",
    coverImage: "https://m.media-amazon.com/images/I/41zLQYAHZjL._SX376_BO1,204,203,200_.jpg",
    description: "The definitive guide to best practices in Java programming.",
    available: true
  },
  {
    id: "2",
    title: "Head First Java",
    author: "Kathy Sierra, Bert Bates",
    isbn: "978-0596009205",
    coverImage: "https://m.media-amazon.com/images/I/61fV6RcXGhL._SX430_BO1,204,203,200_.jpg",
    description: "A complete learning experience in Java programming.",
    available: true
  },
  {
    id: "3",
    title: "Java Concurrency in Practice",
    author: "Brian Goetz",
    isbn: "978-0321349606",
    coverImage: "https://m.media-amazon.com/images/I/51p9KDvDqFL._SX379_BO1,204,203,200_.jpg",
    description: "Comprehensive coverage of Java concurrency.",
    available: true
  }
];

const App = () => {
  useEffect(() => {
    // Initialize books in localStorage if not present
    const storedBooks = localStorage.getItem('books');
    if (!storedBooks) {
      localStorage.setItem('books', JSON.stringify(initialBooks));
    }
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminAuth />} />
            <Route path="/user" element={<UserAuth />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/create-admin" element={<CreateAdmin />} />
            <Route path="/user/signup" element={<CreateAdmin />} />
            <Route path="/user/issued-books" element={<IssuedBooks />} />
            <Route path="/more-info" element={<MoreInfo />} />
            <Route element={<PrivateRoute></PrivateRoute>}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-books" element={<ManageBooks />} />
              <Route path="/admin/add-book" element={<AddBook />} />
              <Route path="/admin/manage-users" element={<ManageUsers />} />
              <Route path="/admin/insert-book" element={<InsertBook />} />
              <Route path="/admin/delete-book" element={<DeleteBook />} />
              <Route path="/admin/update-book/:id" element={<UpdateBook />} />
            </Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Router>
  );
};

export default App; 