import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import { login } from './actions/auth';
import { connect } from 'react-redux';

class App extends Component {
  
  login = () => {
    this.props.login({username: 'junior', password: 'root'});
  };
  
  render() {
    
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.login}>Test</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: ({username, password}) => dispatch(login({username, password}))
});

export default connect(undefined, mapDispatchToProps)(App);
