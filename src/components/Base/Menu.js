import React, { Component } from 'react';
import { Button, DialogContainer, NavigationDrawer, SVGIcon } from 'react-md';
import { Link } from 'react-router-dom';
var Trianglify = require('trianglify');
var pattern = Trianglify({width: 200, height: 200})

export default class Menu extends Component {


  render() {
    const openNav = () => {
        document.getElementById("sidenav").style.width = "340px";
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
            <div id="sidenav">
                <div className="sidenav_header" style={bgTriangle}>
                    <p>Myriam</p>
                    <p className="text-capitalize">haasmyriam@ytahoo.com</p>
                </div>
                <a href="#"><i className="fas fa-tv"></i> Séries</a>
                <a href="#"><i className="fas fa-film"></i>Films</a>
                <div class="line"></div>
                <p>Profil</p>
                <a href="#"><i className="fas fa-th-large"></i>Dashboard</a>
                <a href="#"><i className="fas fa-th-list"></i>Progression</a>
                <a href="#"><i className="fas fa-heart"></i>Favoris, déjà vus, à voir</a>
                <a href="#"><i className="fas fa-comments"></i>Notes et critiques</a>
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