import React from 'react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {UserTitle} from './user/UserTitle.js'

const Header = props => {
    //
    console.log(props.position)
    return (
        <Navbar bg="light" expand="sm">
            <Container className="menu">
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
                        <NavDropdown.Item onClick={() => props.callNote(2)}>Пользователи</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.callNote(3)}>Станции Аренды</NavDropdown.Item>
                    </NavDropdown>
                    {props.position < 2 ? <NavDropdown title="Эксплуатация товаров" id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={() => props.callNote(4)}>Ввод в эксплуатацию</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => props.callNote(5)}>Вывод из эксплуатации</NavDropdown.Item>
                    </NavDropdown> : null}
                    <NavDropdown title="Прайс и аренда">

                    </NavDropdown>
                    <UserTitle/>
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    )
}

export {Header};