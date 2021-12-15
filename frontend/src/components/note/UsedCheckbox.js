import React from 'react' 
import { FormCheck } from 'react-bootstrap'
import {API_ADDRESS} from '../../constants.js'

export class UsedCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value == 1
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        fetch(API_ADDRESS + "nomenclature/" + this.props.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify({
				"used": this.state.value ? "0" : "1" // Здесь надо инвертировать, все ок
			})
		})
		.then(r => r.json())
		.then(r=> console.log(r), e => {console.log(e)})
		this.setState({
			value: !this.state.value
		})
    }
    render() {
        return (
            <FormCheck type="checkbox" checked={this.state.value}
                onChange={this.handleChange}
            />
        )
    }
}