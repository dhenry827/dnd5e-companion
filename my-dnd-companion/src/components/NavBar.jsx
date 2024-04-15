import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
  return (
    <div id='navbar'>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* using 'as={Link}/to="/"', instead of 'href="/"' avoids page reload */}
          <Navbar.Brand as={Link} to="/">PalaDjinn</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/characters">
                Characters
              </Nav.Link>
              <NavDropdown title="Classes" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/glossary/classes/barbarian">
                  Barbarian
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/bard">
                  Bard
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/cleric">
                  Cleric
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/druid">
                  Druid
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/fighter">
                  Fighter
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/monk">
                  Monk
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/paladin">
                  Paldin
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/ranger">
                  Ranger
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/rouge">
                  Rogue
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/sorceror">
                  Sorceror
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/warlock">
                  Warlock
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/classes/wizard">
                  Wizard
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Races" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/glossary/races/dragonborn">
                  Dragonborn
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/dwarf">
                  Dwarf
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/elf">
                  Elf
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/gnome">
                  Gnome
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/half-elf">
                  Half-Elf
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/half-orc">
                  Half-Orc
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/halfling">
                  Halfling
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/human">
                  Human
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/glossary/races/tiefling">
                  Tiefling
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/glossary/spells">
                Spells
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar