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

const request_path = {
    0: {"url": "http://localhost:3001/api/nomenclature", "titles": 
        ["Артикул", "Наименование", "Тип номенклатуры", "Используется", "Дата ввода в эксплуатацию", "Дата вывода из эксплуатации"]
    },
}

export class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            url: request_path[props.actionIndex]["url"],
            titles: request_path[props.actionIndex]["titles"]
        };
    }

    componentDidMount() {
        fetch(this.state.url)
      .then(res => res.json())
      .then(
        (result) => {
          return this.setState({
            isLoaded: true,
            data: result.data,
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
    render() {

        let rows = this.state.data.map(row => <tr>
            <td>{row.code}</td>
            <td>{row.name}</td>
            <td>{row.Type.title}</td>
            <td>{row.used ? "Да" : "Нет"}</td>
            <td>{getDate(row.start)}</td>
            <td>{getDate(row.finish)}</td>
        </tr>)
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {this.state.titles.map(value => <th>{value}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
}
