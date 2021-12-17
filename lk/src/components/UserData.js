import React from 'react'
import { Card, Container, Row, Col, Badge } from 'react-bootstrap'
import { getBG } from '../constants.js'

const UserData = props => {
    return (
        <Card className="Card mb-2" border="dark" text="dark">
            <Card.Header>О Профиле</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Container>
                            {props.user.surname +" "+ props.user.name +" "+ props.user.lastname} 
                        </Container>
                        <Container>
                            <Badge bg="dark">
                                <text className={getBG(props.user.Status.id)}>
                                    {props.user.Status.title}
                                </text>
                            </Badge>
                        </Container>
                        <Col>
                                <Row><Col>Скидка: </Col><Col>{props.user.Status.discount}</Col> </Row>
                        </Col>
                        <Col>
                                <Row><Col>Бонусных баллов: </Col><Col>{props.user.rent_time / 10}</Col></Row>
                        </Col>
                    </Row>
                    <Row></Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export { UserData }