import React, { Component } from 'react';
import { Avatar } from 'react-md';

export default class CommentsIndex extends Component {

    
    render() {

        let avatar = require('../../images/avatar_default.jpg');

        const goToMovie = () => {
            window.location = '/movies/' + this.props.match.params.id;
        }

        const comments = [
            {
                "content": "C'était un super film, que se soit les images, la bande son etc",
                "createdAt": "20/01/2017",
                "user": {
                "username": "Vincent"
                }
            },
            {
                "content": "C'était un super film, que se soit les images, la bande son etc",
                "createdAt": "21/02/2017",
                "user": {
                "username": "Yann"
                }
            }
        ]

        const commentsList = comments.map(function(item){
            return(
                <li className="collection-item avatar">
                    <Avatar src={avatar} role="presentation" />
                    <div className="collection-item-content">
                        <p className="m-0 text-bold">Par {item.user.username}, le {item.createdAt}</p>
                    
                        <p>{item.content}</p>
                        <span className="right cursor">
                            Signaler le commentaire
                        </span>
                    </div>
                </li>
            );
        });
    
        return (
            <div className="container comments_page">
                <div className="btn cursor" onClick={goToMovie}>Retour au film</div>
                <h2 className="center">Deadpool</h2>
    
                <h4>2 commentaires utilisateurs</h4>
                <ul>
                   {commentsList}
                </ul>
            </div>
        );
    }
}