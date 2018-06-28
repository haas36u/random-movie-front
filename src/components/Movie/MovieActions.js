import React, { Component } from 'react';
import { Button } from 'react-md';

export default class MovieActions extends Component {

    render() {

        const addToWishList = (e) => {
            e.stopPropagation();
           console.log('addToWishList')
        }

        const addToWatched = (e) => {
            e.stopPropagation();
            console.log('addToWatched')
        }

        const addToFavorite = (e) => {
            e.stopPropagation();
            console.log('addToFavorite')
        }
    
        return (
            <span className="movie-actions-container">
                <Button icon onClick={addToWishList} active={true} data-movie_id="1" tooltipLabel="Ajouter à vos favoris"><i className="fas fa-heart"></i></Button>
                <Button icon onClick={addToWatched}  active={true} data-movie_id="1" tooltipLabel="Ajouter aux films déjà vus"><i className="fas fa-eye"></i></Button>
                <Button icon onClick={addToWishList} active={true} data-movie_id="1" tooltipLabel="Ajouter à votre liste de film à voir"><i className="fas fa-plus-square"></i></Button>
            </span>
        );
    }
}