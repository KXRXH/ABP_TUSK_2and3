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
        fetch(API_ADDRESS + "login", {
			method: "POST", 
			body: {
				"email": event.target.mail.value, "password": event.target.password.value,
			}
		}).then(response => response.json()).then(
			result => {
                let tok = result.token;
                if (tok === "-1") {
                    this.props.setEmployeeToken(null);
                    this.setState({error: true});
                    return;
                }
                this.props.setEmployeeToken(result.token)
            },
			error => {this.props.setEmployeeToken(null); this.setState({error: true})}
		)
        alert(this.state.error)
    }
    render(){
        const informationAlert = this.state.error ? <Row>
                        <Col>
                            <Alert variant="danger">Неправильный логин или пароль</Alert>
                        </Col>
                    </Row> : <Alert variant="success">Успешно!</Alert>

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
                    {informationAlert}
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