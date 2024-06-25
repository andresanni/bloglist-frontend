import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavBar = () => {
  const { user, logout } = useAuth();
  const { setNotification } = useNotification();

  const handleLogout = () => {
    logout();
    setNotification("Session closed", "success");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-secondary">
        <Container fluid>
          <Navbar.Brand className="fs-4 fw-bold ms-1 me-2">BlogPosts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className= "fs-6 fw-bold">
                Home
              </Nav.Link>
              {user.username ? (
                <Nav.Link as={Link} to="/create" className= "fs-6 fw-bold">
                  Create
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" className= "fs-6 fw-bold">
                  Login
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/list" className= "fs-6 fw-bold">
                List
              </Nav.Link>
              <Nav.Link as={Link} to="/users" className= "fs-6 fw-bold">
                Users
              </Nav.Link>
              </Nav>
              
              {user.username && (
                <Nav className=" ms-auto d-flex align-items-center ms-auto">
                  <Nav.Link as={Button} variant="secondary" onClick={handleLogout} className="me-3">Logout</Nav.Link>                  
                  <span>{user.username}</span>
                </Nav>
              )}
              
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
    </>
  );
};

export default NavBar;
