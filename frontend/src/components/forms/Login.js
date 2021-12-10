import React, { Component } from 'react'
import {Button, Form, Row, Col, Card} from 'react-bootstrap'
import './forms.css'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.login(event.target.mail.value, event.target.password.value);
    }
    render(){
        return (
            <Card className="form">
                <Card.Header as="h5">
                    ООО "КОТЭ"
                </Card.Header>
                <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Control placeholder="E-Mail сотрудника" type="email" name="mail"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control placeholder="Пароль" type="password" name="password"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" className="mb-2" variant="primary">Войти</Button>
                        </Col>
                    </Row>
                </Form>
                </Card.Body>
            </Card>
        )
    }
}