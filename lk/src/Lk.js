import React, { Component } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import './Login.css'

const API_ADDRESS = "http://localhost:3001/api/"

export class Lk extends Component{
	constructor(props) {
		super(props);
		console.log(this.props.user)
		this.state = {
			mailing: this.props.user.Mailing == 1,
			email: this.props.user.Mail,
		}
		this.changeMailing = this.changeMailing.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
	}
	changeEmail(mail) {
		fetch(API_ADDRESS + "user/" + this.props.user.ID, {
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
	changeMailing() {
		fetch(API_ADDRESS + "user/" + this.props.user.ID, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify({
				"mailing": this.state.mailing ? "0" : "1"
			})
		})
		.then(r => r.json())
		.then(r=> console.log(r), _=> {})
		this.setState({
			mailing: !this.state.mailing
		})

	}
	render() {
		return (
			<Form id="mainform" className="mb-3 Form">
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email адрес</Form.Label>
					<Form.Control type="email" placeholder="Введите email" 
						value={this.state.email}
						onChange={event => this.changeEmail(event.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3 mailing">
					<InputGroup>
						<InputGroup.Text>Рассылка</InputGroup.Text>
						<InputGroup.Text>
						<Form.Check type="checkbox" checked={this.state.mailing}
							onChange={this.changeMailing}
						/>
						</InputGroup.Text>
					</InputGroup>
				</Form.Group>
			</Form>
		)
	}
}