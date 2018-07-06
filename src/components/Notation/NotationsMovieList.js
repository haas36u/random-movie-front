import React, { Component } from 'react';
import { Avatar } from 'react-md';

export default class NotationsMovieList extends Component {

    createStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if(this.props.notation.mark > i) stars.push(<i className="fas fa-star" style={{color: '#F0CC00'}}></i>);
            else stars.push(<i className="fas fa-star" style={{color: '#989898'}}></i>);
        }

        return stars;
    }

    goToMovieShow = () => {
        window.location.href = '/movies/' + this.props.notation.movie.id;
    }

    render() {

        let avatar = require('../../images/avatar_default.jpg');

        return (
            <li className="commentsItem">
                <Avatar src={avatar} role="presentation" />
                <div className="commentsItem--content">
                    <p className="m-0 text-bold">{this.props.notation.user.username} a noté <span onClick={this.goToMovieShow}>{this.props.notation.movie.title}</span></p>
                
                    <p>{this.createStars()}</p>
                </div>
            </li>
        );
    }
}