import { faGear, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const handleMouseEnter = (item :string) => { setHoveredItem(item) }
  const handleMouseLeave = () => { setHoveredItem(null) }

  return (
    <Navbar bg='primary' data-bs-theme='light'>
      <Container fluid>
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav>
            <LinkContainer to="/todo_lists">
              <Nav.Link onMouseEnter={ () => handleMouseEnter('todo') } onMouseLeave={ handleMouseLeave }>
                { hoveredItem === 'todo' ? 'Todo\'s' : <FontAwesomeIcon icon={ faListCheck } /> }
              </Nav.Link>
            </LinkContainer>
            <NavDropdown onMouseEnter={ () => handleMouseEnter('settings') }
                         onMouseLeave={ handleMouseLeave }
                         title={ hoveredItem === 'settings' ? 'Settings' : <FontAwesomeIcon icon={faGear} />} id='app-settings'>
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