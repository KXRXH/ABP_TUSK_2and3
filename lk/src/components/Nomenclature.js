import React, { Component } from 'react'
import {Table} from "react-bootstrap"
import './components.css'
import { API_ADDRESS } from '../constants.js'

export class Nomenclature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        fetch(API_ADDRESS + "available_nomenclature")
        .then(res => res.json())
        .then(result => this.setState({data: result.data}), _=>{console.log("some error"); this.setState({data: []})})
    }
    render() {
        return (
            <div className="Card">
                <Table striped bordered hover className="mb-3">
                    <thead>
                        <th>Наименование</th>
                        <th>Тип</th>
                    </thead>
                    <tbody>{this.state.data.map(row => <tr onClick={() => alert(row.id)}>
                        <td>{row.name}</td>
                        <td>{row.Type.title}</td>
                    </tr>)}</tbody>

                </Table>
            </div>
        )
    }
}
