import React, { Component } from 'react';
import axios from 'axios';
import { Avatar } from 'react-md';

import SocialItem from '../../components/Social/SocialItem';
import SocialItemComment from '../../components/Social/SocialItemComment';
import SocialItemLiked from '../../components/Social/SocialItemLiked';
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
            }
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
            favoriteMovie : {}
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
            }
        }

        if(!this.state) return <div>Loading...</div>
    
        return (
            <div id="social">
                <div className="socialContainer">
                    <div className="social__item--background userFollow">
                        <h2>Vous suivez...</h2>
                        <div>
                            <i className="fas fa-plus-circle"></i>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>

                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                            <div>
                                <Avatar src={avatar} role="presentation"/>
                                <p>François</p>
                            </div>
                        </div>
                    </div>

                    <SocialItem actuality={actuality} />
                    <SocialItem actuality={actualityLiked} />
                    <SocialItem actuality={actualityComment} />
                </div>
            </div>
        );
    }
}