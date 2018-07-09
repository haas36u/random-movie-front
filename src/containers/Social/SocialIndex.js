import React, { Component } from 'react';
import axios from 'axios';
import { Avatar } from 'react-md';

import MovieCard from '../../components/Movie/MovieCard';

export default class SocialIndex extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }
    
    render() {

        let avatar = require('../../images/avatar_default.jpg');
        let movie= {
            "id": 272,
            "title": "Batman Begins",
            "cover": "https://image.tmdb.org/t/p/w500/zfVFOo2XCHbeA0mXbst42TAGhfC.jpg",
            "releasedAt": "2005-06-10T00:00:00+02:00"
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

                    <div className="social__item social__item--background">
                        <div className="social__item__header">
                            <Avatar src={avatar} role="presentation" />
                            <div>
                                <p className="m-0"><span className="text-bold">Alexandre</span> a aimé le film : <span className="text-bold">Jurassic Park</span></p>
                                <p>3 h</p>
                            </div>
                        </div>
                        <div className="social__item__content">
                            <MovieCard movie={movie} />
                        </div>
                    </div>

                    <div className="social__item social__item--background">
                        <div className="social__item__header">
                            <Avatar src={avatar} role="presentation" />
                            <div>
                                <p className="m-0"><span className="text-bold">Yoann</span> a commenté le film : <span className="text-bold">Jurassic Park</span></p>
                                <p>3 h</p>
                            </div>
                        </div>
                        <div className="social__item__content">
                            <p>C'est film est une vraie perle !!!</p>
                            <MovieCard movie={movie} />
                        </div>
                    </div>

                    <div className="social__item social__item--background">
                        <div className="social__item__header">
                            <Avatar src={avatar} role="presentation" />
                            <div>
                                <p className="m-0"><span className="text-bold">Yoann</span> a noté le film : <span className="text-bold">Jurassic Park</span></p>
                                <p>3 h</p>
                            </div>
                        </div>
                        <div className="social__item__content">
                            <MovieCard movie={movie} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}