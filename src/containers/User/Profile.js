import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Cell, Avatar, TabsContainer, Tabs, Tab } from 'react-md';
import MovieActions from '../../components/Movie/MovieActions';
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

        let img = require('../../images/deadpool.jpg');

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
                            <Cell size={6} className="m-0">
                                <Grid className="p-0">
                                    <Cell size={2} className="m-0">
                                        <i className="material-icons md-xl">live_tv</i>
                                    </Cell>
                                    <Cell size={10} className="m-0">
                                        <p className="mt-0 mb-0">12 heures, 10 minutes et 15 secondes</p>
                                        <p className="mt-0">120 séries</p>
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
                        <div className="container">
                            <div id="progression">Fonctionnalité bientôt disponible</div>
                        </div>
                    </Tab>
                    <Tab label="Favoris, déjà vus, à voir">
                        <div className="container">
                            <div id="favorite">
                                <Grid className="p-0 mt-1 mb-2">
                                    <Cell size={12} className="text-right m-0">
                                        <span className="btn active" onClick="Materialize.toast('Vous n\'avez pas ajouté vos films préférés!', 4000)">Favoris</span>
                                        <span className="btn" onClick="Materialize.toast('Vous n\'avez pas ajouté les films que vous avez vu!', 4000)">Déjà vus</span>
                                        <span className="btn" onClick="Materialize.toast('Vous n\'avez pas ajouter de film à voir!', 4000)">à voir</span>
                                    </Cell>
                                </Grid>
                                <Grid className="favorite_movies_container">
                                    <Cell size={3} className="profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container text-right">
                                            <MovieActions/>
                                        </div>
                                    </Cell>
                                    <Cell size={3} className="profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container text-right">
                                            <MovieActions/>
                                        </div>
                                    </Cell>
                                    <Cell size={3} className="profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container text-right">
                                            <MovieActions/>
                                        </div>
                                    </Cell>
                                    <Cell size={3} className="profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container text-right">
                                            <MovieActions/>
                                        </div>
                                    </Cell>
                                    <Cell size={3} className="profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container text-right">
                                            <MovieActions/>
                                        </div>
                                    </Cell>
                                    <Cell size={3} className="profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container text-right">
                                            <MovieActions/>
                                        </div>
                                    </Cell>
                                    <Cell size={3} className="profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container text-right">
                                            <MovieActions/>
                                        </div>
                                    </Cell>
                                </Grid>
                                <Grid className="watched_movies_container">
                                    <Cell size={3} className="m-0 mt-2 profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container">
                                            <MovieActions />
                                        </div>
                                    </Cell>
                                </Grid>
                                <Grid className="wished_movies_container">
                                    <Cell size={3} className="m-0 mt-2 profil_movie_vignette">
                                        <Link to="movies/id"><img src={img} alt=""/></Link>
                                        <div className="favorite_action_container">
                                            <MovieActions />
                                        </div>
                                    </Cell>
                                </Grid>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="Notes & critiques">
                        <div className="container">
                            <div id="rate">Fonctionnalité bientôt disponible</div>
                        </div>
                    </Tab>
                </Tabs>
            </TabsContainer>
        </div>
        );
    }
}