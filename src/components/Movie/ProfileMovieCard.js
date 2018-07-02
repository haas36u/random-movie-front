import React, { Component } from 'react';
import MovieActions from '../../components/Movie/MovieActions';

export default class ProfileMovieCard extends Component {
    
    render() {

        const goToMovieShow = () => {
            window.location = '/movies/' + this.props.movie.url;
        }
    
        return (
            <div className="user-profile__movie-card">
                <img src={this.props.movie.movie_url} alt="" onClick={goToMovieShow}/>
                <div className="favorite_action_container text-right">
                    <MovieActions/>
                </div>
            </div>
        );
    }
}