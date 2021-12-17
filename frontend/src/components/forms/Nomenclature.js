import React, { Component } from 'react'
import {Button, Form, Row, Card, InputGroup} from 'react-bootstrap'
import {API_ADDRESS, getCurrentDate} from '../../constants.js'
import './forms.css'

export class Nomenclature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: getCurrentDate(),
            finish: getCurrentDate(),
            number: this.props.defaultId,
            code: this.props.code,
            name: this.props.name,
            type: "0",
            types: [],
            typeId: 0,
        }
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        if (this.props.defaultId == -1)
            this.getId();
    }
    handleNumberChange(event) {this.setState({number: event.target.value})}
    handleDateChange(event) {this.setState({start: event.target.value})}
    handleCodeChange(event) {this.setState({code: event.target.value})}
    handleNameChange(event) {this.setState({name: event.target.value})}
    handleTypeChange(event) {this.setState({type: event.target.value})}
    getId() {
        fetch(API_ADDRESS + "nomenclatureId")
        .then(res => res.json())
        .then(result => this.setState({number: result.id + 1}))
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
    getType(id) {
        for (let k in this.state.types) {
            if (k.id === id) {
                return k.title;
            }
        }
        return ""
    }
    onSubmit() {
        if (this.props.isCreate) {
            fetch(API_ADDRESS + "nomenclature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "code": this.state.code,
                    "name": this.state.name,
                    "used": "1",
                    "in_use": "0",
                    "start": new Date(this.state.start).toISOString(),
                    "finish": new Date(this.state.finish).toISOString(),
                    "Type": {
                        "id": this.state.typeId - 0,
                        "title": this.getType(this.state.typeId - 0)
                    }
                })
            }).then(res => res.json()).then(r => console.log(r), e => console.log(e))
        } else {
            console.log("Number = ", this.state.number);
            fetch(API_ADDRESS + "nomenclature/" + "" + this.state.number, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "code": this.state.code,
                    "name": this.state.name,
                    "used": true,
                    /*"Type": {
                        "id": this.state.typeId -0,
                        "title": this.getType(this.state.typeId - 0)
                    } */

                })
            }).then(res => res.json()).then(r => console.log(r), e => console.log(e));
        }
        this.props.onSubmit();
    }
    render() {
        return (
            <Card className="form">
                <Card.Header as="h3">
                    {this.props.isCreate ? "Ввод в эксплуатацию" : "Изменить товар"}
                </Card.Header>
                <Form>
                <Card.Body>
                        <Row className="mb-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Дата Ввода</InputGroup.Text>
                                <Form.Control type="date" onChange={this.handleDateChange} value={this.state.start}/>
                                <InputGroup.Text>Дата вывода</InputGroup.Text>
                                <Form.Control 
                                    type="date" onChange={e => this.setState({finish: e.target.value})} 
                                    value={this.state.finish} 
                                />
                                                            </InputGroup>
                        </Row>
                        <Row>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Номер</InputGroup.Text>
                                <Form.Control type="text" value={this.state.number}/>
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
                                <Form.Control as="select" value={1} selected onChange={e => this.setState({typeId: e.target.value})}>
                                {this.state.types.map(value => {
                                    return <option value={value.id}>{value.title}</option>
                                })}
                                </Form.Control>
                            </InputGroup>
                         </Row>
                </Card.Body>
                <Button className="btn" onClick={this.onSubmit}>{this.props.isCreate ? "Создать" : "Изменить"}</Button>
                </Form>
           </Card>
        )
    }
}
