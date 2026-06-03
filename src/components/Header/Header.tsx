import { Container, Nav, Navbar } from "react-bootstrap";
import { PeopleFill } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>

        <Navbar.Brand as={NavLink} to="/">
          <PeopleFill className="me-2" />
          | My Blog
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/contacts">Contacts</Nav.Link>
          <Nav.Link as={NavLink} to="/add">Add Contact</Nav.Link>
          <Nav.Link as={NavLink} to="/about">About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;