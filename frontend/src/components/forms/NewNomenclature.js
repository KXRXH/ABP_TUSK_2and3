import React, { Component } from 'react'
import {Button, Form, Row, Col, Card, Alert, InputGroup} from 'react-bootstrap'
import {API_ADDRESS} from '../../constants.js'
import './forms.css'


export class NewNomenclature extends Component {
    constructor(props) {
        super(props);
        let d = new Date();
        console.log(d.toISOString())
        this.state = {
            date: d.toISOString().split("T")[0],
            number: "",
            code: "",
            name: "",
            type: "0",
            types: [],
            typeId: -1,
        }
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleNumberChange(event) {this.setState({number: event.target.value})}
    handleDateChange(event) {this.setState({date: event.target.value})}
    handleCodeChange(event) {this.setState({code: event.target.value})}
    handleNameChange(event) {this.setState({name: event.target.value})}
    handleTypeChange(event) {this.setState({type: event.target.value})}
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
    onSubmit() {
    }
    render() {
        return (
            <Card className="form">
                <Card.Header as="h3">
                    Ввод в эксплуатацию
                </Card.Header>
                <Form>
                <Card.Body>
                        <Row className="mb-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Дата</InputGroup.Text>
                                <Form.Control type="date" onChange={this.handleDateChange} value={this.state.date}/>
                                <InputGroup.Text>Номер</InputGroup.Text>
                                <Form.Control type="text" onChange={this.handleNumberChange} value={this.state.number}/>
                            </InputGroup>
                       </Row>
                        <Row className="mb-3">
                            <h5>Данные о новом товаре</h5>
                        </Row>
                        <Row className="mb-3">
                            <InputGroup class="mb-3">
                                <InputGroup.Text>Артикул</InputGroup.Text>
                                <Form.Control type="text" onChange={this.handleCodeChange} value={this.state.code} />
                                <InputGroup.Text>Наименование</InputGroup.Text>
                                <Form.Control type="text" onChange={this.handleNameChange} value={this.state.name} />
                            </InputGroup>
                        </Row>
                        <Row className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>Тип товара</InputGroup.Text>
                                <Form.Select onChange={e => this.setState({typeId: e.target.value})}>
                                {this.state.types.map(value => {
                                    return <option value={value.id}>{value.title}</option>
                                })}
                                </Form.Select>
                            </InputGroup>
                         </Row>
                </Card.Body>
                <Button onClick={this.onSubmit}>Создать</Button>
                </Form>
           </Card>
        )
    }
}
