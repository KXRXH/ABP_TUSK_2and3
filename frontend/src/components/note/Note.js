import React, {Component} from 'react'
import { Button, Table } from 'react-bootstrap';
import {API_ADDRESS, REQUEST_PATH, getDate} from '../../constants.js'
import { Nomenclature } from '../forms/Nomenclature.js';
import { Tariff } from '../forms/Tariff.js';
import { Payment } from '../forms/Payment.js';

const dateDelayOk = time => {
    let old = new Date(time);
    let now = new Date();
    return Math.abs(old - now) / 36e5 >= 24;
}
const currentDate = () => {
    return new Date().toISOString();
}
export class Note extends Component {
    constructor(props) {
        super(props)
        let d = new Date();
        this.state = {
            error: null,
			data: [],
            url: REQUEST_PATH[props.actionIndex].url,
            titles: REQUEST_PATH[props.actionIndex].titles,
            tariffID: this.props.tariffID,
            tariff: {},
            types: [],
            date: d.toISOString().split('T')[0],
        };
        this.getTypes();
        setInterval(() => this.Update(), 2000);
    }
	getTable() {
		if (this.props.actionIndex === 0) // Номенклатура
			return this.state.data.map(row => <tr>
				<td>{row.code}</td><td>{row.name}</td>
				<td>{row.Type ? row.Type.title : ""}</td>
				<td>{row.used ? "Да" : "Нет"}</td>
				<td>{getDate(row.start)}</td><td>{getDate(row.finish)}</td>
                {this.props.position < 3 ? 
                    <td><Button onClick={() => this.props.changeNomenclature(row)}>Изменить</Button></td> 
                    : null
                }
                {this.props.position === 1 ? 
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
                {(this.props.position < 3 && dateDelayOk(row.time)) ? <td><Button 
                        onClick={() => this.setState({tariffID: row.id, tariff: row})}>Изменить</Button></td> : null}
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
				<td>{row.coords}</td>
			</tr>)
		}
        if (this.props.actionIndex === 5) {
            return this.state.data.map(row => <tr>
                <td>{row.long}</td>
                <td>{row.time ? row.time.split('T')[0] : null}</td>
                <td>{row.User ? row.User.mail : null}</td>
                <td>{row.Product ? row.Product.name : null}</td>
                <td>{row.User ? row.User.Status.discount : null}</td>
                <td>{row.Product ? row.Product.Type.price : null}</td>
                <td>{row.sum}</td>
            </tr>)
        }
        if (this.props.actionIndex === 6) {
            return this.state.data.map(row => <tr>
                <td>{row.time ? row.time.split('T')[0] : row.time}</td>
                <td>{row.oldvalue}</td>
                <td>{row.newvalue}</td>
                <td>{this.getTypeById(row.type_id).title}</td>
            </tr>)
        }
       	}
    getTypeById(id) {
        for (let k = 0; k < this.state.types.length; ++k) {
            if (this.state.types[k].id == id) {
                return this.state.types[k];
            }
        }
        return {title: "f"}
    }
    Update() {
        if (this.props.actionIndex === 4 || this.props.actionIndex === 7) {
            return;
        } else {
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
    getTypes() {
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
    render() {
        if (this.props.actionIndex === 4) {
            if (this.props.isCreateNom) {
            return <Nomenclature 
                    onSubmit={() => this.props.changeAction(0)}
                    defaultId={this.props.nomToChangeId} isCreate={true}
                />
            }
            return <Nomenclature 
                    onSubmit={() => this.props.changeAction(0)}
                    defaultId={this.props.nomToChangeId} isCreate={false}
                    code={this.state.code} name={this.state.name}
            />
        } else if (this.props.actionIndex === 7) {
            return <Payment date={this.state.date} number="Следующий" />
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
        if (this.state.tariffID != -1) {
            return <Tariff date={Date().toString()} 
                    defaultId={this.state.tariffID} 
                    number={this.state.tariffID}
                    title={this.state.tariff.title}
                    oldValue={this.state.tariff.price}
                    onSubmit={newValue => {fetch(API_ADDRESS + "nomenclature_type/" + this.state.tariffID, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "time": currentDate(),
                                    "price": newValue
                                })
                            }).then(r => r.json()).then(r=>console.log(r), e=> console.log(e));
                            this.setState({tariff: {}, tariffID: -1})
                        }
                    }
                />
        }
        return (
            <Table striped bordered hover className="mb-3">
                <thead><tr>{titles}</tr></thead>
                <tbody>{this.getTable()}</tbody>
            </Table>
        );
    }
}
