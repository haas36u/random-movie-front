import React, { Component } from 'react';
import axios from 'axios';
import { TextField } from 'react-md';
import SocialUserItem from '../../components/Social/SocialUserItem';

export default class SocialIndex extends Component {

    constructor(props){
        super(props);
        this.state = {
            followedUsers : [],
            username: null
        };
    }

    componentDidMount() {
        this.getFollowedUsers();
    }

    getFollowedUsers = () => {
        const users = [
            {
                id: 1,
                username: 'François',
                follow: true
            },
            {
                id: 2,
                username : 'Cedric',
                follow: true
            }
        ]

        const followedUsers = users.map(function(user, key){
            return (
                <SocialUserItem user={user} key={key}/>
            )
        });

        this.setState({followedUsers: followedUsers});
    }

    getUsersByUsername = () => {
        console.log(this.state.username)
        if(!this.state.username) return this.setState({followedUsers: <p className="noResult">Aucun résultat trouvé</p>});

        const users = [
            {
                id: 1,
                username: 'Thibault'
            },
            {
                id: 2,
                username : 'Antoine'
            }
        ]

        const followedUsers = users.map(function(user, key){
            return (
                <SocialUserItem user={user} key={key}/>
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

                    <h2><i className="fas fa-users"></i>Abonnements</h2>

                    <div className="searchContainer">
                        <TextField id="search" placeholder="Rechercher" className="search" type="search" onChange={this.handleChangeUsername}/>
                        <div onClick={this.getUsersByUsername} className="cursor"><i className="fas fa-search"></i></div>
                    </div>
                    {this.state.followedUsers}
                </div>
            </div>
        );
    }
}