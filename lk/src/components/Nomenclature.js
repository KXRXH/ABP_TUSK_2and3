import React, { Component } from 'react'
import {Table, Card} from "react-bootstrap"
import './components.css'
import { API_ADDRESS, NOMENCLATURE_TAB, MY_TAB} from '../constants.js'

export class Nomenclature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        console.log(this.props.userId)
        this.update();
        setInterval(() => this.update(), 1000);
    }
    update() {
        if (this.props.tabIndex === NOMENCLATURE_TAB) {
            fetch(API_ADDRESS + "available_nomenclature")
            .then(res => res.json())
            .then(result => this.setState({data: result.data}), _=>{console.log("some error"); this.setState({data: []})})
        } else {
            console.log(this.props.userId)
            fetch(API_ADDRESS + "nomenclature_user/" + this.props.userId)
            .then(res => res.json())
            .then(result => this.setState({data: result.data}), e => {console.log(e)})
        }
    }
    handleClick(product) {
        if (this.props.tabIndex === NOMENCLATURE_TAB) {
            if (!window.confirm("Взять в аренду?")) {
                return
            }
            fetch(API_ADDRESS + "rent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user_id": this.props.userId - 0,
                    "product_id": product.id,
                    "BaseId": 1,
                    "is_start": true,
                })
            })
        } else {
            window.confirm("Вернуть товар?")
            fetch(API_ADDRESS + "rent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user_id": this.props.userId - 0,
                    "product_id": product.id - 0,
                    "BaseId": 1,
                    "is_start": false,
                })
            })
        }
    }
    render() {
        return (
            <Card className="Card" border="dark">
                <Card.Body>
                    <Table striped bordered hover className="mb-3">
                        <thead>
                            <th>Наименование</th>
                            <th>Тип</th>
                        </thead>
                        <tbody>{this.state.data.map(row => <tr onClick={() => this.handleClick(row)}>
                            <td>{row.name}</td>
                            <td>{row.Type.title}</td>
                        </tr>)}</tbody>

                    </Table>
                </Card.Body>
           </Card>
        )
    }
}
