import React, { Component } from 'react'
import './Login.css'


const API_ADDRESS = "http://localhost:3001/api/"


export class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			login: ""
		}
	}
  handleSubmit(event) {
			event.preventDefault();
			fetch(API_ADDRESS + "user_login", {
					method: "POST", 
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
									login: this.state.login,
							})
					}).then(response => response.json()).then(
							result => {
									// Check success login
									if (!result.message) {
											this.props.setUser(null);
											alert("Ошибка доступа!")
											return;
									}
									this.props.setUser(result.user)
							},
							error => {this.props.setUser(null); this.setState({error: true})}
			)
	}
 	render(){
		return(
			<div id="mainform" className="Form">
				<FormHeader title="Личный Кабинет" />
				<form onSubmit={this.handleSubmit.bind(this)}>
					<FormInput 
						description="Логин" placeholder="Введите ваш логин" 
						type="text" value={this.state.login} 
						onChange={event => this.setState({login: event.target.value})}
					/>
					<FormButton type="submit" title="Войти"/>
   				</form>
    		</div>
    	)
	}
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

const FormButton = props => (
  <div id="button" class="row">
    <button type={props.type}>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} 
			placeholder={props.placeholder} value={props.value} onChange={props.onChange}
		/>
  </div>  
);
