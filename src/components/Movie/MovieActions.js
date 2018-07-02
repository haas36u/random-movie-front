import React, { Component } from 'react';
import { Button } from 'react-md';
import { isLogin } from '../../actions/auth';

export default class MovieActions extends Component {

    render() {

        const addToWishList = (e) => {
            e.stopPropagation();
           console.log('addToWishList', this.props.movieId)
        }

        const addToWatched = (e) => {
            e.stopPropagation();
            console.log('addToWatched', this.props.movieId)
        }

        const addToFavorite = (e) => {
            e.stopPropagation();
            console.log('addToFavorite', this.props.movieId)
        }

        const movieActions = () => {
            if(isLogin()) {
                return (
                    <span className="movie-actions-container">
                        <Button icon onClick={addToFavorite} active={true} tooltipLabel="Ajouter à vos favoris"><i className="fas fa-heart"></i></Button>
                        <Button icon onClick={addToWatched}  active={true} tooltipLabel="Ajouter aux films déjà vus"><i className="fas fa-eye"></i></Button>
                        <Button icon onClick={addToWishList} active={true} tooltipLabel="Ajouter à votre liste de film à voir"><i className="material-icons">playlist_add</i></Button>
                    </span>
                )
            }
        }
    
        return (
            <div>
                {movieActions()}
           </div>
        );
    }
}