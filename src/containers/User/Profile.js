import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Cell, Avatar, TabsContainer, Tabs, Tab } from 'react-md';
import {Bar, Pie} from 'react-chartjs-2';
import moment from 'moment';

import ProfileMovieCard from '../../components/Movie/ProfileMovieCard';
import CommentMovieItem from '../../components/Comment/CommentMovieItem';
import NotationsMovieList from '../../components/Notation/NotationsMovieList'
var Trianglify = require('trianglify');

export default class Profile extends Component {

    constructor(props) {
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            user : {},
            movies : [],
            showFavoriteMovies : true,
            showWatchedMovies : true,
            showWishedMovies : true,
            commentsList : [],
            notationsList : [],
            nbComments : 0,
            nbNotations: 0,
            ratingBarChart: {},
            favortieMoviesType : {},
            favortieMoviesTypeLegend: [],
            noDataWatchedMovies : null,
            noDataNotation : null,
            loader : <span className="spinner"><svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" strokeWidth="{{config.width}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" strokeWidth="{{config.width}}" ng-attr-stroke="{{config.c2}}" strokeDasharray="{{config.dasharray2}}" strokeDashoffset="{{config.dashoffset2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg> </span>
        };
    }

    componentDidMount() {
        this.getUser();
        this.getUserMovies();
        this.getFavoriteMoviesPieChart();
        this.getNotationsBarChart();
    }

     /*User*/
     getUser = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/users/me`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            const fullUser = response.data;
            let user = {
                id: fullUser.id,
                username: fullUser.username
            }

            let notationsList = fullUser.notations.map(function(item, key){
                return (
                    <div key={key}>
                        <NotationsMovieList notation={item} user={user}/>
                    </div>
                );
            });

            let commentsList = fullUser.comments.map(function(item, key){
                return (
                    <Grid key={key}>
                        <Cell size={2} className="user-profile__movie-card">
                            <ProfileMovieCard movie={item.movie}/>
                        </Cell>
                        <Cell size={10}>
                            <CommentMovieItem comment={item} user={user}/>
                        </Cell>
                    </Grid>
                );
            });

            if (fullUser.notations.length === 0) notationsList = <p>Vous n'avez noté aucun film</p>;
            if (fullUser.comments.length === 0) commentsList = <p>Vous n'avez pas encore commenté de film</p>;

            this.setState({user: user, notationsList: notationsList, nbNotations: fullUser.notations.length, commentsList: commentsList, nbComments: fullUser.comments.length, loader: null});
        })
        .catch(error => {
            console.log(error)
        });
    }

    getUserMovies = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/users/movies`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            this.setState({movies : response.data});
        });
    }

    getFavoriteMoviesPieChart = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/users/me/stats/favorites`, headers: { "Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            const stats = response.data;
            if (stats.length === 0) {
                return this.setState({noDataWatchedMovies: <p className="mt-3">Aucune données disponibles : Vous n'avez pas encore aimé, ni ajouté comme vu un film</p>})
            }

            let nbWatchedMovies = 0;
            let statsData = [];
            let statsLabels = [];
            for (let i = 0; i < stats.length; i++) {
                if (i > 5) {
                    statsLabels[5] = 'Autres';
                    statsData[5] += parseInt(stats[i].nb_movies, 10);
                } else {
                    statsLabels.push(stats[i].name);
                    statsData.push(stats[i].nb_movies);
                }
                nbWatchedMovies += parseInt(stats[i].nb_movies, 10);
            }

            const favortieMoviesTypeColor = [ '#CD6155', '#A93226', '#641E16', '#943126', '#CB4335', '#D98880']
            const favortieMoviesType = {
                labels: statsLabels,
                datasets: [{
                    data: statsData,
                    backgroundColor: favortieMoviesTypeColor,
                    borderWidth : 0
                }],
                options : {
                    legend: {
                        display: false,
                        fontColor: '#ffffff'
                    }
                }
            };

            if(stats.length > 6) stats.splice(6, stats.length - 6);

            const favortieMoviesTypeLegend = stats.map(function(stat, key){
                return (
                    <Cell size={6} key={key} className="favorite-type--chart-description">
                        <div style={{backgroundColor: favortieMoviesTypeColor[key]}}></div>
                        {stat.name} ({((stat.nb_movies / nbWatchedMovies) * 100).toFixed(2)}%)
                    </Cell>
                )
            });
            this.setState({favortieMoviesType: favortieMoviesType, favortieMoviesTypeLegend: favortieMoviesTypeLegend});
        });
    }

    getNotationsBarChart = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/users/me/stats/marks`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            const statsRating = [];
            let indexUserRating = 0;
            if(response.data.length === 0) return this.setState({noDataNotation: <div className="mt-1 mb-2">Vous n'avez pas encore noté de film</div>});

            for (let i = 0; i < 5; i++) {
                if(parseInt(response.data[indexUserRating].mark, 10) === i +1 ){
                    statsRating.push(response.data[indexUserRating].nb_notations);
                    indexUserRating++;
                }
                else statsRating.push(0);
            }

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
        });
    }

    showHideMoviesList = (e, selectedList) => {
        let btnClass = e.target.classList;
        if (btnClass.length != 0 && btnClass.contains('active')) btnClass.remove('active');
        else btnClass.add('active');

        if (selectedList === 'showFavoriteMovies') this.setState({showFavoriteMovies: !this.state.showFavoriteMovies});
        if (selectedList === 'showWatchedMovies') this.setState({showWatchedMovies: !this.state.showWatchedMovies});
        if (selectedList === 'showWishedMovies') this.setState({showWishedMovies: !this.state.showWishedMovies});
    };

    render() {
        if(!this.state) return( <div>Loading...</div>);
        let bgTriangle = {
            backgroundImage: 'url(' + Trianglify({ x_colors: 'Blues'}).png() + ')'
        }
        
        let avatar = require('../../images/avatar_default.jpg');
        let tabIndex = this.props.location.query && this.props.location.query.tab ? this.props.location.query.tab : 0;

        const legend = {display: false};

        return (
        <div id="user-profile">
            {this.state.loader}
            <div className="user-profile__header background-trianglify" style={bgTriangle}>
                <div className="container">
                    <a href="" className="btn right">Modifier</a>
                    <Avatar src={avatar} role="presentation" />
                    <div className="user-profile__header__info">
                        <h3>{this.state.user.username}</h3>
                        <p>Membre depuis le {moment(this.state.user.createdAt).format("L")}</p>
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
                                        {this.state.noDataWatchedMovies}
                                        <Grid>
                                            <Cell size={6} className="mt-1">
                                                <Grid>
                                                    {this.state.favortieMoviesTypeLegend}
                                                </Grid>
                                            </Cell>
                                            <Cell size={6}>
                                                <div className="pie-chart-container">
                                                    <Pie data={this.state.favortieMoviesType} legend={legend}/>
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
                                        {this.state.noDataNotation}
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
                                <div className="btn active" onClick={(e) => this.showHideMoviesList(e, 'showFavoriteMovies')}>Favoris</div>
                                <div className="btn active" onClick={(e) => this.showHideMoviesList(e, 'showWatchedMovies')}>Déjà vus</div>
                                <div className="btn active" onClick={(e) => this.showHideMoviesList(e, 'showWishedMovies')}>à voir</div>
                            </div>
                            <Grid className="p-0">
                                {
                                    this.state.movies.map((movie, key) => {
                                        let cardClass = 'user-profile__movie-card';
                                        let booleanShowElement = true;

                                        console.log(movie.title)
                                        console.log(movie.liked, movie.watched, movie.wished)
                                        let movieUserActions = {'showFavoriteMovies': movie.liked, 'showWatchedMovies': movie.watched, 'showWishedMovies' : movie.wished};

                                        for (let key in movieUserActions) {
                                            if (movieUserActions[key]) booleanShowElement = booleanShowElement && this.state[key];
                                        }
                                        
                                        console.log(booleanShowElement)
                                        let showElement = booleanShowElement ? 'show' : 'hide';
                                        return(
                                            <Cell size={3} key={key} className={cardClass} data-show-element={showElement}>
                                                <ProfileMovieCard movie={movie}/>
                                            </Cell>
                                        );
                                    })
                                }
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