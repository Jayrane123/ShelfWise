import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../services/LocalStorage';

const NavigationBar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Library Hub</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/books" className="hover:text-gray-300">Books</Link>
          <Link to="/more-info" className="hover:text-gray-300">More Info</Link>
          {token ? (
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar; 