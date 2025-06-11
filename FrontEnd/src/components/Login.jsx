import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { storeToken } from '../services/LocalStorage';
import { SignInUser } from '../services/UsersService';
import { SignInAdmin } from '../services/AdminService';
import './Login.css';

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialRole = params.get("role") === "admin" ? "admin" : "user";

  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      let response;
      if (role === "admin") {
        response = await SignInAdmin(formData);
      } else {
        response = await SignInUser(formData);
      }

      if (response.data && response.data.jwt) {
        if (role === "admin") {
  localStorage.setItem("adminName", response.data.name || "Admin");
} else {
  localStorage.setItem("userEmail", response.data.email); // ✅ add this line
}

        storeToken(response.data.jwt);

        // ✅ Update for role handling
        if (role === "admin") {
          localStorage.setItem("adminName", response.data.name || "Admin");
        } else {
          localStorage.removeItem("adminName");
        }

        toast.success(`${role === "admin" ? "Admin" : "User"} login successful!`);
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      } else {
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className="login-page">
      <img src="/images/Library.avif" alt="Library Background" className="login-bg" />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <div className="text-center mb-4">
                  <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>
                  <div className="btn-group mb-4">
                    <Button
                      variant={role === "user" ? "primary" : "outline-primary"}
                      onClick={() => handleRoleChange("user")}
                    >
                      User Login
                    </Button>
                    <Button
                      variant={role === "admin" ? "primary" : "outline-primary"}
                      onClick={() => handleRoleChange("admin")}
                    >
                      Admin Login
                    </Button>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </div>
                  {role === "user" && (
                    <div className="text-center mt-3">
                      <p>
                        Don't have an account?{" "}
                        <a href="/signup">Register here</a>
                      </p>
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
// import React, { useState } from 'react';
// import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { storeToken } from '../services/LocalStorage';
// import { SignInUser } from '../services/UsersService';
// import { SignInAdmin } from '../services/AdminService';
// import './Login.css';

// const Login = () => {
//   // Get role from query param, default to user
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const initialRole = params.get("role") === "admin" ? "admin" : "user";

//   const [role, setRole] = useState(initialRole);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (newRole) => {
//     setRole(newRole);
//     setFormData({ email: "", password: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       toast.error("All fields are required");
//       return;
//     }
//     try {
//       let response;
//       if (role === "admin") {
//         response = await SignInAdmin(formData);
//         console.log("Login response", response.data);

//       } else {
//         response = await SignInUser(formData);
//         console.log("Login response", response.data);

//       }
//       if (response.data && response.data.jwt) {
//         console.log("Login response:", response.data);

//         storeToken(response.data.jwt);
//         toast.success(`${role === "admin" ? "Admin" : "User"} login successful!`);
//         navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
//       } else {
//         toast.error("Incorrect email or password");
//       }
//     } catch (error) {
//       toast.error("Incorrect email or password");
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card>
//             <Card.Body>
//               <div className="text-center mb-4">
//                 <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>
//                 <div className="btn-group mb-4">
//                   <Button
//                     variant={role === "user" ? "primary" : "outline-primary"}
//                     onClick={() => handleRoleChange("user")}
//                   >
//                     User Login
//                   </Button>
//                   <Button
//                     variant={role === "admin" ? "primary" : "outline-primary"}
//                     onClick={() => handleRoleChange("admin")}
//                   >
//                     Admin Login
//                   </Button>
//                 </div>
//               </div>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <div className="d-grid gap-2">
//                   <Button variant="primary" type="submit">
//                     Login
//                   </Button>
//                 </div>
//                 {role === "user" && (
//                   <div className="text-center mt-3">
//                     <p>
//                       Don't have an account?{" "}
//                       <a href="/signup">Register here</a>
//                     </p>
//                   </div>
//                 )}
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login; 