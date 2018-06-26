import React, {Component} from "react";
import { TextField, Button } from 'react-md';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

export default class Footer extends Component{
    render() {
        return (
            <header>
                <TextField id="search" placeholder="Rechercher" className="search" type="search"/>
                <nav>
                    <ul className="nav_right">
                        <li><a href="">Séries</a></li>
                    </ul>
                    <ul className="nav_left">
                        <li><Link to="/movies">Films</Link></li>
                    </ul>

                    <a href="" className="logo center">
                        <Button flat tooltipLabel="Film aléatoire">
                            <img src={logo} alt="Logo Random Movie"/>
                        </Button>
                    </a>

                    <ul className="header_profile">
                        <li>
                            <Link to="/login">
                                <span>Connexion</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
 }