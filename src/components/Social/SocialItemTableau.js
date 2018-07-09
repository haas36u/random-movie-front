import React, { Component } from 'react';
import { Avatar } from 'react-md';
import MovieCard from '../../components/Movie/MovieCard';

export default class SocialItemTableau extends Component {

    render() {

        let avatar = require('../../images/avatar_default.jpg');

        return (
            <div className="social__item social__item--background">
                <div className="social__item__header">
                    <Avatar src={avatar} role="presentation" />
                    <div>
                        <p className="m-0"><span className="text-bold">Yoann</span> a partagé le tableau : <span className="text-bold">Mes films favoris</span></p>
                        <p>3 h</p>
                    </div>
                </div>
                <div className="social__item__content">
                </div>
            </div>
        );
    }
}