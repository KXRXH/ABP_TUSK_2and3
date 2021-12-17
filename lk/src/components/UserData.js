import React from 'react'
import { Card, Container, Row, Col, Badge, InputGroup } from 'react-bootstrap'
import { getBG } from '../constants.js'
import './components.css'

const UserData = props => {
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
            </Card.Body>
        </Card>
    )
}

export { UserData }