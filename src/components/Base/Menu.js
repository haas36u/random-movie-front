import React, { Component } from 'react';
import { Button, DialogContainer, NavigationDrawer, SVGIcon } from 'react-md';
import { Link } from 'react-router-dom';

export default class Menu extends Component {


  render() {
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}

    return (
        <span>
            <div id="mySidenav" class="sidenav">
                <span class="closebtn" onClick={closeNav}>&times;</span>
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