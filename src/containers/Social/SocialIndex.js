import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Cell, Avatar } from 'react-md';

import SocialItem from '../../components/Social/SocialItem';
import SocialItemTableau from '../../components/Social/SocialItemTableau';

export default class SocialIndex extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }
    
    render() {

        let avatar = require('../../images/avatar_default.jpg');
        let actuality = {
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
          }
        let actualityLiked = {
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
        }

        let actualityComment = {
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

        if(!this.state) return <div>Loading...</div>
    
        return (
            <div id="social">
                <div className="socialContainer">
                    <div className="socialContainer__items">
                        <SocialItem actuality={actuality} />
                        <SocialItem actuality={actualityLiked} />
                        <SocialItem actuality={actualityComment} />
                    </div>

                    <div className="userFollow">
                        <h2>Vous suivez...</h2>
                        <div>
                            <div className="userFollow__user">
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div className="userFollow__user">
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div className="userFollow__user">
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div className="userFollow__user">
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div className="userFollow__user">
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <Link to="/" className="userFollow__user">
                                <i className="fas fa-plus-circle"></i>
                                <p>Ajouter un ami</p>
                            </Link>
                            <Link to="/">Voir la liste complète</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}