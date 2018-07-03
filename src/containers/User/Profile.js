import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Cell, Avatar, TabsContainer, Tabs, Tab } from 'react-md';
import ProfileMovieCard from '../../components/Movie/ProfileMovieCard';
var Trianglify = require('trianglify');
var pattern = Trianglify({width: 200, height: 200})

export default class Profile extends Component {

    
    render() {
                
        let pattern = Trianglify({
            x_colors: 'Blues'
        });

        let triangle = pattern.png();

        let bgTriangle = {
            backgroundImage: 'url(' + triangle + ')'
        }
        
        let avatar = require('../../images/avatar_default.jpg');

        let favoriteMovies = [
            {"id" : 1, "title" : "Star wars", "released" : "22/01/2018", "movie_url" : 'https://images-na.ssl-images-amazon.com/images/I/71c-O3GaxLL._SY450_.jpg', "url": "id"},
            {"id" : 2, "title" : "Star wars", "released" : "22/01/2018", "movie_url" : require('../../images/deadpool.jpg'), "url": "id"},
            {"id" : 3, "title" : "Star wars", "released" : "22/01/2018", "movie_url" : require('../../images/deadpool.jpg'), "url": "id"}
        ]

        const favoriteMoviesList = favoriteMovies.map(function(item){
            return(
                <Cell size={3} key={item.id} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item}/>
                </Cell>
            );
        });

        const wishedMoviesList = favoriteMovies.map(function(item){
            return(
                <Cell size={3} key={item.id} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item} />
                </Cell>
            );
        });

        const watchedMoviesList = favoriteMovies.map(function(item){
            return(
                <Cell size={3} key={item.id} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item} />
                </Cell>
            );
        });

        return (
        <div id="user-profile">
            <div className="user-profile__header background-trianglify" style={bgTriangle}>
                <div className="container">
                    <a href="" className="btn right">Modifier</a>
                    <Avatar src={avatar} role="presentation" />
                    <div className="user-profile__header__info">
                        <h3>User name</h3>
                        <p>Membre depuis 01/01/2018</p>
                    </div>
                </div>
                <div className="user-profile__header__tracking">
                    <div className="container">
                        <Grid className="p-0">
                            <Cell size={6} className="m-0">
                                <Grid className="p-0">
                                    <Cell size={2} className="m-0">
                                        <i className="material-icons md-xl">local_movies</i>
                                    </Cell>
                                    <Cell size={10} className="m-0">
                                        <p className="mt-0 mb-0">100 heures, 27 minutes et 20 secondes</p>
                                        <p className="mt-0">12 films</p>
                                    </Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </div>
                </div>
            </div>
            
            <TabsContainer>
                <Tabs className="container" tabId="">
                    <Tab label="Résumé">
                        <Grid className="container">
                            <Cell id="resume" size={12}>
                                <div className="user-profile__title">
                                    <i className="small material-icons">insert_chart</i>
                                    <h3>Statistiques</h3>
                                </div>
                                <Grid className="user-profile__favorite-type">
                                    <Cell size={6}>
                                        <h6>Genres favoris (films)</h6>
                                        <Grid>
                                            <Cell size={6} className="mt-1">
                                                <div className="favorite-type--chart-description">
                                                    <div className="darkred"></div>
                                                    Aventure (18,2%)
                                                </div>
                                                <div className="favorite-type--chart-description">
                                                    <div className="darkgoldenrod"></div>
                                                    Fantastique (14,8%)
                                                </div>
                                                <div className="favorite-type--chart-description">
                                                    <div className="darkmagenta"></div>
                                                    Comédie (10,7%)
                                                </div>
                                            </Cell>
                                            <Cell size={6}>
                                                <div className="pie-chart-container">
                                                </div>
                                            </Cell>
                                        </Grid>
                                    </Cell>
                                    <Cell size={6}>
                                        <h6>Genres favoris (séries)</h6>
                                        <Grid>
                                            <Cell size={6} className="mt-1">
                                                <div className="favorite-type--chart-description">
                                                    <div className="darkred"></div>
                                                    Aventure (18,2%)
                                                </div>
                                                <div className="favorite-type--chart-description">
                                                    <div className="darkgoldenrod"></div>
                                                    Fantastique (14,8%)
                                                </div>
                                                <div className="favorite-type--chart-description">
                                                    <div className="darkmagenta"></div>
                                                    Comédie (10,7%)
                                                </div>
                                            </Cell>
                                            <Cell size={6}>
                                                <div className="pie-chart-container">
                                                </div>
                                            </Cell>
                                        </Grid>
                                    </Cell>
                                </Grid>
                                <Grid className="user-profile__rate-stats">
                                    <Cell size={3}>
                                        <h4>Commentaires totales</h4>
                                        <p>100</p>
                                    </Cell>
                                    <Cell size={3}>
                                        <h4>Notes totales</h4>
                                        <p>50</p>
                                    </Cell>
                                    <Cell size={6}>
                                        <h4>Répartition des notes</h4>
                                    </Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </Tab>
                    <Tab label="Progression">
                        <div id="progression" className="container">
                            Fonctionnalité bientôt disponible
                        </div>
                    </Tab>
                    <Tab label="Favoris, déjà vus, à voir">
                        <div id="favorite" className="container pt-1">
                            <div className="text-right mb-2">
                                <div className="btn active" onClick="Materialize.toast('Vous n\'avez pas ajouté vos films préférés!', 4000)">Favoris</div>
                                <div className="btn" onClick="Materialize.toast('Vous n\'avez pas ajouté les films que vous avez vu!', 4000)">Déjà vus</div>
                                <div className="btn" onClick="Materialize.toast('Vous n\'avez pas ajouter de film à voir!', 4000)">à voir</div>
                            </div>
                            <Grid className="favorite_movies_container p-0">
                                {favoriteMoviesList}
                            </Grid>
                            <Grid className="watched_movies_container">
                                {watchedMoviesList}
                            </Grid>
                            <Grid className="wished_movies_container">
                                {wishedMoviesList}
                            </Grid>
                        </div>
                    </Tab>
                    <Tab label="Notes & critiques">
                        <div id="rate" className="container">
                            Fonctionnalité bientôt disponible
                        </div>
                    </Tab>
                </Tabs>
            </TabsContainer>
        </div>
        );
    }
}