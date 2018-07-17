import React, { Component } from 'react';
import { Avatar } from 'react-md';
import { Link } from 'react-router-dom';
import { logout, isAuthenticated, isAdmin } from '../../actions/auth';
var Trianglify = require('trianglify');

export default class Menu extends Component {

  render() {
    let userMenu;
    let adminLink;
    let avatar = require('../../images/avatar_default.jpg');
    let myPseudo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).username : null;

    const openNav = (e) => {
        e.stopPropagation();
        document.getElementById("sidenav").style.width = "340px";
    }

    const closeNav = (e) => {
        e.stopPropagation();
        document.getElementById("sidenav").style.width = "0";
    }

    if (isAuthenticated()) {
        userMenu = <li>
        <Avatar src={avatar} role="presentation" onClick={openNav}/>
        </li>
    } else {
        userMenu =  <li>
        <Link to="/login" onClick={closeNav}>
            <span>Connexion</span>
        </Link>
        </li>
    }

    //TODO isADMIN
    if (isAuthenticated() && isAdmin()){
        adminLink = (
            <Link to="/admin">
                <span>Administration</span>
            </Link>
        );
    } 

    let bgTriangle = {
        backgroundImage: 'url(' + Trianglify({ x_colors: 'Blues'}).png() + ')'
    }

    return (
        <span>
            <div id="sidenav" onClick={openNav}>
                <Link to="/profile" onClick={closeNav} className="sidenav_header background-trianglify" style={bgTriangle}>
                    <Avatar src={avatar} role="presentation" />
                    <p>{myPseudo}</p>
                </Link>
                <Link to="/social" onClick={closeNav}> <i className="far fa-newspaper"></i> Fils d'actualités</Link>
                <Link to="/movies" onClick={closeNav}><i className="material-icons md-xl">local_movies</i>Films</Link>
                <div className="line"></div>
                <p>Profil</p>
                <Link to="/profile" onClick={closeNav}><i className="material-icons md-xl">dashboard</i> Dashboard</Link>
                <Link to={{ pathname: '/profile', query: { tab: 1 } }} onClick={closeNav}><i className="fas fa-th-list"></i>Collections</Link>
                <Link to={{ pathname: '/profile', query: { tab: 2 } }} onClick={closeNav}><i className="fas fa-heart"></i>Favoris, déjà vus, à voir</Link>
                <Link to={{ pathname: '/profile', query: { tab: 3 } }} onClick={closeNav}><i className="fas fa-star-half-alt"></i>Notes</Link>
                <Link to={{ pathname: '/profile', query: { tab: 4 } }} onClick={closeNav}><i className="fas fa-comments"></i>Critiques</Link>
                <p className="cursor" onClick={logout}><i className="fas fa-sign-out-alt"></i>Se déconnecter</p>
            </div>
            <ul className="header_profile">
                {adminLink}
                {userMenu}     
            </ul>
        </span>
    );
  }
}