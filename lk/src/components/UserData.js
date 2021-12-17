import React, {useState} from 'react'
import { Card, Container, Row, Col, Badge, Form, InputGroup } from 'react-bootstrap'
import { getBG, API_ADDRESS } from '../constants.js'
import './components.css'


function changeEmail(mail, id) {
    fetch(API_ADDRESS + "user/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "mail": mail,
        })
    }).then(res => res.json())
}

const UserData = props => {
    const [mail, setMail] = useState(props.user.mail);
    return (
        <Card className="Card mb-2" border="dark" text="dark">
            <Card.Header>Профиль</Card.Header>
            <Card.Body>
                <Row>
                    <Col className="mb-3">
                    Пользователь: {props.user.surname +" "+ props.user.name +" "+ props.user.lastname} 
                    </Col>
                    <Col className="mb-3">
                        Статус: {props.user.Status.title}
                    </Col>
                    <Col className="mb-3">Скидка: {props.user.Status.discount}</Col>
                    <Col className="mb-3">Бонусных баллов: {Math.floor(props.user.rent_time / 10)}</Col>
                </Row>
                <InputGroup>
                    <InputGroup.Text>Почта: </InputGroup.Text>
                    <Form.Control type="email" placeholder="Введите email" 
                        value={mail}
                        onChange={event => {changeEmail(event.target.value, props.user.id); setMail(event.target.value)}}
                    />
                </InputGroup>
            </Card.Body>
        </Card>
    )
}

export { UserData }