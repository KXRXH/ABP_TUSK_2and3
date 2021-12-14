import React, { Component } from 'react'
import {Button, Form, Row, Col, Card, InputGroup} from 'react-bootstrap'
import {API_ADDRESS} from '../../constants.js'
import './forms.css'

export class Tariff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeId: this.props.typeId,
            types: [],
            ok: true,
            value: this.props.oldValue,
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
        if (this.state.ok)
        this.props.onSubmit(this.state.value - 0);
        else
        this.props.onCancel();
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
                            <Form.Control onChange={e => this.setState({value: e.target.value})} 
                                    placeholder="Новый тариф" type="number" name="tariff" value={this.state.value}
                            />
                        </InputGroup>
                    </Row>
                </Card.Body>
                <Row>
                <Col><Button onClick={() => this.setState({ok: false})} type="submit" variant="dark">Отмена</Button></Col>
                <Col><Button type="submit" variant="primary">Изменить</Button></Col>
                </Row>
                </Form>
            </Card>
        )
    }
}