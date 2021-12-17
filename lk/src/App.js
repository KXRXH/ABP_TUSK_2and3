import React, { Component } from 'react';
import logo from './logo.svg';
import { Login } from './Login.js'
import { Lk } from './Lk.js'
import Header from './components/Header.js'
import { Nomenclature } from './components/Nomenclature.js'
import { NOMENCLATURE_TAB, MY_TAB } from './constants.js'
import './App.css';
import { UserData } from './components/UserData';

const API_ADDRESS = "http://localhost:3001/api/"
const {app} = window.require('electron').remote;

class App extends Component {
	constructor(props) {
		super(props);
			this.state = {
			user: null,
			currentTab: NOMENCLATURE_TAB,
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
	openTab(tabIndex) {
		this.setState({
			currentTab: tabIndex
		})
	}
	render() {
		if (this.state.user == null) {
			return <Login setUser={this.setUser} />
		}
		let bdy;
		if (this.state.currentTab === NOMENCLATURE_TAB) {
			bdy = <Nomenclature className="Form"/>
		} else {
			bdy = <UserData user={this.state.user}
					/>
		}
		return (
			<div>
				<Header user={this.state.user} openTab={this.openTab.bind(this)} /> 
				{bdy}
			</div>
		);
	}
}

export default App;
