import React, {Component} from "react";
import logo from '../../images/logo.png';
import { TextField } from 'react-md';
import { Button } from 'react-md';

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

                    <a href="" className="logo center">
                        <Button flat tooltipLabel="Film aléatoire">
                            <img src={logo} alt="Logo Random Movie"/>
                        </Button>
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