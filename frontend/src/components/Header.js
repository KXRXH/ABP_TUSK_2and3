import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {UserTitle} from './user/UserTitle.js'

const Header = props => {
    return (
        <Navbar className="App-header">
                <Navbar.Brand className="App-brand">
                    <img
                        src="/icon.png"
                        width="40px"
                        height="40px"
                    />
                    <div className="App-title">{props.title}</div>
                </Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="App-flex-btw"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                </Navbar.Collapse>
                        <UserTitle name={props.userName} status={props.status}/>
        </Navbar>
    )
}

export {Header};