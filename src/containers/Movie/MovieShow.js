import React, { Component } from 'react';
import { Grid, Cell, DialogContainer, TextField, Chip } from 'react-md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isLogin } from '../../actions/auth';

import ActorCard from '../../components/Actor/ActorCard';
import MovieCard from '../../components/Movie/MovieCard';
import MovieActions from '../../components/Movie/MovieActions';

export default class MovieShow extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({movie :  response.data});
        })
        .catch(error => {
            console.log(error)
        });

        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/casting`)
        .then((response) => {
            this.setState({casting :  response.data});
        })
        .catch(error => {
            console.log(error)
        });

        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/similars`)
        .then((response) => {
            this.setState({similars :  response.data});
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleChangeComment = (value) => {
        this.setState({comment: value});
    }

    render() {

        if(!this.state || !this.state.movie || !this.state.casting || !this.state.similars) return <div>Loading...</div>

        var imgUrl = require('../../images/ryan_reynolds.jpg');
        var avatarComments = {  
            backgroundImage: 'url(' + imgUrl + ')'
        }

        let releasedAt = new Date(this.state.movie.releasedAt);
        let runtime;
        if(this.state.movie.runtime) runtime = <p><span className="text-bold">Durée : </span> {this.state.movie.runtime}</p>;

        const movieType = this.state.movie.genres.map(function(item) {
            return (
                <Chip label={item.name} key={item.id}/>
            );
        });


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

        const userRatingActions = () => {
            if(isLogin()) {
                return (
                    <Grid className="p-0">
                        <Cell size={6} className="ml-0">
                            <div className="text-bold">Votre note</div>
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

        const actorsList = this.state.casting.map(function(item) {
            return (
                <Cell size={2}>
                    <ActorCard key={item.id} character={item}/>
                </Cell>
            );
        });

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

        const suggestionList = this.state.similars.map(function(item){
            return(
                <MovieCard key={item.id} movie={item} />
            );
        });
    
        return (
            <div id="movieShow">
                <div id="movie-container">
                    <div className="container">
                        <Grid>
                            <Cell size={4}><img src={this.state.movie.cover} alt={this.state.movie.title}/></Cell>
                            <Cell size={8}>
                                <Grid>
                                    <Cell size={6} id="movie-container_infos">
                                        <h1>{this.state.movie.title}</h1>
                                        <p><span className="text-bold">Date de sortie : </span>{new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(releasedAt)}</p>
                                        {runtime}
                                        <p><span className="text-bold">Genres : </span> {movieType}</p>
                                        <p className="public_rate">Spectateurs</p>
                                        <div>
                                            <span>Aucune note pour ce film</span>
                                        </div>
                                    </Cell>
                                    <Cell size={6} className="mt-0 text-right">
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
                        {actorsList}
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
                       {suggestionList}
                    </div>
                </div>
            </div>
        );
    }
}