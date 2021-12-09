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
		}
	}
	render() {
		return (
			<div className="App">
				<Header title="ООО КОТЭ" userName="Иванов Иван Иванович" status="Admin"/>
				<body>
					<Note actionIndex={0}></Note>
				</body>
			</div>
		);
	}
}

export default App;
