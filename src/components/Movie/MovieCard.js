import React, { Component } from 'react';
import MovieActions from '../../components/Movie/MovieActions';
import moment from 'moment';

export default class MovieCard extends Component {

    render() {

        let bg = {
            backgroundImage: 'url(' + this.props.movie.cover + ')'
        }

        const goToMovieShow = () => {
            window.location.href = '/movies/' + this.props.movie.id;
        } 

        let userActions = {
            liked : this.props.movie.liked,
            watched : this.props.movie.watched,
            wished : this.props.movie.wished
        }

        const showUserActions = () => {
            if (this.props.showUserAction) return (<MovieActions movie={this.props.movie} userActions={userActions} openCollectionAddMovieModal={this.props.openCollectionAddMovieModal}/>);
        }

        return (
            <div className="movie_vignette">
                <div style={bg}></div>
                <div className="actions_buttons" onClick={goToMovieShow}>
                    <div className="right">
                        {showUserActions()}
                    </div>
                </div>
                <div className="movie_title">
                    <p>{this.props.movie.title} - {moment(this.props.movie.releasedAt).format("L")}</p>
                </div>
            </div>
        );
    }
}