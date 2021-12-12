import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {API_ADDRESS, REQUEST_PATH, getDate} from '../../constants.js'
import { Nomenclature } from '../forms/Nomenclature.js';

export class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
			data: [],
            url: REQUEST_PATH[props.actionIndex].url,
            titles: REQUEST_PATH[props.actionIndex].titles,
        };
    }
    componentDidUpdate() {
        this.Update();
   }
	getTable() {
		if (this.props.actionIndex === 0) // Номенклатура
			return this.state.data.map(row => <tr>
				<td>{row.code}</td><td>{row.name}</td>
				<td>{row.Type ? row.Type.title : ""}</td>
				<td>{row.used ? "Да" : "Нет"}</td>
				<td>{getDate(row.start)}</td><td>{getDate(row.finish)}</td>
                {this.props.position < 3 ? 
                    <td><Button onClick={() => this.props.changeNomenclature(row.id)}>Изменить</Button></td> 
                    : null
                }
                {this.props.position == 1 ? 
                    <td><Button onClick={() => (window.confirm('Delete the item?')) ? this.props.deleteNomenclature(row.id) 
                    : null}>Удалить</Button></td> 
                    : null
                }
			</tr>)
		if (this.props.actionIndex === 1) {
            // Админ и 
			return this.state.data.map(row => <tr>
                <td>{row.title}</td>
                <td>{row.price}</td>
                {(this.props.position < 3) ? <td><Button>Изменить</Button></td> : null}
            </tr>)
		}
        if (this.props.actionIndex === 2) {
            return this.state.data.map(row => <tr>
                <td>{row.surname}</td>
                <td>{row.name}</td>
                <td>{row.lastname}</td>
                <td>{row.phone}</td>
                <td>{row.mail}</td>
                <td>{row.date}</td>
                <td>{row.Status ? row.Status.title : null}</td>
            </tr>)
        }
		if (this.props.actionIndex === 3) {
			return this.state.data.map(row => <tr>
				<td>{row.number}</td>
				<td>{row.name}</td>
				<td>{row.address}</td>
				<td>{row.index}</td>
				<td>{row.coords.split(' ')[0]}</td>
				<td>{row.coords.split(' ')[1]}</td>
			</tr>)
		}
	}
    Update() {
        if (this.props.actionIndex > 3) {
            return;
        } else {
            console.log(this.props.actionIndex);
            fetch(REQUEST_PATH[this.props.actionIndex].url)
            .then(res => res.json())
            .then(
                (result) => {
                    return this.setState({
                        data: result.data,
                        titles: REQUEST_PATH[this.props.actionIndex].titles,
                    });
                }, (error) => {}
                )
            }
    }
    render() {
        if (this.props.actionIndex === 4) {
            return <Nomenclature 
                    onSubmit={() => {this.Update(); this.props.changeAction(0)}}
                    defaultId={this.props.nomToChangeId} 
                    isCreate={this.props.isCreateNom}
            />
        }
        let titles = this.state.titles.map(value => <th>{value}</th>) 
        if (this.props.actionIndex === 0) {
            if (this.props.position < 3) {
                titles.push(<th>Изменить</th>);
                if (this.props.position === 1) {
                    titles.push(<th>Удалить</th>);
                }
            }
        } else if (this.props.actionIndex === 1) {
            if (this.props.position < 3) {
                titles.push(<th>Изменить</th>)
            }
        }
        return (
            <Table striped bordered hover className="mb-3">
                <thead><tr>{titles}</tr></thead>
                <tbody>{this.getTable()}</tbody>
            </Table>
        );
    }
}
