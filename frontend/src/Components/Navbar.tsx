import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <Navbar bg='primary' data-bs-theme='light'>
      <Container fluid>
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav>
            <LinkContainer to="/todo_lists">
              <Nav.Link>Todo's</Nav.Link>
            </LinkContainer>
            <NavDropdown title='Settings' id='app-settings'>
              <LinkContainer to='/uoms'>
                <NavDropdown.Item as='span'>UOM</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar