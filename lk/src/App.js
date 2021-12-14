import React, { Component } from 'react';
import logo from './logo.svg';
import { Login } from './Login.js'
import { Lk } from './Lk.js'
import './App.css';

const {app} = window.require('electron').remote;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  render() {
    return (
      <div className="App">
        {
          (this.state.user == null) ? 
            <Login setUser={u => this.setState({user: u})} />
            : <Lk user={this.state.user} />
        }
      </div>
    );
  }
}

export default App;
