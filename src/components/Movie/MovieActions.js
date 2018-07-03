import React, { Component } from 'react';
import { Button } from 'react-md';
import { isLogin } from '../../actions/auth';
import axios from 'axios';

export default class MovieActions extends Component {

    movieSaveAction = (e, url) => {
        e.stopPropagation();

        axios({method: 'put', url: `${process.env.REACT_APP_API_URL}/movies/${this.props.movieId}/${url}`, headers: {"Authorization" : localStorage.getItem('token')} })
        .then((response) => {
            let elementClassList = document.getElementById(`js-${url}-` + this.props.movieId).classList;
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
            if(isLogin()) {
                return (
                    <span className="movie-actions-container">
                        <Button icon onClick={(e) => this.movieSaveAction(e, 'like')} tooltipLabel="Ajouter à vos favoris"><i className="fas fa-heart" id={'js-like-' + this.props.movieId}></i></Button>
                        <Button icon onClick={(e) => this.movieSaveAction(e, 'watch')}  tooltipLabel="Ajouter aux films déjà vus"><i className="fas fa-eye" id={'js-watch-' + this.props.movieId}></i></Button>
                        <Button icon onClick={(e) => this.movieSaveAction(e, 'wish')} tooltipLabel="Ajouter à votre liste de film à voir"><i className="material-icons" id={'js-wish-' + this.props.movieId}>playlist_add</i></Button>
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