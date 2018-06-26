import React, { Component } from 'react';
import { Button } from 'react-md';

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
                        <Button icon className="addToWishList" active={true} data-movie_id="1" tooltipLabel="Ajouter à vos favoris"><i className="fas fa-heart"></i></Button>
                        <Button icon className="addToWishList" active={true} data-movie_id="1" tooltipLabel="Ajouter aux films déjà vus"><i className="fas fa-eye"></i></Button>
                        <Button icon className="addToWishList" active={true} data-movie_id="1" tooltipLabel="Ajouter à votre liste de film à voir"><i className="fas fa-plus-square"></i></Button>
                    </div>
                </div>
                <div className="movie_title">
                    <p>Star wars - 22 / 01 / 2018</p>
                </div>
            </div>
        );
    }
}