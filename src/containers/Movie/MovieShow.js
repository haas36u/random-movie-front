import React, { Component } from 'react';
import { Grid, Cell } from 'react-md';

import ActorCard from '../../components/Actor/ActorCard';
import MovieCard from '../../components/Movie/MovieCard';
import MovieActions from '../../components/Movie/MovieActions';

import poster from '../../images/deadpool.jpg';
import actor from '../../images/ryan_reynolds.jpg';

export default class MovieShow extends Component {

    render() {

        var imgUrl = require('../../images/ryan_reynolds.jpg');
        var avatarComments = {
            backgroundImage: 'url(' + imgUrl + ')'
        }

        var actorList = [
            {"name": "Ryan Reynolds", "role" : "Deadpool", "img" : "http://fr.web.img6.acsta.net/c_215_290/pictures/16/02/09/12/32/028964.jpg"}, 
            {"name": "Josh Brolin", "role" : "Cable", "img" : "https://vignette.wikia.nocookie.net/6a24792d-ddfa-4ca5-82ab-78cb58c25ff8/scale-to-width-down/800"}
        ]

        var actorsList = actorList.map(function(item) {
            return (
                <Cell size={2}>
                    <ActorCard actor_img={actor} actor={item}/>
                </Cell>
            );
        });

        var movieSuggestionList = [
            {"title" : "Star wars", "released" : "22/01/2018", "url" : 'https://images-na.ssl-images-amazon.com/images/I/71c-O3GaxLL._SY450_.jpg'},
            {"title" : "Star wars", "released" : "22/01/2018", "url" : require('../../images/deadpool.jpg')},
            {"title" : "Star wars", "released" : "22/01/2018", "url" : require('../../images/deadpool.jpg')}
        ]

        var suggestionList = movieSuggestionList.map(function(item){
            return(
                <MovieCard movie={item} />
            );
        });
    
        return (
            <div id="movieShow">
                <div id="movie-container">
                    <div className="container">
                        <Grid>
                            <Cell size={4}><img src={poster} alt="Poster deadpool"/></Cell>
                            <Cell size={8}>
                                <Grid>
                                    <Cell size={6} id="movie-container_infos">
                                        <h1>Deadpool</h1>
                                        <p><span className="text-bold">Date de sortie :</span>22/12/2018</p>
                                        <p><span className="text-bold">Durée :</span>120 min</p>
                                        <p><span className="text-bold">Genres :</span> Aventure | Humour</p>
                                        <p><span className="text-bold">Langue originale :</span> Anglais</p>
                                        <p className="public_rate">Spectateurs</p>
                                        <div>
                                            <span>Aucune note pour ce film</span>
                                        </div>
                                    </Cell>
                                    <Cell size={6} className="mt-0">
                                        <a href="{{ path('movie_random') }}" className="btn"> <i className="fas fa-random"></i>Film aléatoire</a>
                                        <MovieActions />
                                    </Cell>
                                    <Cell size={12}>
                                        <h5>Synopsis et détails</h5>
                                        <p>Le super descriptif du film</p>
                                        <Grid className="p-0">
                                            <Cell size={6} className="ml-0">
                                                <div className="text-bold">Votre note</div>
                                                <div id="movie-rating" data-movie_id="1" data-rate="1"></div>
                                            </Cell>
                                            <Cell size={6}>
                                                <a data-movie_id="1" className="btn" href="">
                                                    <i className="fas fa-edit"></i>Ajouter un commentaire
                                                </a>
                                            </Cell>
                                        </Grid>
                                    </Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </div>
                </div>

                <div className="container" id="actors-container">
                    <h4>Acteurs</h4>
                    <Grid className="p-0">
                        {actorsList}
                    </Grid>
                </div>

                <div id="comments-container">
                    <div className="container">
                        <h5>Commentaires</h5>
                        <a href="comments/deadpool" className="right">Voir tous les commentaires</a>
                        <Grid className="pl-0">
                            <Cell size={6} className="ml-0">
                                <Grid className="pl-0">
                                    <Cell size={2}>
                                    <div className="avatar_comments_container" style={avatarComments}></div>
                                    </Cell>
                                    <Cell size={10}>
                                        <p className="title_comments m-0">Commentaire positif le plus utile</p>
                                        <p className="m-0">Par Ryan, le 22/02/2018</p>
                                        <div>
                                            <span> 4 étoiles</span>
                                        </div>
                                    </Cell>
                                    <Cell size={12} className="ml-0">
                                        <p>Un super contenu qu'on va réduire à 150 caractères</p>
                                    </Cell>
                                    <Cell size={12} className="ml-0">
                                        <a href="">Lire la suite</a>
                                    </Cell>
                                </Grid>
                            </Cell>
                            <Cell size={6} className="ml-0">
                                <Grid className="pl-0">
                                    <Cell size={3}>
                                    <div className="avatar_comments_container" style={avatarComments}></div>
                                    </Cell>
                                    <Cell size={9}>
                                        <p className="title_comments m-0">Commentaire négatif le plus utile</p>
                                        <p className="m-0">Par Ryan, le 22/02/2018</p>
                                        <div>
                                            <span> 4 étoiles</span>
                                        </div>
                                    </Cell>
                                    <Cell size={12} className="ml-0">
                                        <p>Un super contenu qu'on va réduire à 150 caractères</p>
                                    </Cell>
                                    <Cell size={12} className="ml-0">
                                        <a href="">Lire la suite</a>
                                    </Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </div>
                </div>

                <div className="container pb-4 pt-4" id="movies-suggestion-container">
                    <h5 className="pb-1">Nos recommendations</h5>
                    <div className="movies-suggestion--movies">
                       {suggestionList}
                    </div>
                </div>
            </div>
        );
    }
}