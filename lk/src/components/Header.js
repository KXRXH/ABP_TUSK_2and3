import React from 'react'
import { Badge, Container, Navbar, Nav } from 'react-bootstrap'
import './components.css'
import { NOMENCLATURE_TAB, MY_TAB, getBG } from '../constants.js'


export default function Header(props) {
    return (
        <Navbar variant="dark" bg="dark">
            <Container>
            <Navbar.Brand >КОТЭ</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => props.openTab(NOMENCLATURE_TAB)}>Товары</Nav.Link>
                <Nav.Link onClick={() => props.openTab(MY_TAB)}>Корзина</Nav.Link>
            </Nav>
            </Container>
            <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {props.user.surname +" "+ props.user.name +" "+ props.user.lastname}<br/>
                    </Navbar.Text>
                    <Badge bg="dark">
                        <text className={getBG(props.user.Status.id)}>
                            {props.user.Status.title}
                        </text>
                    </Badge>
            </Navbar.Collapse>
        </Navbar>
    )
}
