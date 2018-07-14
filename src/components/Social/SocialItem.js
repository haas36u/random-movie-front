import React, { Component } from 'react';
import { Avatar } from 'react-md';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import MovieCard from '../../components/Movie/MovieCard';

export default class SocialItem extends Component {

    createStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if(this.props.actuality.notation.mark > i) stars.push(<i className="fas fa-star" key={i} style={{color: '#F0CC00'}}></i>);
            else stars.push(<i className="fas fa-star" style={{color: '#989898'}}></i>);
        }

        return stars;
    }

    render() {
        moment.locale('fr');

        let avatar = require('../../images/avatar_default.jpg');
        let userAction;
        let content;

       if (this.props.actuality.notation) {
            content = this.createStars();
            userAction = 'noté';
       } else if (this.props.actuality.comment) {
            content = this.props.actuality.comment.content;
            userAction = 'commenté';
       } else if (this.props.actuality.favoriteMovie) {
           userAction = 'aimé';
       }

        return (
            <div className="social__item social__item--background">
                <div className="social__item__header">
                    <Avatar src={avatar} role="presentation" />
                    <div>
                        <p className="m-0"><Link to={`/profile/${this.props.actuality.user.id}`} className="text-bold">{this.props.actuality.user.username}</Link> a {userAction} le film : <Link to={`/movies/${this.props.actuality.movie.id}`} className="text-bold">{this.props.actuality.movie.title}</Link></p>
                        <p>{moment(this.props.actuality.createdAt).startOf('day').fromNow()}</p>
                    </div>
                </div>
                <div className="social__item__content">
                    <p>{content}</p>
                    <MovieCard movie={this.props.actuality.movie} showUserAction={true}/>
                </div>
            </div>
        );
    }
}