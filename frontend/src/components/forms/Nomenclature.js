import React, { Component } from 'react'
import {Button, Form, Row, Col, Card, InputGroup} from 'react-bootstrap'
import {API_ADDRESS} from '../../constants.js'
import './forms.css'


export class Nomenclature extends Component {
    constructor(props) {
        super(props);
        let d = new Date();
        console.log(d.toISOString())
        this.state = {
            date: d.toISOString().split("T")[0],
            number: this.props.defaultId,
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
    getType(id) {
        for (let k in this.state.types) {
            if (k.id == id) {
                return k;
            }
        }
        return {title: ""}
    }
    onSubmit() {
        if (this.props.isCreate) {
            fetch(API_ADDRESS + "nomenclature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: this.state.code,
                    name: this.state.name,
                    used: true,
                    Type: {
                        id: this.state.typeId,
                        title: this.getType(this.state.typeId)
                    }
                })
            }).then(res => res.json()).then(r => console.log(r), e => console.log(e))
        } else {
            fetch(API_ADDRESS + "nomenclature", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                })
            }) 
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
