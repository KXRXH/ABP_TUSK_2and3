import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header.js'
import {Note} from './components/note/Note.js'
import {Table} from 'react-bootstrap'

const {app} = window.require('electron').remote;

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTab: "users",
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
		return (
			<div className="App">
				<Header title="ООО КОТЭ" callNote={this.callNote} userName="Иванов Иван Иванович" status="Admin"/>
				<body>
					<Note actionIndex={this.state.actionIndex}/>
				</body>
			</div>
		);
	}
}

export default App;
