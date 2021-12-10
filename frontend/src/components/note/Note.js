import React, {Component} from 'react'
import { Table } from 'react-bootstrap';


const getDate = (date_string) => {
    let date = new Date(date_string);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

const API_ADDRESS = "http://localhost:3001/api/"

const request_path = {
    0: {
        url: API_ADDRESS + "nomenclature", 
        titles: [
            "Артикул", "Наименование", "Тип номенклатуры", 
            "Используется", "Дата ввода в эксплуатацию", "Дата вывода из эксплуатации"
        ]
    },
    1: {
        url: API_ADDRESS + "price",
        titles: [
            "Дата последнего изменения", "Тип номенклатуры", "Тариф"
        ]
    },
    2: {
        url: API_ADDRESS + "base",
        titles: [
            "Номер", "Наименование", "Адрес", "Индекс", "Координата широта", "Координата долгота"
        ]
    }
}

export class Note extends Component {
    constructor(props) {
        super(props)
		console.log("FF")
        this.state = {
            error: null,
            isLoaded: false,
			data: [],
            url: request_path[props.actionIndex].url,
            titles: request_path[props.actionIndex].titles,
        };
    }

    componentDidUpdate() {
        fetch(request_path[this.props.actionIndex].url)
        .then(res => res.json())
        .then(
            (result) => {
            return this.setState({
                isLoaded: true,
                data: result.data,
				titles: request_path[this.props.actionIndex].titles,
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
	getTable() {
		if (this.props.actionIndex == 0)
			return this.state.data.map(row => <tr>
				<td>{row.code}</td>
				<td>{row.name}</td>
				<td>{row.Type.title}</td>
				<td>{row.used ? "Да" : "Нет"}</td>
				<td>{getDate(row.start)}</td>
				<td>{getDate(row.finish)}</td>
			</tr>)
		if (this.props.actionIndex == 1) {
			return this.state.data.map(row => <tr>
                <td>{row.time}</td>
                <td>{row.NomenclatureType.title}</td>
                <td>{row.value}</td>
            </tr>)
		}
		if (this.props.actionIndex == 2) {
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
        return (
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
}
