import React, { Component } from 'react';
import MovieActions from '../../components/Movie/MovieActions';

export default class MovieCard extends Component {

    
    render() {

        let bg = {
            backgroundImage: 'url(' + this.props.movie.cover + ')'
        }

        const goToMovieShow = () => {
            window.location.href = '/movies/' + this.props.movie.id;
        }

        let releasedAt = new Date(this.props.movie.releasedAt);

        return (
            <div className="movie_vignette">
                <div style={bg}></div>
                <div className="actions_buttons" onClick={goToMovieShow}>
                    <div className="right">
                        <MovieActions movieId={this.props.movie.id}/>
                    </div>
                </div>
                <div className="movie_title">
                    <p>{this.props.movie.title} - {new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(releasedAt)}</p>
                </div>
            </div>
        );
    }
}