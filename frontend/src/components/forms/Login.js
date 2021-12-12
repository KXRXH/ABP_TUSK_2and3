import React, { Component } from 'react'
import {Button, Form, Row, Card} from 'react-bootstrap'
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
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				login: event.target.mail.value, 
			})
		}).then(response => response.json()).then(
			result => {
                // Check success login
                if (!result.message) {
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
                            <Form.Control placeholder="Логин сотрудника" type="text" name="mail"/>
                    </Row>
                </Card.Body>
                <Button type="submit" variant="primary">Войти</Button>
                </Form>
            </Card>
        )
    }
}