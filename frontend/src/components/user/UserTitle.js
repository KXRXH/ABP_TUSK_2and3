import React from 'react'
import { Nav } from 'react-bootstrap';
import './user.css'

const UserTitle = props => {
    return (
        <Nav.Link className="UserTitle">
            <div className="UserTitle-name">{props.name}</div>
            <div className="UserTitle-status">{props.status}</div>
        </Nav.Link>
    )
}

export {UserTitle};