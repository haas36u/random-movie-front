import React, { Component } from 'react';
import MovieActions from '../../components/Movie/MovieActions';

export default class ProfileMovieCard extends Component {
    
    render() {

        const goToMovieShow = () => {
            window.location.href = '/movies/' + this.props.movie.id;
        }

        let userActions = {
            liked   : this.props.movie.liked,
            watched : this.props.movie.watched,
            wished  : this.props.movie.wished
        }

        const showUserActions = () => {
            if (this.props.showUserAction) return (<MovieActions movie={this.props.movie} userActions={userActions} openCollectionAddMovieModal={this.props.openCollectionAddMovieModal}/>);
        }
    
        return (
            <div className="user-profile__movie-card">
                <img src={this.props.movie.cover} alt="" onClick={goToMovieShow}/>
                <div className="favorite_action_container text-right">
                    {showUserActions()}
                </div>
            </div>
        );
    }
}