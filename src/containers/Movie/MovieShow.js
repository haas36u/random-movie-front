import React, { Component } from 'react';
import { Grid, Cell, DialogContainer, TextField, Chip } from 'react-md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../../actions/auth';
import '../../style/tools/starability-checkmark.min.css';
import moment from 'moment';

import ActorCard from '../../components/Actor/ActorCard';
import MovieCard from '../../components/Movie/MovieCard';
import MovieActions from '../../components/Movie/MovieActions';
import CollectionAddMovieModal from '../../components/Collection/CollectionAddMovieModal';

export default class MovieShow extends Component {

    constructor(props) {
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            movie : {},
            communityNote : 0,
            userActions : {},
            casting: [],
            similars : [],
            commentModalVisible: false,
            selectedMovie: {id: null, cover: null, title: null}
        };
    }

    componentDidMount() {
        this.getMovie();
        this.getCasting();
        this.getSimilars();
    }

    RATING = {1 : 'A éviter',  2 : 'Moyen', 3 : 'Super', 4 : 'Excellent', 5 : 'Incroyable'};

    /*MOVIE*/
    getMovie = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}`, headers : {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            let movie = response.data;
            movie.releasedAt = new Date(movie.releasedAt);

            if(movie.runtime) movie.runtime = <p><span className="text-bold">Durée : </span> {movie.runtime}</p>;

            movie.genres = movie.genres.map(function(item, key) {
                return (
                    <Chip label={item.name} key={key}/>
                );
            });

            let userActions = {
                liked   : movie.liked,
                watched : movie.watched,
                wished  : movie.wished
            }

            if (movie.mark) document.getElementById('rate' + movie.mark).checked = true;

            let communityNote;
            if (!movie.communityNote) {
                communityNote = <span>Aucune note pour ce film</span>;
            } else {
                communityNote = (
                    <span>{movie.communityNote} étoiles - {this.RATING[Math.round(movie.communityNote)]}</span>
                )
            }

            this.setState({movie : movie, userActions: userActions, communityNote: communityNote});
        })
        .catch(error => {
            console.log(error)
        });
    }

    /*CASTING*/
    getCasting = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/casting`)
        .then((response) => {
            let casting = response.data;
            casting = casting.map(function(item, key) {
                return (
                    <Cell size={2} key={key}>
                        <ActorCard character={item}/>
                    </Cell>
                );
            });
            this.setState({casting : casting});
        })
        .catch(error => {
            console.log(error)
        });
    }

    /*SIMILARS*/
    getSimilars = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/similars`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            let similars = response.data;
            similars = similars.map((item) => {
                return(
                    <MovieCard key={item.id} movie={item} showUserAction={true} openCollectionAddMovieModal={this.openCollectionAddMovieModal}/>
                );
            });
            this.setState({similars : similars});
        })
        .catch(error => {
            console.log(error)
        });
    }

    hideCommentModal = () => {
        this.setState({commentModalVisible : false});
    }
    showCommentModal = () => {
        this.setState({commentModalVisible : true});
    }

    sendComment = () => {
        axios({method: 'post', url: `${process.env.REACT_APP_API_URL}/comments`, headers: {"Authorization" : localStorage.getItem('token')}, data: {content: this.state.comment, movie: 'api/movies/' + this.state.movie.id}})
        .then(() => {
            this.setState({commentModalVisible: false});
        })
        .catch(error => {
            console.log(error)
        });
    }

    sendNotation = (mark) => {
        axios({method: 'post', url: `${process.env.REACT_APP_API_URL}/notations`, headers: {"Authorization" : localStorage.getItem('token')}, data: {mark: mark, movie: 'api/movies/' + this.state.movie.id}})
        .then((response) => {
            this.setState({userAlreadyRate : true});
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleChangeComment = (value) => {
        this.setState({comment: value});
    }

    openCollectionAddMovieModal = (e, movie) => {
        e.stopPropagation();
        this.setState({selectedMovie: movie});
        if(document.getElementById('collectionAddMovieModal')) document.getElementById('collectionAddMovieModal').style.display = 'flex';
    }

    render() {

        if(!this.state ) return <div>Loading...</div>

        var imgUrl = require('../../images/ryan_reynolds.jpg');
        var avatarComments = {  
            backgroundImage: 'url(' + imgUrl + ')'
        }

        const userRatingActions = () => {
            if(isAuthenticated()) {
                return (
                    <Grid className="p-0">
                        <Cell size={6} className="ml-0">
                            <div className="text-bold">Votre note</div>
                            <div id="movieRating">
                                <form>
                                    <fieldset className="starability-checkmark">
                                        <input type="radio" id="rate1" name="rating" value="1" onClick={(e) => this.sendNotation(1)}/>
                                        <label for="rate1" title={this.RATING[1]}>1 star</label>
                                        <input type="radio" id="rate2" name="rating" value="2" onClick={(e) => this.sendNotation(2)}/>
                                        <label for="rate2" title={this.RATING[2]}>2 stars</label>
                                        <input type="radio" id="rate3" name="rating" value="3" onClick={(e) => this.sendNotation(3)}/>
                                        <label for="rate3" title={this.RATING[3]}>3 stars</label>
                                        <input type="radio" id="rate4" name="rating" value="4" onClick={(e) => this.sendNotation(4)}/>
                                        <label for="rate4" title={this.RATING[4]}>4 stars</label>
                                        <input type="radio" id="rate5" name="rating" value="5" onClick={(e) => this.sendNotation(5)}/>
                                        <label for="rate5" title={this.RATING[5]}>5 stars</label>
                                    </fieldset>
                                </form>
                                {!this.state.movie.mark && <p className="text-italic">Vous n'avez pas encore noté ce film</p>}
                            </div>
                        </Cell>
                        <Cell size={6} className="text-right">
                             <span className="btn" onClick={this.showCommentModal}>
                                  <i className="fas fa-edit"></i>Ajouter un commentaire
                              </span>
                        </Cell>
                    </Grid>
                )
            }
        }

        const goToComments = () => {
            window.location.href = '/movies/' + this.state.movie.id + '/comments/';
        }

        const commentsAccess = () => {
            if(isAuthenticated()){
                return (
                    <span onClick={goToComments} className="right cursor text-gold">Voir tous les commentaires</span>
                )
            }else{
                return (
                    <Link to="/login" className="right cursor">Se connecter pour voir les commentaires</Link>
                )
            }
        }

        const commentsSecondAccess = () => {
            if(isAuthenticated()){
                return (
                    <Cell size={12} className="ml-0">
                        <span onClick={goToComments} className="cursor text-gold">Lire la suite</span>
                    </Cell>
                )
            }
        }

        return (
            <div id="movieShow">
                <div id="movie-container">
                    <CollectionAddMovieModal movie={this.state.selectedMovie}/>
                    <div className="container">
                        <Grid>
                            <Cell size={4}><img src={this.state.movie.cover} alt={this.state.movie.title}/></Cell>
                            <Cell size={8}>
                                <Grid>
                                    <Cell size={7} id="movie-container_infos">
                                        <h1>{this.state.movie.title}</h1>
                                        <p><span className="text-bold">Date de sortie : </span>{moment(this.state.movie.releasedAt).format("L")}</p>
                                        {this.state.movie.runtime}
                                        <p><span className="text-bold">Genres : </span> {this.state.movie.genres}</p>
                                        <p className="public_rate">Spectateurs</p>
                                        <div>
                                            {this.state.communityNote}
                                        </div>
                                    </Cell>
                                    <Cell size={5} className="mt-0 text-right">
                                        <MovieActions movie={this.state.movie} userActions={this.state.userActions} openCollectionAddMovieModal={this.openCollectionAddMovieModal}/>
                                    </Cell>
                                    <Cell size={12}>
                                        <h5>Synopsis et détails</h5>
                                        <p>{this.state.movie.overview}</p>
                                        {userRatingActions()}
                                    </Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </div>
                </div>

                <DialogContainer id="add-comment-container" visible={this.state.commentModalVisible} onHide={this.hideCommentModal} title="Ajouter un commentaire">
                    <TextField id="comment" rows={4} maxLength={1000} placeholder="Un petit commentaire..." onChange={this.handleChangeComment}/>
                    <div className="send-comment">
                        <div className="btn" onClick={this.sendComment}>Envoyer le commentaire</div>
                    </div>
                </DialogContainer>

                <div className="container" id="actors-container">
                    <h4>Acteurs</h4>
                    <Grid className="p-0">
                        {this.state.casting}
                    </Grid>
                </div>

                <div id="comments-container">
                    <div className="container">
                        <h5>Commentaires</h5>
                        {commentsAccess()}
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
                                    {commentsSecondAccess()}
                                </Grid>
                            </Cell>
                            <Cell size={6} className="ml-0">
                                <Grid className="pl-0">
                                    <Cell size={2}>
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
                                    {commentsSecondAccess()}
                                </Grid>
                            </Cell>
                        </Grid>
                    </div>
                </div>

                <div className="container pb-4 pt-4" id="movies-suggestion-container">
                    <h5 className="pb-1">Nos recommendations</h5>
                    <div className="movies-suggestion--movies">
                       {this.state.similars}
                    </div>
                </div>
            </div>
        );
    }
}