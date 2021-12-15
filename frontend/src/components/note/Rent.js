import React from 'react'
import {Table} from 'react-bootstrap'


const Rent = props => {
    return (
        <Table striped bordered hover className="mb-3">
                <thead><tr>{props.titles}</tr></thead>
                <tbody>{props.data.map(row => <tr>
                    <td>{row.User ? row.User.surname + " " + row.User.name + " " + row.User.lastname : null}</td>
                    <td>{row.Base ? row.Base.name : null}</td>
                    <td>{row.Product ? row.Product.name : null}</td>
                </tr>)}</tbody>
        </Table>
    )
}