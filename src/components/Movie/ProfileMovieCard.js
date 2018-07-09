import React, { Component } from 'react';
import MovieActions from '../../components/Movie/MovieActions';

export default class ProfileMovieCard extends Component {
    
    render() {

        const goToMovieShow = () => {
            window.location.href = '/movies/' + this.props.movie.id;
        }
    
        return (
            <div className="user-profile__movie-card">
                <img src={this.props.movie.cover} alt="" onClick={goToMovieShow}/>
                <div className="favorite_action_container text-right">
                    <MovieActions movieId={this.props.movie.id}/>
                </div>
            </div>
        );
    }
}