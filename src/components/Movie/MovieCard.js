import React, { Component } from 'react';
import MovieActions from '../../components/Movie/MovieActions';

export default class MovieCard extends Component {

    
    render() {

        let bg = {
            backgroundImage: 'url(' + this.props.movie.cover + ')'
        }

        const goToMovieShow = () => {
            window.location = '/movies/' + this.props.movie.id;
        }
    
        return (
            <div className="movie_vignette">
                <div style={bg}></div>
                <div className="actions_buttons" onClick={goToMovieShow}>
                    <div className="right">
                        <MovieActions movieId={this.props.movie.id}/>
                    </div>
                </div>
                <div className="movie_title">
                    <p>{this.props.movie.title} - {this.props.movie.releasedAt}</p>
                </div>
            </div>
        );
    }
}