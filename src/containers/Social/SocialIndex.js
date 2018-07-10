import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Cell, Avatar } from 'react-md';

import SocialItem from '../../components/Social/SocialItem';
import SocialItemTableau from '../../components/Social/SocialItemTableau';

export default class SocialIndex extends Component {

    constructor(props){
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
        let actuality = [
            {
                movie : {
                    "id": 272,
                    "title": "Batman Begins",
                    "cover": "https://image.tmdb.org/t/p/w500/zfVFOo2XCHbeA0mXbst42TAGhfC.jpg",
                    "releasedAt": "2005-06-10T00:00:00+02:00"
                },
                user : {
                    "id": 0,
                    "username": "Thomas"
                },
                notation : {
                    mark: 4
                },
                createdAt : '2018-06-14T00:00:00+02:00'
            },
            {
                movie : {
                    "id": 272,
                    "title": "Batman Begins",
                    "cover": "https://image.tmdb.org/t/p/w500/zfVFOo2XCHbeA0mXbst42TAGhfC.jpg",
                    "releasedAt": "2005-06-10T00:00:00+02:00"
                },
                user : {
                    "id": 0,
                    "username": "Thomas"
                },
                favoriteMovie : {},
                createdAt : '2018-07-05T00:00:00+02:00'
            },
            {
                movie : {
                    "id": 272,
                    "title": "Batman Begins",
                    "cover": "https://image.tmdb.org/t/p/w500/zfVFOo2XCHbeA0mXbst42TAGhfC.jpg",
                    "releasedAt": "2005-06-10T00:00:00+02:00"
                },
                user : {
                    "id": 0,
                    "username": "Thomas"
                },
                comment : {
                    content : 'C\'était un super film !'
                },
                createdAt : '2018-06-14T00:00:00+02:00'
            }
        ]

        const actualityList = actuality.map(function(item, key){
            return (
                <SocialItem actuality={item} key={key} />
            )
        });

        this.setState({actualityList: actualityList})
    }

    getFollowedUsers = () => {

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

        const followedUsers = users.map(function(user){
            return (
                <div className="userFollow__user">
                    <Avatar src={avatar} role="presentation"/>
                    <p>{user.username}</p>
                </div>
            )
        });

        this.setState({followedUsers: followedUsers});
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
                                <p>Ajouter un ami</p>
                            </Link>
                            <Link to="/social/users">Voir la liste complète</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}