import React, { Component } from 'react';
import { Avatar } from 'react-md';

export default class CommentsIndex extends Component {

    
    render() {

        let avatar = require('../../images/avatar_default.jpg');

        const goToMovie = () => {
            window.location = '/movies/' + this.props.match.params.id;
        }
    
        return (
            <div class="container">
                <div class="comments_page">
                    <div class="btn" onClick={goToMovie}>Retour au film</div>
                    <h2 class="center">
                        <a href="">Deadpool</a>
                    </h2>
        
                    <h4>2 commentaires utilisateurs</h4>
                        <ul class="collection">
                            <li class="collection-item avatar">
                                <Avatar src={avatar} role="presentation" />
                                <div class="col l9">
                                    <p class="m-0 text-bold">Par Vincent, le 12/12/2017</p>
                                </div>
                                <p>C'était un super film, que se soit les images, la bande son etc</p>
                                <a href="" class="right black-text">
                                    Signaler le commentaire
                                </a>
                            </li>
                        </ul>
                </div>
            </div>
        );
    }
}