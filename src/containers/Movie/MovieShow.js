import React, { Component } from 'react';
import { Grid, Cell, DialogContainer, TextField, Chip } from 'react-md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isLogin } from '../../actions/auth';
import '../../style/tools/starability-checkmark.min.css';

import ActorCard from '../../components/Actor/ActorCard';
import MovieCard from '../../components/Movie/MovieCard';
import MovieActions from '../../components/Movie/MovieActions';

export default class MovieShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie : {},
            casting: [],
            similars : [],
            userAlreadyRate: true
        };
    }

    componentDidMount() {
        /*MOVIE*/
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}`)
        .then((response) => {
            let movie = response.data;
            movie.releasedAt = new Date(movie.releasedAt);

            if(movie.runtime) movie.runtime = <p><span className="text-bold">Durée : </span> {movie.runtime}</p>;

            movie.genres = movie.genres.map(function(item) {
                return (
                    <Chip label={item.name} key={item.id}/>
                );
            });

            this.setState({movie : movie});
        })
        .catch(error => {
            console.log(error)
        });

        /*CASTING*/
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/casting`)
        .then((response) => {
            let casting = response.data;
            casting = casting.map(function(item) {
                return (
                    <Cell size={2} key={item.id}>
                        <ActorCard character={item}/>
                    </Cell>
                );
            });
            this.setState({casting : casting});
        })
        .catch(error => {
            console.log(error)
        });

        /*SIMILARS*/
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/similars`)
        .then((response) => {
            let similars = response.data;
            similars = similars.map(function(item){
                return(
                    <MovieCard key={item.id} movie={item} />
                );
            });
            this.setState({similars : similars});
        })
        .catch(error => {
            console.log(error)
        });

        /*Simulate user already mark*/
        let mark = 1;
        if(this.state.userAlreadyRate) document.getElementById('rate' + mark).checked = true;
    }

    handleChangeComment = (value) => {
        this.setState({comment: value});
    }

    render() {

        if(!this.state ) return <div>Loading...</div>

        var imgUrl = require('../../images/ryan_reynolds.jpg');
        var avatarComments = {  
            backgroundImage: 'url(' + imgUrl + ')'
        }

        const hideCommentModal = () => {
            this.setState({commentModalVisible : false});
        }
        const showCommentModal = () => {
            this.setState({commentModalVisible : true});
        }

        const sendComment = () => {
            axios.post(`${process.env.REACT_APP_API_URL}/comments`, {content: this.state.comment, createdAt: Date.now(), movie: 'api/movies/' + this.state.movie.id, user: 'api/users/3'})
            .then(() => {
                this.setState({commentModalVisible: false});
            })
            .catch(error => {
                console.log(error)
            });
        }

        const sendNotation = (mark) => {
            if(this.state.userAlreadyRate) return;
            
            axios.post(`${process.env.REACT_APP_API_URL}/notations`, {mark: 4, movie: 'api/movies/' + this.props.match.params.id, user: 'api/users/1'})
            .then((response) => {
                this.setState({userAlreadyRate : true});
            })
            .catch(error => {
                console.log(error)
            });
        }

        const userRatingActions = () => {
            if(isLogin()) {
                return (
                    <Grid className="p-0">
                        <Cell size={6} className="ml-0">
                            <div className="text-bold">Votre note</div>
                            <div id="movieRating">
                            <form>
                                <fieldset className="starability-checkmark">
                                    <input type="radio" id="rate1" name="rating" value="1" onClick={(e) => sendNotation(1)}/>
                                    <label for="rate1" title="Terrible">1 star</label>
                                    <input type="radio" id="rate2" name="rating" value="2" onClick={(e) => sendNotation(2)}/>
                                    <label for="rate2" title="Not good">2 stars</label>
                                    <input type="radio" id="rate3" name="rating" value="3" onClick={(e) => sendNotation(3)}/>
                                    <label for="rate3" title="Average">3 stars</label>
                                    <input type="radio" id="rate4" name="rating" value="4" onClick={(e) => sendNotation(4)}/>
                                    <label for="rate4" title="Very good">4 stars</label>
                                    <input type="radio" id="rate5" name="rating" value="5" onClick={(e) => sendNotation(5)}/>
                                    <label for="rate5" title="Amazing">5 stars</label>
                                </fieldset>
                            </form>
                            </div>
                            <div id="movie-rating" data-movie_id="1" data-rate="1"></div>
                        </Cell>
                        <Cell size={6} className="text-right">
                             <span className="btn" onClick={showCommentModal}>
                                  <i className="fas fa-edit"></i>Ajouter un commentaire
                              </span>
                        </Cell>
                    </Grid>
                )
            }
        }

        const goToComments = () => {
            window.location = '/movies/' + this.state.movie.id + '/comments/';
        }

        const commentsAccess = () => {
            if(isLogin()){
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
            if(isLogin()){
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
                    <div className="container">
                        <Grid>
                            <Cell size={4}><img src={this.state.movie.cover} alt={this.state.movie.title}/></Cell>
                            <Cell size={8}>
                                <Grid>
                                    <Cell size={7} id="movie-container_infos">
                                        <h1>{this.state.movie.title}</h1>
                                        <p><span className="text-bold">Date de sortie : </span>{new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(this.state.movie.releasedAt)}</p>
                                        {this.state.movie.runtime}
                                        <p><span className="text-bold">Genres : </span> {this.state.movie.genres}</p>
                                        <p className="public_rate">Spectateurs</p>
                                        <div>
                                            <span>Aucune note pour ce film</span>
                                        </div>
                                    </Cell>
                                    <Cell size={5} className="mt-0 text-right">
                                        <MovieActions movieId={this.state.movie.id}/>
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

                <DialogContainer id="add-comment-container" visible={this.state.commentModalVisible} onHide={hideCommentModal} title="Ajouter un commentaire">
                    <TextField id="comment" rows={4} maxLength={1000} placeholder="Un petit commentaire..." onChange={this.handleChangeComment}/>
                    <div className="send-comment">
                        <div className="btn" onClick={sendComment}>Envoyer le commentaire</div>
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