import React, {Component} from "react";
import { TextField } from 'react-md';
import { Link } from 'react-router-dom';

import Menu from './Menu';

export default class Footer extends Component{

    handleChangeMovieTitle = (value) => {
        this.setState({movieTitle: value});
    }

    searchMovie = () => {
        console.log(this.state.movieTitle)
    }

    render() {
        return (
            <header>
                <ul>
                    <li>Fil d'actualités</li>
                    <li><Link to="/movies">Les films</Link></li>
                </ul>
                <div className="flex">
                    <TextField id="search" placeholder="Rechercher" className="search" type="search" onChange={this.handleChangeMovieTitle}/>
                    <button onClick={this.searchMovie}><i className="fas fa-search"></i></button>
                </div>
                <nav>
                    <Menu />
                </nav>
            </header>
        )
    }
 }