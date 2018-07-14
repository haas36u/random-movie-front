import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Cell, Avatar } from 'react-md';

import SocialItem from '../../components/Social/SocialItem';

export default class SocialIndex extends Component {

    constructor(props){
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            actualityList: [],
            followedUsers : []
        };
    }

    componentDidMount() {
        this.getActuality();
        this.getFollowedUsers();
    }

    getActuality = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/feeds`, headers : {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}})
        .then((response) => {
            const actualityList = response.data.map(function(item, key){
                return (
                    <SocialItem actuality={item} key={key} />
                )
            });

            this.setState({actualityList: actualityList});
        });
    }

    getFollowedUsers = () => {
        let avatar = require('../../images/avatar_default.jpg');

        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/users/follows`, headers : {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}})
        .then((response) => {
            const users = response.data.slice(0, 4);

            const followedUsers = users.map(function(user){
                return (
                    <div className="userFollow__user" key={user.id}>
                        <Avatar src={avatar} role="presentation"/>
                        <p>{user.username}</p>
                    </div>
                )
            });

            this.setState({followedUsers: followedUsers});
        });
    }
    
    render() {
        
        if(!this.state) return <div>Loading...</div>
    
        return (
            <div id="social">
                <div className="socialContainer">
                    <div className="socialContainer__items">
                        {this.state.actualityList}
                    </div>

                    <div className="userFollow">
                        <h2>Vous suivez...</h2>
                        <div>
                            {this.state.followedUsers}
                            
                            <Link to="/social/search" className="userFollow__user">
                                <i className="fas fa-plus-circle"></i>
                                <p>Chercher un abonné</p>
                            </Link>
                            <Link to="/social/users">Voir la liste complète</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}