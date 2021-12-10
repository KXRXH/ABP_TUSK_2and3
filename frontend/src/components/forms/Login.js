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
                let tok = result.token;
                console.log(result)
                if (tok === "-1") {
                    this.props.setEmployeeToken(null);
                    this.setState({error: true});
                    alert("Ошибка доступа!")
                    return;
                }
                this.props.setEmployeeToken(result.token)
            },
			error => {this.props.setEmployeeToken(null); this.setState({error: true})}
		)
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