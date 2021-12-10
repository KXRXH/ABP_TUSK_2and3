import React from 'react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {UserTitle} from './user/UserTitle.js'

const Header = props => {
    //
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>{props.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <NavDropdown title="Справочная" id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={() => props.callNote(0)}>Номенклатура</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.callNote(1)}>Тарифы</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.callNote(2)}>Станции Аренды</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                    Link
                    </Nav.Link>
                    <UserTitle/>
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    )
}

export {Header};