import React, { Component } from 'react';
import { Avatar } from 'react-md';
import moment from 'moment';

export default class CommentMovieItem extends Component {
    
    render() {

        let avatar    = require('../../images/avatar_default.jpg');
        let createdAt = new Date(this.props.comment.createdAt);

        return (
            <li className="commentsItem">
                <Avatar src={avatar} role="presentation" />
                <div className="commentsItem--content">
                    <p className="m-0 text-bold">Par {this.props.user.username}, le {moment(createdAt).format("L")}</p>
                
                    <p>{this.props.comment.content}</p>
                    <span className="right cursor">
                        Signaler le commentaire
                    </span>
                </div>
            </li>
        );
    }
}