import React, { Component } from 'react'
import { Button, Form, InputGroup, Card } from 'react-bootstrap'
import './forms.css'

const API_ADDRESS = "http://localhost:3001/api/"

export class MailingForm extends Component{
	constructor(props) {
		super(props);
		this.state = {
			mailing: this.props.employee.Mailing == 1,
			email: this.props.employee.Mail,
		}
		this.changeEmail = this.changeEmail.bind(this);
		this.submit = this.submit.bind(this);
		this.sendStatistic = this.sendStatistic.bind(this);
	}
	changeEmail(mail) {
		fetch(API_ADDRESS + "employee/" + this.props.employee.ID, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"mail": mail,
			})
		}).then(res => res.json())
		this.setState({
			email: mail,
		})
	}
	submit(event) {
		event.preventDefault();
		fetch(API_ADDRESS + "statistic", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": this.state.email,
			})
		})
	}
	sendStatistic() {
		fetch(API_ADDRESS + "user_stats/" + this.state.email)
	}
	render() {
		return (
            <Card className="form">
			<Form id="mainform" className="mb-3 Form">
                <Card.Header>
					<Form.Label>Email адрес</Form.Label>
                </Card.Header>
                <Card.Body>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Control type="email" placeholder="Введите email" 
						value={this.state.email}
						onChange={event => this.changeEmail(event.target.value)}
					/>
				</Form.Group>

                </Card.Body>
				<Button onClick={this.sendStatistic}>Отчет по пользователям</Button>
				<Button onClick={this.submit}>Отчет о работе системе</Button>
			</Form>
		</Card>
        )
	}
}