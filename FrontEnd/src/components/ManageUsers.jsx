// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
// import { getAllUsers } from '../services/UsersService';
// import { toast } from 'react-toastify';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     id: 0,
//     name: '',
//     email: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await getAllUsers();
//       setUsers(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch users');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (isEditing) {
//       // Normally update via API
//       setUsers(prev =>
//         prev.map(user => (user.id === formData.id ? formData : user))
//       );
//     } else {
//       // Normally save to server
//       const newUser = {
//         ...formData,
//         id: Math.max(...users.map(u => u.id), 0) + 1
//       };
//       setUsers(prev => [...prev, newUser]);
//     }

//     handleClose();
//   };

//   const handleDelete = () => {
//     setUsers(prev => prev.filter(user => user.id !== formData.id));
//     handleClose();
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setFormData({
//       id: 0,
//       name: '',
//       email: ''
//     });
//     setIsEditing(false);
//   };

//   const handleSelectUser = (user) => {
//     setFormData({ ...user });
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   return (
//     <Container className="mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Users</h2>
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           Add New User
//         </Button>
//       </div>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? 'Edit User' : 'Add New User'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           {isEditing && (
//             <Button variant="danger" onClick={handleDelete}>
//               Delete
//             </Button>
//           )}
//           <Button variant="primary" onClick={handleSubmit}>
//             {isEditing ? 'Update' : 'Add'} User
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr
//               key={user.id}
//               onClick={() => handleSelectUser(user)}
//               style={{ cursor: 'pointer' }}
//             >
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ManageUsers;
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import { getAllUsers } from '../services/UsersService';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    email: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      const data = response.data;

      console.log("Fetched users:", data); // Debug log

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users); // if the API returns { users: [...] }
      } else {
        console.error("Unexpected data format from API:", data);
        setUsers([]);
        toast.error("Invalid user data format received");
      }
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
      setUsers([]); // Fallback to empty list on error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("All fields are required");
      return;
    }

    if (isEditing) {
      setUsers(prev =>
        prev.map(user => (user.id === formData.id ? formData : user))
      );
    } else {
      const newUser = {
        ...formData,
        id: Math.max(...users.map(u => u.id), 0) + 1
      };
      setUsers(prev => [...prev, newUser]);
    }

    handleClose();
  };

  const handleDelete = () => {
    setUsers(prev => prev.filter(user => user.id !== formData.id));
    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      id: 0,
      name: '',
      email: ''
    });
    setIsEditing(false);
  };

  const handleSelectUser = (user) => {
    setFormData({ ...user });
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New User
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEditing && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Add'} User
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map(user => (
              <tr
                key={user.id}
                onClick={() => handleSelectUser(user)}
                style={{ cursor: 'pointer' }}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageUsers;
