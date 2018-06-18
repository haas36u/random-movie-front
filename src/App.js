import React, { Component } from 'react';
import './App.scss';

import { login } from './actions/auth';
import { connect } from 'react-redux';

class App extends Component {
  
  login = () => {
    this.props.login({username: 'junior', password: 'root'});
  };
}

const mapDispatchToProps = (dispatch) => ({
  login: ({username, password}) => dispatch(login({username, password}))
});

export default connect(undefined, mapDispatchToProps)(App);
