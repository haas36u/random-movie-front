import React, { Component } from 'react';
import { Avatar } from 'react-md';

export default class MovieCard extends Component {
    
    render() {

        let avatar    = require('../../images/avatar_default.jpg');
        let createdAt = new Date(this.props.comment.createdAt);

        return (
            <li className="collection-item">
                <Avatar src={avatar} role="presentation" />
                <div className="collection-item-content">
                    <p className="m-0 text-bold">Par {this.props.comment.user.username}, le {new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(createdAt)}</p>
                
                    <p>{this.props.comment.content}</p>
                    <span className="right cursor">
                        Signaler le commentaire
                    </span>
                </div>
            </li>
        );
    }
}