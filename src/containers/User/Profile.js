import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Cell, Avatar, TabsContainer, Tabs, Tab } from 'react-md';
import {Bar, Pie} from 'react-chartjs-2';

import ProfileMovieCard from '../../components/Movie/ProfileMovieCard';
import CommentMovieItem from '../../components/Comment/CommentMovieItem';
import NotationsMovieList from '../../components/Notation/NotationsMovieList'
var Trianglify = require('trianglify');

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favoriteMoviesList : [],
            wishedMoviesList : [],
            watchedMoviesList : [],
            commentsList : [],
            notationsList : [],
            nbComments : 0,
            nbNotations: 0,
            ratingBarChart: {},
            favortieMoviesType : {},
            favortieMoviesTypeLegend: []
        };
    }

    componentDidMount() {
        this.getUserComments();
        this.getUserNotations();
        this.getUserStats();
    }

    getUserStats = () => {
        let favoriteMovies = [
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 351286, title: "Jurassic World : Fallen Kingdom" },
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 35127, title: "Jurassic World : Fallen Kingdom" },
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 35126, title: "Jurassic World : Fallen Kingdom" },
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 35286, title: "Jurassic World : Fallen Kingdom" }
        ]

        let wishedMovies = [
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 31286, title: "Jurassic World : Fallen Kingdom" },
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 51286, title: "Jurassic World : Fallen Kingdom" },
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 3518286, title: "Jurassic World : Fallen Kingdom" }
        ]

        let watchedMovies = [
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 3511286, title: "Jurassic World : Fallen Kingdom" },
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 3512286, title: "Jurassic World : Fallen Kingdom" },
            { cover : "https://image.tmdb.org/t/p/w500/9EwjVrXqYmm3Q5xWJyG1TmtTF8j.jpg", id : 3512836, title: "Jurassic World : Fallen Kingdom" }
        ]

        const favoriteMoviesList = favoriteMovies.map(function(item, key){
            return(
                <Cell size={3} key={key} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item}/>
                </Cell>
            );
        });
        this.setState({favoriteMoviesList: favoriteMoviesList});

        const wishedMoviesList = wishedMovies.map(function(item, key){
            return(
                <Cell size={3} key={key} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item} />
                </Cell>
            );
        });
        this.setState({wishedMoviesList: wishedMoviesList});

        const watchedMoviesList = watchedMovies.map(function(item, key){
            return(
                <Cell size={3} key={key} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item} />
                </Cell>
            );
        });
        this.setState({watchedMoviesList: watchedMoviesList});

        const statsRating = [1, 1, 4, 12, 4];
        const ratingBarChart = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
              {
                label: 'Nombre de films',
                backgroundColor: 'rgba(251, 192, 45, 0.8)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(251, 192, 45, 0.9)',
                data: statsRating
              }
            ]
        };
        this.setState({ratingBarChart: ratingBarChart});

        const stats = [
            {name: 'Aventure', nb_movies: 300},
            {name: 'Action', nb_movies: 50},
            {name: 'Comédie', nb_movies: 100}
        ]
        const statsLabels = stats.map(function(stat){
            return stat.name;
        });

        let nbWatchedMovies = 0;
        let statsData = [];
        for(let i = 0; i < stats.length; i++) {
            statsData.push(stats[i].nb_movies);
            nbWatchedMovies += stats[i].nb_movies;
        }

        const favortieMoviesType = {
            labels: statsLabels,
            datasets: [{
                data: statsData,
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                borderWidth : 0
            }],
            options : {
                legend: {
                    display: false,
                    fontColor: '#ffffff'
                }
            }
        };
        this.setState({favortieMoviesType: favortieMoviesType});

        const favortieMoviesTypeLegend = stats.map(function(stat, key){
            return (
                <Cell size={6} key={key} className="favorite-type--chart-description">
                    <div className="darkred"></div>
                    {stat.name} ({((stat.nb_movies / nbWatchedMovies) * 100).toFixed(2)}%)
                </Cell>
            )
        });
        this.setState({favortieMoviesTypeLegend: favortieMoviesTypeLegend});
    }

    /*COMMENTS TODO userID*/
    getUserComments = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/3/comments`)
        .then((response) => {
            let commentsList = response.data.map(function(item, key){
                return (
                    <Grid key={key}>
                        <Cell size={2} className="user-profile__movie-card">
                            <ProfileMovieCard movie={item.movie}/>
                        </Cell>
                        <Cell size={10}>
                            <CommentMovieItem comment={item}/>
                        </Cell>
                    </Grid>
                );
            });


            if(response.data.length === 0) commentsList = <p>Vous n'avez pas encore commenté de film</p>;

            this.setState({commentsList: commentsList});
            this.setState({nbComments: response.data.length});
        })
        .catch(error => {
            console.log(error)
        });
    }

    /*NOTATIONS*/
    getUserNotations = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/3/notations`)
        .then((response) => {
            let notationsList = response.data.map(function(item, key){
                return (
                <div key={key}>
                        <NotationsMovieList notation={item}/>
                </div>
                );
            });

            if(response.data.length === 0) notationsList = <p>Vous n'avez noté aucun film</p>;

            this.setState({notationsList: notationsList});
            this.setState({nbNotations: response.data.length});
        })
        .catch(error => {
            console.log(error)
        });
    }

    showHideMoviesList = (e, id) => {
        let btnClass = e.target.classList;
        let moviesList = document.getElementById(id);

        if(moviesList.offsetHeight > 0){
            moviesList.style.display = 'none';
            btnClass.remove('active');
        }else{
            moviesList.style.display = 'flex';
            btnClass.add('active');
        }
    };

    render() {
        if(!this.state) return( <div>Loading...</div>);
        let bgTriangle = {
            backgroundImage: 'url(' + Trianglify({ x_colors: 'Blues'}).png() + ')'
        }
        
        let avatar = require('../../images/avatar_default.jpg');
        let tabIndex = this.props.location.query && this.props.location.query.tab ? this.props.location.query.tab : 0;

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
            
            <TabsContainer defaultTabIndex={tabIndex}>
                <Tabs className="container" tabId="profile-tab">
                    <Tab label="Résumé">
                        <Grid className="container">
                            <Cell id="resume" size={12}>
                                <div className="user-profile__title">
                                    <i className="small material-icons">insert_chart</i>
                                    <h3>Statistiques</h3>
                                </div>
                                <Grid className="user-profile__favorite-type">
                                    <Cell size={12}>
                                        <h6>Genres favoris</h6>
                                        <Grid>
                                            <Cell size={6} className="mt-1">
                                                <Grid>
                                                    {this.state.favortieMoviesTypeLegend}
                                                </Grid>
                                            </Cell>
                                            <Cell size={6}>
                                                <div className="pie-chart-container">
                                                    <Pie data={this.state.favortieMoviesType} />
                                                </div>
                                            </Cell>
                                        </Grid>
                                    </Cell>
                                </Grid>
                                <Grid className="user-profile__rate-stats">
                                    <Cell size={3}>
                                        <h4>Commentaires totales</h4>
                                        <p>{this.state.nbComments}</p>
                                    </Cell>
                                    <Cell size={3}>
                                        <h4>Notes totales</h4>
                                        <p>{this.state.nbNotations}</p>
                                    </Cell>
                                    <Cell size={6}>
                                        <h4>Répartition des notes</h4>
                                        <Bar data={this.state.ratingBarChart} />
                                    </Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </Tab>
                    <Tab label="Collections">
                        <div id="collections" className="container">
                            Fonctionnalité bientôt disponible
                        </div>
                    </Tab>
                    <Tab label="Favoris, déjà vus, à voir">
                        <div id="favorite" className="container pt-1">
                            <div className="text-right mb-2">
                                <div className="btn active" onClick={(e) => this.showHideMoviesList(e, 'favorite_movies_container')}>Favoris</div>
                                <div className="btn active" onClick={(e) => this.showHideMoviesList(e, 'watched_movies_container')}>Déjà vus</div>
                                <div className="btn active" onClick={(e) => this.showHideMoviesList(e, 'wished_movies_container')}>à voir</div>
                            </div>
                            <Grid id="favorite_movies_container" className="p-0">
                                {this.state.favoriteMoviesList}
                            </Grid>
                            <Grid id="watched_movies_container">
                                {this.state.watchedMoviesList}
                            </Grid>
                            <Grid id="wished_movies_container">
                                {this.state.wishedMoviesList}
                            </Grid>
                        </div>
                    </Tab>
                    <Tab label="Notes">
                        <div id="notations" className="container">
                            <ul>
                                {this.state.notationsList}
                            </ul>
                        </div>
                    </Tab>
                    <Tab label="Critiques">
                        <div id="rate" className="container">
                            <ul>
                                {this.state.commentsList}
                            </ul>
                        </div>
                    </Tab>
                </Tabs>
            </TabsContainer>
        </div>
        );
    }
}