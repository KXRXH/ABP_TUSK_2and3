import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {API_ADDRESS, REQUEST_PATH, getDate} from '../../constants.js'
import { Nomenclature } from '../forms/Nomenclature.js';

export class Note extends Component {
    constructor(props) {
        super(props)
		console.log("FF")
        this.state = {
            error: null,
            isLoaded: false,
			data: [],
            url: REQUEST_PATH[props.actionIndex].url,
            titles: REQUEST_PATH[props.actionIndex].titles,
        };
    }

    componentDidMount() {
        if (this.props.actionIndex > 3) {
            return;
        } else {
            console.log(this.props.actionIndex);
        fetch(REQUEST_PATH[this.props.actionIndex].url)
        .then(res => res.json())
        .then(
            (result) => {
                return this.setState({
                    isLoaded: true,
                    data: result.data,
                    titles: REQUEST_PATH[this.props.actionIndex].titles,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        }
    }
	getTable() {
		if (this.props.actionIndex === 0)
			return this.state.data.map(row => <tr>
				<td>{row.code}</td>
				<td>{row.name}</td>
				<td>{row.Type ? row.title : ""}</td>
				<td>{row.used ? "Да" : "Нет"}</td>
				<td>{getDate(row.start)}</td>
				<td>{getDate(row.finish)}</td>
                {this.props.position < 3 ? 
                    <td><Button onClick={() => this.props.changeNomenclature(row.id)}>Изменить</Button></td> 
                    : null
                }
                {this.props.position == 1 ? 
                    <td><Button>Удалить</Button></td> 
                    : null
                }
			</tr>)
		if (this.props.actionIndex === 1) {
			return this.state.data.map(row => <tr>
                <td>{row.time}</td>
                <td>{row.NomenclatureType ? row.NomenclatureType.title : null}</td>
                <td>{row.value}</td>
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
    render() {
        let renderContent;
        if (this.props.actionIndex === 4) {
            renderContent = <Nomenclature 
                    onSubmit={() => this.props.changeAction(0)} 
                    defaultId={this.props.nomToChangeId} 
                    isCreate={this.props.isCreateNom}
            />
        } else {
        renderContent = (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {this.state.titles.map(value => <th>{value}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.getTable()}
                </tbody>
            </Table>
        );
        }
        return renderContent
    }
}
