import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {UserTitle} from './user/UserTitle.js'
import '../App.css'

const Header = props => {
	return (
		<Navbar className="Header" bg="light" expand="sm">
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
					{props.position === 1 ? 
						<NavDropdown.Item onClick={() => props.callNote(8)}>Статистика</NavDropdown.Item> : null
					}
				</NavDropdown>
				{props.position < 2 ? <NavDropdown title="Эксплуатация товаров" id="navbarScrollingDropdown">
					<NavDropdown.Item onClick={() => props.callNote(4)}>Ввод в эксплуатацию</NavDropdown.Item>
				</NavDropdown> : null}
				<NavDropdown title="Прайс и аренда">
					<NavDropdown.Item onClick={() => props.callNote(1)}>Тарифы</NavDropdown.Item>
					<NavDropdown.Item onClick={() => props.callNote(6)}>Изменения тарифов</NavDropdown.Item>
					<NavDropdown.Item onClick={() => props.callNote(5)}>Оплата</NavDropdown.Item>
					<NavDropdown.Item onClick={() => props.callNote(9)}>Начало аренды</NavDropdown.Item>
					<NavDropdown.Item onClick={() => props.callNote(10)}>Конец аренды</NavDropdown.Item>
					{(props.position === 3 || props.position === 1) ? <NavDropdown.Item 
									onClick={() => props.callNote(7)}>Добавить оплату</NavDropdown.Item> 
							: null}
				</NavDropdown>
				<UserTitle/>
			</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
	)
}

export {Header};
