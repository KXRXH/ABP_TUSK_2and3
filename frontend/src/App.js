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
			nomToChangeId: -1,
			isCreateNom: true,
		}
		this.callNote = this.callNote.bind(this);
		this.changeNomenclature = this.changeNomenclature.bind(this);
		this.changeAction = this.changeAction.bind(this);
	}
	callNote(paragraph) {
		this.setState({
			actionIndex: paragraph,
		})
	}
	changeNomenclature(id) {
		this.setState({
			actionIndex: 4, // magic number.
			isCreateNom: false,
			nomToChangeId: id,
		})
	}
	deleteNomenclature(id) {
		fetch(API_ADDRESS + "nomenclature/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: {
				"id": id - 0,
			}
		})
	}
	changeAction(index) {
		this.setState({actionIndex: index, isCreateNom: false, nomToChangeId: -1});
	}
	render() {
		console.log(this.state.userToken)
		const bodyContent = (this.state.employee === null) ? 
			<Login setEmployee={u => this.setState({employee: u, ePos: u ? u.PositionId : 100})}/> : 
			<Note isCreateNom={this.state.isCreateNom} 
				nomToChangeId={this.state.nomToChangeId}
				changeNomenclature={this.changeNomenclature}
				deleteNomenclature={this.deleteNomenclature.bind(this)}
				actionIndex={this.state.actionIndex} 
				changeAction={this.changeAction}
				position={this.state.ePos}/>
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
