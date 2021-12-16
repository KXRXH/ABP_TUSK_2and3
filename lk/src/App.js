import React, { Component } from 'react';
import logo from './logo.svg';
import { Login } from './Login.js'
import { Lk } from './Lk.js'
import { Header } from './components/Header.js'
import './App.css';

const API_ADDRESS = "http://localhost:3001/api/"
const {app} = window.require('electron').remote;

class App extends Component {
	constructor(props) {
		super(props);
			this.state = {
			user: null,
		}
		this.setUser = this.setUser.bind(this)
	}
	setUser(userLogin) {
		fetch(API_ADDRESS + "user/" + userLogin.ID)
		.then(res => res.json())
		.then(
			result => {
				this.setState({
					user: result.data
				})
			},
			error => {
				this.setState({
					user: null
				})
			}
		)
	}
	render() {
		return (
		<div className="App">
			{
			(this.state.user == null) ? 
				<Login setUser={this.setUser} />
				: <Header user={this.state.user}/> //<Lk user={this.state.user} />
			}
		</div>
		);
	}
}

export default App;
