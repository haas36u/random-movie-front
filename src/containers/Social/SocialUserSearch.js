import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar, TextField } from 'react-md';

export default class SocialIndex extends Component {

    constructor(props){
        super(props);
        this.state = {
            followedUsers : [],
            username: null
        };
    }

    componentDidMount() {
    }

    getFollowedUsers = () => {
        console.log(this.state.username)
        if(!this.state.username) return this.setState({followedUsers: <p className="noResult">Aucun résultat trouvé</p>});

        let avatar = require('../../images/avatar_default.jpg');

        const users = [
            {
                id: 1,
                username: 'François'
            },
            {
                id: 2,
                username : 'Cedric'
            }
        ]

        const followedUsers = users.map(function(user, key){
            return (
                <div className="userFollow__user" key={key}>
                    <Avatar src={avatar} role="presentation"/>
                    <p>{user.username}</p>

                    <div className="btn">Suivre</div>
                </div>
            )
        });

        this.setState({followedUsers: followedUsers});
    }

    handleChangeUsername = (value) => {
        this.setState({username: value});
    }
    
    render() {
        
        if(!this.state) return <div>Loading...</div>
    
        return (
            <div id="social" className="socialUserSearch">
                <div className="socialContainer social__item--background">

                    <h2><i className="fas fa-users"></i>Chercher un abonné</h2>

                    <div className="searchContainer">
                        <TextField id="search" placeholder="Rechercher" className="search" type="search" onChange={this.handleChangeUsername}/>
                        <div onClick={this.getFollowedUsers} className="cursor"><i className="fas fa-search"></i></div>
                    </div>
                    {this.state.followedUsers}
                </div>
            </div>
        );
    }
}