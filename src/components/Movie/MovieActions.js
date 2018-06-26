import React, { Component } from 'react';
import { Button } from 'react-md';

export default class MovieActions extends Component {

    render() {
    
        return (
            <span>
                <Button icon className="addToWishList" active={true} data-movie_id="1" tooltipLabel="Ajouter à vos favoris"><i className="fas fa-heart"></i></Button>
                <Button icon className="addToWishList" active={true} data-movie_id="1" tooltipLabel="Ajouter aux films déjà vus"><i className="fas fa-eye"></i></Button>
                <Button icon className="addToWishList" active={true} data-movie_id="1" tooltipLabel="Ajouter à votre liste de film à voir"><i className="fas fa-plus-square"></i></Button>
            </span>
        );
    }
}