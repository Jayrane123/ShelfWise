import React, { useState } from 'react';
import { Container, Row, Col, Card, Carousel, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SignInAdmin } from '../services/AdminService';
import { storeToken, getToken } from '../services/LocalStorage';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const token = getToken();

  const [adminName, setAdminName] = useState(localStorage.getItem('adminName') || '');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const libraryImages = [
    {
      src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1470&auto=format&fit=crop",
      title: 'Welcome to Our Library',
      description: 'A place for learning and discovery'
    },
    {
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop",
      title: 'Modern Facilities',
      description: 'State-of-the-art reading spaces'
    },
    {
      src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1590&auto=format&fit=crop",
      title: 'Extensive Collection',
      description: 'Thousands of books at your fingertips'
    }
  ];

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      available: true,
      coverImage: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      available: false,
      coverImage: "https://covers.openlibrary.org/b/id/8225265-L.jpg"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      available: true,
      coverImage: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      available: false,
      coverImage: "https://covers.openlibrary.org/b/id/8091016-L.jpg"
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      available: true,
      coverImage: "https://covers.openlibrary.org/b/id/6979861-L.jpg"
    },
    {
      id: 6,
      title: "Moby-Dick",
      author: "Herman Melville",
      available: true,
      coverImage: "https://covers.openlibrary.org/b/id/5551231-L.jpg"
    }
  ];
  

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = {
        email: adminEmail,
        password: adminPassword
      };

      const response = await SignInAdmin(formData);

      if (response.data) {
        localStorage.setItem('adminName', response.data.name);
        setAdminName(response.data.name);
        storeToken(response.data.token);
        toast.success('Admin login successful!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please use email: pratikspgms@gmail.com and password: 123456');
      toast.error('Admin login failed!');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="home-page">
      {/* Moving Tagline */}
      <div className="moving-tagline">
        <div className="tagline-content">
          Welcome to ShelfWise - Your Digital Library Management System
        </div>
      </div>

      {/* Library Carousel */}
      <div className="library-carousel">
        <Carousel>
          {libraryImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={image.src} alt={image.title} />
              <Carousel.Caption>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Login Sections - Only show if not logged in */}
      {!token && (
        <Container className="py-5">
          <Row className="justify-content-center g-4">
            <Col md={6} lg={5}>
              <Card className="h-100 text-center border-primary">
                <Card.Body>
                  <h2 className="mb-3">User Access</h2>
                  <p className="mb-4">Access our library services as a member</p>
                  <Link to="/login?role=user">
                    <Button variant="primary" className="w-100 mb-3" size="lg">
                      User Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline-primary" className="w-100">
                      Register as User
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={5}>
              <Card className="h-100 text-center border-danger">
                <Card.Body>
                  <h2 className="mb-3">Admin Access</h2>
                  <p className="mb-4">Manage library resources and members</p>
                  <Link to="/login?role=admin">
                    <Button variant="danger" className="w-100 mb-3" size="lg">
                      Admin Login
                    </Button>
                  </Link>
                  <div className="text-muted small mt-2">
                    New admin accounts can only be created by existing admins
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}

      {/* Featured Books Section */}
      <Container className="featured-books py-5">
        <h2 className="text-center mb-4">Featured Books</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <Card className="book-card h-100">
                <Card.Img variant="top" src={book.coverImage} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>By {book.author}</Card.Text>
                  <Badge bg={book.available ? "success" : "danger"}>
                    {book.available ? "Available" : "Checked Out"}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;


// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Carousel, Badge, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { getBooks } from '../services/BooksService';
// import { SignInAdmin } from '../services/AdminService';
// import { storeToken, getToken } from '../services/LocalStorage';
// import { toast } from 'react-toastify';
// import './Home.css';

// const Home = () => {
//   const navigate = useNavigate();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [adminName, setAdminName] = useState('');
//   const [adminEmail, setAdminEmail] = useState('');
//   const [adminPassword, setAdminPassword] = useState('');
//   const [error, setError] = useState('');
//   const token = getToken();

//   const libraryImages = [
//     {
//       src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1470&auto=format&fit=crop",
//       title: 'Welcome to Our Library',
//       description: 'A place for learning and discovery'
//     },
//     {
//       src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop",
//       title: 'Modern Facilities',
//       description: 'State-of-the-art reading spaces'
//     },
//     {
//       src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1590&auto=format&fit=crop",
//       title: 'Extensive Collection',
//       description: 'Thousands of books at your fingertips'
//     }
//   ];

//   useEffect(() => {
//     // Load books only if user is logged in
//     const loadBooks = async () => {
//       if (token) {
//         try {
//           const response = await getBooks();
//           setBooks(response.data);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error loading books:', error);
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     loadBooks();

//     // Get admin name from localStorage
//     const storedAdminName = localStorage.getItem('adminName');
//     if (storedAdminName) {
//       setAdminName(storedAdminName);
//     }
//   }, [token]);

//   const handleAdminLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const formData = {
//         email: adminEmail,
//         password: adminPassword
//       };

//       const response = await SignInAdmin(formData);
      
//       if (response.data) {
//         localStorage.setItem('adminName', response.data.name);
//         setAdminName(response.data.name);
//         storeToken(response.data.token);
//         toast.success('Admin login successful!');
//         navigate('/admin/dashboard');
//       }
//     } catch (err) {
//       setError('Invalid credentials. Please use email: pratikspgms@gmail.com and password: 123456');
//       toast.error('Admin login failed!');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className="home-page">
//       {/* Moving Tagline */}
//       <div className="moving-tagline">
//         <div className="tagline-content">
//           Welcome to ShelfWise - Your Digital Library Management System
//         </div>
//       </div>

//       {/* Library Carousel */}
//       <div className="library-carousel">
//         <Carousel>
//           {libraryImages.map((image, index) => (
//             <Carousel.Item key={index}>
//               <img
//                 className="d-block w-100"
//                 src={image.src}
//                 alt={image.title}
//               />
//               <Carousel.Caption>
//                 <h3>{image.title}</h3>
//                 <p>{image.description}</p>
//               </Carousel.Caption>
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       </div>

//       {/* Login Sections - Only show if not logged in */}
//       {!token && (
//         <Container className="py-5">
//           <Row className="justify-content-center g-4">
//             <Col md={6} lg={5}>
//               <Card className="h-100 text-center border-primary">
//                 <Card.Body>
//                   <h2 className="mb-3">User Access</h2>
//                   <p className="mb-4">Access our library services as a member</p>
//                   <Link to="/login?role=user">
//                     <Button variant="primary" className="w-100 mb-3" size="lg">
//                       User Login
//                     </Button>
//                   </Link>
//                   <Link to="/signup">
//                     <Button variant="outline-primary" className="w-100">
//                       Register as User
//                     </Button>
//                   </Link>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6} lg={5}>
//               <Card className="h-100 text-center border-danger">
//                 <Card.Body>
//                   <h2 className="mb-3">Admin Access</h2>
//                   <p className="mb-4">Manage library resources and members</p>
//                   <Link to="/login?role=admin">
//                     <Button variant="danger" className="w-100 mb-3" size="lg">
//                       Admin Login
//                     </Button>
//                   </Link>
//                   <div className="text-muted small mt-2">
//                     New admin accounts can only be created by existing admins
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       )}

//       {/* Featured Books Section */}
//       <Container className="featured-books py-5">
//         <h2 className="text-center mb-4">Featured Books</h2>
//         {loading ? (
//           <div className="text-center">Loading books...</div>
//         ) : (
//           <Row xs={1} md={2} lg={3} className="g-4">
//             {books.slice(0, 6).map((book) => (
//               <Col key={book.id}>
//                 <Card className="book-card h-100">
//                   <Card.Img variant="top" src={book.coverImage} alt={book.title} />
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <Card.Text>By {book.author}</Card.Text>
//                     <Badge bg={book.available ? "success" : "danger"}>
//                       {book.available ? "Available" : "Checked Out"}
//                     </Badge>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default Home; 