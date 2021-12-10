import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header.js'
import {Note} from './components/note/Note.js'
import {Login} from './components/forms/Login.js'


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTab: "users",
			userToken: null,
			actionIndex: 0,
		}
		this.callNote = this.callNote.bind(this);
		this.login = this.login.bind(this);
		alert("constructor")
	}
	callNote(paragraph) {
		this.setState({
			actionIndex: paragraph,
		})
	}
	login(mail, password) {
		console.log(mail)
		console.log(password)
		// login check
		this.setState({
			userToken: '',
		})

	}
	render() {
		const bodyContent = (this.state.userToken === null) ? <Login login={this.login}/> : <Note actionIndex={this.state.actionIndex}/>
		return (
			<div className="App">
				<Header title="ООО КОТЭ" callNote={this.callNote} userName="Иванов Иван Иванович" status="Admin"/>
				<body>
					{bodyContent}
				</body>
			</div>
		);
	}
}

export default App;
