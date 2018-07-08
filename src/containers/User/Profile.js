import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Cell, Avatar, TabsContainer, Tabs, Tab } from 'react-md';
import ProfileMovieCard from '../../components/Movie/ProfileMovieCard';
import CommentMovieItem from '../../components/Comment/CommentMovieItem';
import NotationsMovieList from '../../components/Notation/NotationsMovieList';
var Trianglify = require('trianglify');

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentsList : [],
            notationsList : [],
            nbComments : 0,
            nbNotations: 0
        };
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

    componentDidMount() {
        this.getUserComments();
        this.getUserNotations();
    }

    render() {
        let bgTriangle = {
            backgroundImage: 'url(' + Trianglify({ x_colors: 'Blues'}).png() + ')'
        }
        
        let avatar = require('../../images/avatar_default.jpg');

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

        const wishedMoviesList = wishedMovies.map(function(item, key){
            return(
                <Cell size={3} key={key} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item} />
                </Cell>
            );
        });

        const watchedMoviesList = watchedMovies.map(function(item, key){
            return(
                <Cell size={3} key={key} className="user-profile__movie-card">
                    <ProfileMovieCard movie={item} />
                </Cell>
            );
        });

        const showHideMoviesList = (e, id) => {
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
                                        <p>{this.state.nbComments}</p>
                                    </Cell>
                                    <Cell size={3}>
                                        <h4>Notes totales</h4>
                                        <p>{this.state.nbNotations}</p>
                                    </Cell>
                                    <Cell size={6}>
                                        <h4>Répartition des notes</h4>
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
                                <div className="btn active" onClick={(e) => showHideMoviesList(e, 'favorite_movies_container')}>Favoris</div>
                                <div className="btn active" onClick={(e) => showHideMoviesList(e, 'watched_movies_container')}>Déjà vus</div>
                                <div className="btn active" onClick={(e) => showHideMoviesList(e, 'wished_movies_container')}>à voir</div>
                            </div>
                            <Grid id="favorite_movies_container" className="p-0">
                                {favoriteMoviesList}
                            </Grid>
                            <Grid id="watched_movies_container">
                                {watchedMoviesList}
                            </Grid>
                            <Grid id="wished_movies_container">
                                {wishedMoviesList}
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