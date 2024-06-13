import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
        <Navbar.Brand href="/">Todo</Navbar.Brand>
          <Nav>
            <LinkContainer to="/todo_lists">
              <Nav.Link>Todo's</Nav.Link>
            </LinkContainer>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar