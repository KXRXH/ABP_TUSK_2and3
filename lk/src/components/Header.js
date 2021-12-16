import React from 'react'
import { Badge, Container, Navbar } from 'react-bootstrap'
import './components.css'

const HEADER_STYLE = {
    1: "VIP", 2: "USUAL", 3: "OFTEN", 4: "STANDART", 5: "NEW"
}

const getBG = status => {
    return HEADER_STYLE[status]
}

const Header = props => {
    console.log(props.user)
    return (
        <Navbar variant="dark" bg="dark">
            <Navbar.Brand><Container>КОТЭ</Container></Navbar.Brand>
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

export { Header };