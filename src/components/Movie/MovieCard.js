import React, { Component } from 'react';
import MovieActions from '../../components/Movie/MovieActions';

export default class MovieCard extends Component {

    render() {

        var bg = {
            backgroundImage: 'url(' + this.props.movie.url + ')'
        }
    
        return (
            <div className="movie_vignette">
                <div style={bg}></div>
                <div className="actions_buttons">
                    <div className="right">
                        <MovieActions />
                    </div>
                </div>
                <div className="movie_title">
                    <p>Star wars - 22 / 01 / 2018</p>
                </div>
            </div>
        );
    }
}