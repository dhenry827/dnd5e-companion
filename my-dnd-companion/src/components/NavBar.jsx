import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
  return (
    <div id='navbar'>
      {/* <Link to='/'>Home</Link>
      <Link to='/characters'>Characters</Link>
      <Link to='/glossary/ability-scores'>Ability Scores</Link>
      <Link to='/glossary/skills'>Skills</Link>
      <div>
        <Link to='/glossary/classes/barbarian'>Barbarian</Link>
        <Link to='/glossary/classes/bard'>Bard</Link>
        <Link to='/glossary/classes/cleric'>Cleric</Link>
        <Link to='/glossary/classes/druid'>Druid</Link>
        <Link to='/glossary/classes/fighter'>Fighter</Link>
        <Link to='/glossary/classes/monk'>Monk</Link>
        <Link to='/glossary/classes/paladin'>Paladin</Link>
        <Link to='/glossary/classes/ranger'>Ranger</Link>
        <Link to='/glossary/classes/rogue'>Rogue</Link>
        <Link to='/glossary/classes/sorceror'>Sorceror</Link>
        <Link to='/glossary/classes/warlock'>Warlock</Link>
        <Link to='/glossary/classes/wizard'>Wizard</Link>
        <Link to='/glossary/spells'>Spells</Link>
      </div>
      <Link to='/glossary/races'>Races</Link> */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">PalaDjinn</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                Home
              </Nav.Link>
              <Nav.Link href="/characters">
                Characters
              </Nav.Link>
              <NavDropdown title="Classes" id="basic-nav-dropdown">
                <NavDropdown.Item href="/glossary/classes/barbarian">
                  Barbarian
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/bard">
                  Bard
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/cleric">
                  Cleric
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/druid">
                  Druid
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/fighter">
                  Fighter
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/monk">
                  Monk
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/paladin">
                  Paldin
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/ranger">
                  Ranger
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/rouge">
                  Rogue
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/sorceror">
                  Sorceror
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/warlock">
                  Warlock
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/classes/wizard">
                  Wizard
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Races" id="basic-nav-dropdown">
                <NavDropdown.Item href="/glossary/races/dragonborn">
                  Dragonborn
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/dwarf">
                  Dwarf
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/elf">
                  Elf
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/gnome">
                  Gnome
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/half-elf">
                  Half-Elf
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/half-orc">
                  Half-Orc
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/halfling">
                  Halfling
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/human">
                  Human
                </NavDropdown.Item>
                <NavDropdown.Item href="/glossary/races/tiefling">
                  Tiefling
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/glossary/spells">
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