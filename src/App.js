import React, { Component } from 'react';
import './App.scss';

import { login } from './actions/auth';
import { connect } from 'react-redux';

import Header from './components/Base/Header';
import Footer from './components/Base/Footer';
import Homepage from './containers/Homepage';

class App extends Component {
  
  login = () => {
    this.props.login({username: 'junior', password: 'root'});
  };
  
  render() {
    
    return (
      <div className="wrapper">
        <Header></Header>
        <div className="main">
          <Homepage></Homepage>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: ({username, password}) => dispatch(login({username, password}))
});

export default connect(undefined, mapDispatchToProps)(App);
