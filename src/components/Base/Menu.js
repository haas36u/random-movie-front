import React, { Component } from 'react';
import { Avatar } from 'react-md';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { logout, isAuthenticated } from '../../actions/auth';
var Trianglify = require('trianglify');

export default class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            nbNotifications: 0
        };
    }

    componentDidMount() {
        // TODO remettre à 5000
        if (isAuthenticated()) setInterval(this.getNotifications, 500000);
    }

    getNotifications = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/notifications/unseen`, headers : {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            this.setState({nbNotifications : response.data});
        });
    }

    openNav = (e) => {
        e.stopPropagation();
        document.getElementById("sidenav").style.width = "340px";
    }

    closeNav = (e) => {
        e.stopPropagation();
        document.getElementById("sidenav").style.width = "0";
    }

    render() {
        let userMenu;
        let notificationBell;
        let avatar = require('../../images/avatar_default.jpg');
        let myPseudo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).username : null;

        if(isAuthenticated()) {
            userMenu = (
            <li>
                <Avatar src={avatar} role="presentation" onClick={this.openNav}/>
            </li>);

            notificationBell = (
            <Link to="/notifications" className="notificationMenu">
                {this.state.nbNotifications > 0 &&
                    <div className="notificationMenu--pastille">
                        {this.state.nbNotifications}
                    </div>
                }
                <i className="fa fa-bell fa-fw"></i>
            </Link>);
        }else{
            userMenu =  <li>
            <Link to="/login" onClick={this.closeNav}>
                <span>Connexion</span>
            </Link>
            </li>
        }

        let bgTriangle = {
            backgroundImage: 'url(' + Trianglify({ x_colors: 'Blues'}).png() + ')'
        }

        return (
            <span>
                <div id="sidenav" onClick={this.openNav}>
                    <Link to="/profile" onClick={this.closeNav} className="sidenav_header background-trianglify" style={bgTriangle}>
                        <Avatar src={avatar} role="presentation" />
                        <p>{myPseudo}</p>
                    </Link>
                    <Link to="/social" onClick={this.closeNav}> <i className="far fa-newspaper"></i> Fils d'actualités</Link>
                    <Link to="/movies" onClick={this.closeNav}><i className="material-icons md-xl">local_movies</i>Films</Link>
                    <div className="line"></div>
                    <p>Profil</p>
                    <Link to="/profile" onClick={this.closeNav}><i className="material-icons md-xl">dashboard</i> Dashboard</Link>
                    <Link to={{ pathname: '/profile', query: { tab: 1 } }} onClick={this.closeNav}><i className="fas fa-th-list"></i>Collections</Link>
                    <Link to={{ pathname: '/profile', query: { tab: 2 } }} onClick={this.closeNav}><i className="fas fa-heart"></i>Favoris, déjà vus, à voir</Link>
                    <Link to={{ pathname: '/profile', query: { tab: 3 } }} onClick={this.closeNav}><i className="fas fa-star-half-alt"></i>Notes</Link>
                    <Link to={{ pathname: '/profile', query: { tab: 4 } }} onClick={this.closeNav}><i className="fas fa-comments"></i>Critiques</Link>
                    <p className="cursor" onClick={logout}><i className="fas fa-sign-out-alt"></i>Se déconnecter</p>
                </div>
                <ul className="header_profile">
                    {notificationBell}
                {userMenu}     
                </ul>
            </span>
        );
    }
}