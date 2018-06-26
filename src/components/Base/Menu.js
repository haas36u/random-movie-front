import React, { Component } from 'react';
import { Button, DialogContainer, NavigationDrawer, SVGIcon } from 'react-md';
import { Link } from 'react-router-dom';
var Trianglify = require('trianglify');
var pattern = Trianglify({width: 200, height: 200})

export default class Menu extends Component {


  render() {
    const openNav = () => {
        document.getElementById("sidenav").style.width = "250px";
    }

    const closeNav = () => {
        document.getElementById("sidenav").style.width = "0";
    }

    let pattern = Trianglify({
        x_colors: 'Blues'
    });

    let triangle = pattern.png();

    let bgTriangle = {
        backgroundImage: 'url(' + triangle + ')'
    }

    return (
        <span>

        <div className="hello"></div>
            <div id="sidenav" style={bgTriangle}>
                <span className="closebtn" onClick={closeNav}>&times;</span>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
            <ul className="header_profile">
                <li>
                    <Link to="/login">
                        <span>Connexion</span>
                    </Link>
                </li>
                <li>

                    <span onClick={openNav}>open</span>
                </li>
            </ul>
        </span>
    );
  }
}