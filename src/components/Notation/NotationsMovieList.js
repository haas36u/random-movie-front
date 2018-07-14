import React, { Component } from 'react';
import { Avatar } from 'react-md';
import { Link } from 'react-router-dom';

export default class NotationsMovieList extends Component {

    createStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if(this.props.notation.mark > i) stars.push(<i className="fas fa-star" key={i} style={{color: '#F0CC00'}}></i>);
            else stars.push(<i className="fas fa-star" style={{color: '#989898'}}></i>);
        }

        return stars;
    }

    render() {

        let avatar = require('../../images/avatar_default.jpg');

        return (
            <li className="commentsItem">
                <Avatar src={avatar} role="presentation" />
                <div className="commentsItem--content">
                    <p className="m-0">
                        <Link to={`/profile/${this.props.user.id}`} className="text-bold cursor">{this.props.user.username}</Link> a noté <Link to={`/movies/${this.props.notation.movie.id}`} className="text-bold cursor">{this.props.notation.movie.title}</Link>
                    </p>
                    <p>{this.createStars()}</p>
                </div>
            </li>
        );
    }
}