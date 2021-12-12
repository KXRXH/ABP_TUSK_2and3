import React, { Component } from 'react'
import {Button, Form, Row, Col, Card, InputGroup} from 'react-bootstrap'
import {API_ADDRESS} from '../../constants.js'
import './forms.css'

export class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            products: [],
            productId: 0,
            product: {Type: {price: -1}},
            user: {},
            userId: 0,
            users: [],
            total: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch(API_ADDRESS + "nomenclature").then(result => result.json())
        .then(
            result => {
                this.setState({products: result.data, product: result.data[0]})
            },
            _ => {
            }
        );
        console.log(this.state.product)
        fetch(API_ADDRESS + "user").then(result => result.json())
        .then(
            result => {
                this.setState({users: result.data, user: result.data[0]})
            },
            _ => {
            }
        );
    }
   
    handleSubmit(event) {
        const d = new Date(this.state.date);
        const total = (this.state.time * this.state.product.Type.price) * (1 - this.state.user.Status.discount)
        event.preventDefault();
        fetch(API_ADDRESS + "payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "long": this.state.time - 0,
                "time": d,
                "User": this.state.user,
                "Product": this.state.product,
                "sum": this.state.total,
            })
        }).then(res => res.json()).then(r=>console.log(r), _=>{})
    }
    render(){
        return (
            <Card className="form">
                <Card.Header as="h5">
                    Оплата
                </Card.Header>
                <Form onSubmit={this.handleSubmit}>
                <Card.Body>
                    <Row className="mb-3">
                        <Col>Дата: {this.props.date}</Col>
                        <Col>Номер: {this.props.number}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            Пользватель:
                        </Col>
                        <Col>
                        <Form.Control as="select" 
                            onChange={e => this.setState({
                                    userId: e.target.value,
                                    user: this.state.users[e.target.value],
                                    total: (this.state.time * this.state.product.Type.price) * (1 - this.state.user.Status.discount)
                                })}>
                                {this.state.users.map((value, i) => {
                                    return <option value={i}>{value.surname + " " + value.name + " " + value.lastname}</option>
                                })}
                        </Form.Control></Col>
                    </Row>
                    <Row className="mb-3">
                                        </Row>
                    <Row className="mb-3">
                        <InputGroup className="mb3">
                        <InputGroup.Text>Время аренды: </InputGroup.Text>
                                <Form.Control type="number" value={this.state.time}
                                    onChange={e => this.setState({time: e.target.value,
                                    total: (e.target.value * this.state.product.Type.price) * (1 - this.state.user.Status.discount)
                                    })} 
                                    />
                        </InputGroup>
                        <Col>
                        <InputGroup className="mb3">
                        <InputGroup.Text>Товар: </InputGroup.Text>
                        <Form.Control as="select" 
                            onChange={e => this.setState({
                                    productId: e.target.value,
                                    product: this.state.products[e.target.value],
                                    total: (this.state.time * this.state.product.Type.price) * (1 - this.state.user.Status.discount)
                                })}>
                                {this.state.products.map((value, i) => {
                                    return <option value={i}>{value.name}</option>
                                })}
                        </Form.Control>
                                     </InputGroup>      </Col> </Row>
                    <Row className="mb-3">
                       <Col>
                                Скидка: {this.state.user.Status ? this.state.user.Status.discount : 0}%
                        </Col>

                        <Col>Тариф: {this.state.product.Type.price}</Col>
                    </Row>
                    <Row className="mb-3">
                        Итого:      {this.state.total}
                    </Row>
                </Card.Body>
                <Button type="submit" variant="primary">Внести</Button>
                </Form>
            </Card>
        )
    }
}