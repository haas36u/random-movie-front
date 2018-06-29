import React, {Component} from "react";
import { TextField } from 'react-md';
import { Link } from 'react-router-dom';

import Menu from './Menu';

export default class Footer extends Component{
    render() {
        return (
            <header>
                <ul>
                    <li>Fil d'actu</li>
                    <li><Link to="/movies">Les films</Link></li>
                </ul>
                <div className="flex">
                    <TextField id="search" placeholder="Rechercher" className="search" type="search"/>
                    <button type="submit"><i className="fas fa-search"></i></button>
                </div>
                <nav>
                    <Menu />
                </nav>
            </header>
        )
    }
 }