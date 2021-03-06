import React, {Component} from "react";
import { TextField } from 'react-md';
import { Link } from 'react-router-dom';

import Menu from './Menu';

export default class Footer extends Component{

    constructor(params){
        super(params);
        this.state = {};
    }

    handleChangeMovieTitle = (value) => {
        this.setState({movieTitle: value});
    }
    
    closeNav = (e) => {
        e.stopPropagation();
        document.getElementById("sidenav").style.width = "0";
    }
    
    render() {
        return (
            <header onClick={(e) => this.closeNav(e)}>
                <ul>
                    <li><Link to="/social">Fil d'actualités</Link></li>
                    <li><Link to="/movies">Les films</Link></li>
                </ul>
                <div className="searchContainer">
                    <TextField id="search" placeholder="Rechercher" className="search" type="search" onChange={this.handleChangeMovieTitle}/>
                    <Link to={{ pathname: '/movies', query: { movieTitle: this.state.movieTitle } }} ><i className="fas fa-search"></i></Link>
                </div>
                <nav>
                    <Menu />
                </nav>
            </header>
        )
    }
 }