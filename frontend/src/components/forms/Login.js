import React, { Component } from 'react'
import {Button, Form, Row, Col, Card, Alert} from 'react-bootstrap'
import {API_ADDRESS} from '../../constants.js'
import './forms.css'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false}
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.mail.value);
        console.log(event.target.password.value);
        fetch(API_ADDRESS + "login", {
			method: "POST", 
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: event.target.mail.value, password: event.target.password.value,
			})
		}).then(response => response.json()).then(
			result => {
                // Check success login
                if (result.message !== "ok") {
                    this.props.setEmployee(null);
                    this.setState({error: true});
                    alert("Ошибка доступа!")
                    return;
                }
                this.props.setEmployee(result.user)
            },
			error => {this.props.setEmployee(null); this.setState({error: true})}
		)
    }
    render(){
        return (
            <Card className="form">
                <Card.Header as="h5">
                    ООО "КОТЭ"
                </Card.Header>
                <Form onSubmit={this.handleSubmit}>
                <Card.Body>
                    <Row className="mb-3">
                            <Form.Control placeholder="E-Mail сотрудника" type="email" name="mail"/>
                    </Row>
                    <Row className="mb-1">
                            <Form.Control placeholder="Пароль" type="password" name="password"/>
                    </Row>
                </Card.Body>
                <Button type="submit" variant="primary">Войти</Button>
                </Form>
            </Card>
        )
    }
}