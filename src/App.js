import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.scss';

import { login } from './actions/auth';
import { connect } from 'react-redux';

import Footer from './components/Base/Footer'

class App extends Component {
  
  login = () => {
    this.props.login({username: 'junior', password: 'root'});
  };
  
  render() {
    
    return (
      <div>
        <header className="App-header navbar-fixed">
          <nav>
            <div className="nav-wrapper">
                <ul className="hide-on-med-and-down brand_nav_right">
                    <li><a href="">Accueil</a></li>
                </ul>
                <ul className="hide-on-med-and-down brand_nav_left">
                    <li><a href="">Films</a></li>
                </ul>

                <a href="" className="brand-logo center tooltipped" data-position="bottom" data-tooltip="Film aléatoire">
                    <img src={logo} alt="Logo Random Movie"/>
                </a>

                  <ul className="right hide-on-med-and-down">
                    <li>
                        <a href={this.login}>
                            <i className="material-icons hide-on-large-only">account_circle</i>
                            <span className="hide-on-med-and-down">Connexion</span>
                        </a>
                    </li>
                </ul>
            </div>
          </nav>
        </header>
        <div className="App">
        
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
