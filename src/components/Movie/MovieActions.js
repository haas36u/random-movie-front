import React, { Component } from 'react';
import { Button } from 'react-md';
import { isAuthenticated } from '../../actions/auth';
import axios from 'axios';

export default class MovieActions extends Component {

    movieSaveAction = (e, url) => {
        e.stopPropagation();

        axios({method: 'put', url: `${process.env.REACT_APP_API_URL}/movies/${this.props.movie.id}/${url}`, headers: {"Authorization" : localStorage.getItem('token')} })
        .then((response) => {
            let elementClassList = document.getElementById(`js-${url}-` + this.props.movie.id).classList;
            if(elementClassList.contains('active')) {
                elementClassList.remove('active');
            }else{
                elementClassList.add('active');
            }  
        })
        .catch(error => {
            console.log(error)
        });
    }

    render() {
        const movieActions = () => {
            if(isAuthenticated()) {

                let favoriteClass = this.props.userActions && this.props.userActions.liked ? 'fas fa-heart active' : 'fas fa-heart';

                let watchedClass  = this.props.userActions && this.props.userActions.watched ? 'fas fa-eye active' : 'fas fa-eye';
                
                let wishedClass   = this.props.userActions && this.props.userActions.wished ? 'material-icons active' : 'material-icons';

                let pinClass      = this.props.userActions && this.props.userActions.pin ? 'fas fa-thumbtack active' : 'fas fa-thumbtack';

                return (
                    <span className="movie-actions-container">
                        <Button icon onClick={(e) => this.movieSaveAction(e, 'like')} tooltipLabel="Ajouter à vos favoris">
                            <i className={favoriteClass} id={'js-like-' + this.props.movie.id}></i>
                        </Button>
                        <Button icon onClick={(e) => this.movieSaveAction(e, 'watch')}  tooltipLabel="Ajouter aux films déjà vus">
                            <i className={watchedClass} id={'js-watch-' + this.props.movie.id}></i>
                        </Button>
                        <Button icon onClick={(e) => this.movieSaveAction(e, 'wish')} tooltipLabel="Ajouter à votre liste de film à voir">
                            <i className={wishedClass} id={'js-wish-' + this.props.movie.id}>playlist_add</i>
                        </Button>
                        <Button icon onClick={(e) => this.props.openCollectionAddMovieModal(e, this.props.movie)} tooltipLabel="Ajouter à une collection">
                            <i className={pinClass}  id={'js-pin-' + this.props.movie.id}></i>
                        </Button>
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