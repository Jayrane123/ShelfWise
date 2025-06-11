// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { getToken, removeToken } from '../services/LocalStorage';

// const Navigation = () => {
//   const navigate = useNavigate();
//   const token = getToken();
//   const isAdmin = localStorage.getItem('adminName') !== null;

//   const handleLogout = () => {
//     removeToken();
//     localStorage.removeItem('adminName');
//     navigate('/');
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
//       <Container>
//         <Navbar.Brand as={Link} to="/">ShelfWise</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/about">About Us</Nav.Link>
//             <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
//             <Nav.Link as={Link} to="/more-info">More Info</Nav.Link>
//             {token && isAdmin && <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>}
//             {token && !isAdmin && <Nav.Link as={Link} to="/user/dashboard">User Dashboard</Nav.Link>}
//           </Nav>
//           <Nav>
//             {token ? (
//               <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//             ) : (
//               <Nav.Link as={Link} to="/login">Login</Nav.Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation; 
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../services/LocalStorage';

const Navigation = () => {
  const navigate = useNavigate();
  const token = getToken();
  const isAdmin = localStorage.getItem('adminName') !== null;

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('adminName');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">ShelfWise</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-hover">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-hover">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-hover">Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/more-info" className="nav-hover">More Info</Nav.Link>
            {token && isAdmin && (
              <Nav.Link as={Link} to="/admin/dashboard" className="nav-hover">
                Admin Dashboard
              </Nav.Link>
            )}
            {token && !isAdmin && (
              <Nav.Link as={Link} to="/user/dashboard" className="nav-hover">
                User Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {token ? (
              <Nav.Link onClick={handleLogout} className="nav-hover">Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-hover">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
