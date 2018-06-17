import React, {Component} from "react";
import logo from '../../images/logo.png';
import { FontIcon, TextField } from 'react-md';

export default class Footer extends Component{
    render() {
        return (
            <header>
                <TextField id="search" placeholder="Rechercher" className="search" />
                <nav>
                    <ul className="nav_right">
                        <li><a href="">Séries</a></li>
                    </ul>
                    <ul className="nav_left">
                        <li><a href="">Films</a></li>
                    </ul>

                    <a href="" className="logo center tooltipped" data-position="bottom" data-tooltip="Film aléatoire">
                        <img src={logo} alt="Logo Random Movie"/>
                    </a>

                    <ul className="header_profile">
                        <li>
                            <a href={this.login}>
                                <span className="hide-on-med-and-down">Connexion</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
 }