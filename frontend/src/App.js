import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from './components/Header.js'

const {app} = window.require('electron').remote;

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTab: "users",
		}
	}
	render() {
		return (
			<div className="App">
				<Header title="ООО КОТЭ" userName="Иванов Иван Иванович" status="Admin"/>
				<body>

				</body>
			</div>
		);
	}
}

export default App;
