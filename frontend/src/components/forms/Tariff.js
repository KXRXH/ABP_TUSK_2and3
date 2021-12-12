import React, { Component } from 'react'
import {Button, Form, Row, Col, Card, Alert, InputGroup} from 'react-bootstrap'
import {API_ADDRESS} from '../../constants.js'
import './forms.css'

export class Tariff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: d.toISOString().split("T")[0],
            number: this.props.defaultId,
            typeId: this.props.typeId,
            types: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch(API_ADDRESS + "nomenclature_type").then(result => result.json())
        .then(
            result => {
                this.setState({types: result.data})
            },
            _ => {
                this.setState({types: [{id: 1, title: "title"}]})
            }
        );
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
                    Изменение тарифа
                </Card.Header>
                <Form onSubmit={this.handleSubmit}>
                <Card.Body>
                    <Row className="mb-3">
                        <Col>Дата: {this.props.date}</Col>
                        <Col>Номер: {this.props.number}</Col>
                    </Row>
                    <Row>
                        <Col>
                        Тип номенклатуры: {this.props.title}
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <InputGroup>
                        <InputGroup.Text>
                        Тариф:
                        </InputGroup.Text>
                            <Form.Control placeholder="Тариф" type="number" name="tariff"/>
                        </InputGroup>
                    </Row>
                </Card.Body>
                <Button type="submit" variant="primary">Изменить</Button>
                </Form>
            </Card>
        )
    }
}