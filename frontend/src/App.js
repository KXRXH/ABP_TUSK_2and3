import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header.js'
import {Note} from './components/note/Note.js'
import {Login} from './components/forms/Login.js'

const API_ADDRESS = "http://localhost:3001/api/";

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTab: "users",
			employee: null,
			ePos: 100,
			actionIndex: 0,
		}
		this.callNote = this.callNote.bind(this);
	}
	callNote(paragraph) {
		this.setState({
			actionIndex: paragraph,
		})
	}
	render() {
		console.log(this.state.userToken)
		const bodyContent = (this.state.employee === null) ? 
			<Login setEmployee={u => this.setState({employee: u, ePos: u ? u.PositionId : null})}/> : 
			<Note actionIndex={this.state.actionIndex}/>
		return (
			<div className="App">
				<Header position={this.state.ePos} 
					title="ООО КОТЭ" callNote={this.callNote} userName="Иванов Иван Иванович" status="Admin"/>
				<body>
					{bodyContent}
				</body>
			</div>
		);
	}
}

export default App;
