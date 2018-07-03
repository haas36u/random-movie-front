import React, { Component } from 'react';
import { Button } from 'react-md';
import { isLogin } from '../../actions/auth';
import axios from 'axios';

export default class MovieActions extends Component {

     addToFavorite = (e) => {
        e.stopPropagation();

        axios({method: 'put', url: `${process.env.REACT_APP_API_URL}/movies/${this.props.movieId}/like`, headers: {"Authorization" : localStorage.getItem('token')} })
        .then((response) => {
            let elementClassList = document.getElementById('js-favorite-' + this.props.movieId).classList;
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

    addToWatched = (e) => {
        e.stopPropagation();
        
        axios({method: 'put', url: `${process.env.REACT_APP_API_URL}/movies/${this.props.movieId}/watch`, headers: {"Authorization" : localStorage.getItem('token')} })
        .then((response) => {
            let elementClassList = document.getElementById('js-watch-' + this.props.movieId).classList;
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

    addToWishList = (e) => {
        e.stopPropagation();
       
        axios({method: 'put', url: `${process.env.REACT_APP_API_URL}/movies/${this.props.movieId}/wish`, headers: {"Authorization" : localStorage.getItem('token')} })
        .then((response) => {
            let elementClassList = document.getElementById('js-wish-' + this.props.movieId).classList;
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
                        <Button icon onClick={(e) => this.addToFavorite(e)} tooltipLabel="Ajouter à vos favoris"><i className="fas fa-heart" id={'js-favorite-' + this.props.movieId}></i></Button>
                        <Button icon onClick={(e) => this.addToWatched(e)}  tooltipLabel="Ajouter aux films déjà vus"><i className="fas fa-eye" id={'js-watch-' + this.props.movieId}></i></Button>
                        <Button icon onClick={(e) => this.addToWishList(e)} tooltipLabel="Ajouter à votre liste de film à voir"><i className="material-icons" id={'js-wish-' + this.props.movieId}>playlist_add</i></Button>
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