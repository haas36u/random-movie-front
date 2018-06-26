import React, { Component } from 'react';
import { Grid, Cell,SelectField } from 'react-md';

import MovieCard from '../../components/Movie/MovieCard';

export default class MovieShow extends Component {

    render() {

        const OBJECT_ITEMS = [{
            label: 'Action',
            value: 'A',
          }, {
            label: 'Aventure',
            value: 'B',
          }, {
            label: 'Fantastique',
            value: 'C',
          }];

        var movies = [
            {"title" : "Star wars", "released" : "22/01/2018", "movie_url" : 'https://images-na.ssl-images-amazon.com/images/I/71c-O3GaxLL._SY450_.jpg', "url" : "id"},
            {"title" : "Star wars", "released" : "22/01/2018", "movie_url" : require('../../images/deadpool.jpg'), "url" : "deadpool"},
            {"title" : "Star wars", "released" : "22/01/2018", "movie_url" : require('../../images/deadpool.jpg')},
            {"title" : "Star wars", "released" : "22/01/2018", "movie_url" : 'https://images-na.ssl-images-amazon.com/images/I/71c-O3GaxLL._SY450_.jpg'},
            {"title" : "Star wars", "released" : "22/01/2018", "movie_url" : require('../../images/deadpool.jpg')},
            {"title" : "Star wars", "released" : "22/01/2018", "movie_url" : require('../../images/deadpool.jpg')}
        ]

        var moviesList = movies.map(function(item){
            return(
                <MovieCard movie={item} />
            );
        });
    
        return (
            <div id="movieIndex">
                <Grid className="p-0">
                    <Cell size={3} className="movie_tv_menu">
                        <h2>Films</h2>

                        <ul>
                            <li><a href="">Les plus populaires</a></li>
                            <li><a href="">Derniers ajouts</a></li>
                        </ul>
                        <div className="line"></div>
                        <form action="">
                            <SelectField id="select-movie" placeholder="Genres" menuItems={OBJECT_ITEMS} position={SelectField.Positions.BELOW} />
                            <Grid className="p-0 mt-1">
                                <Cell size={6} className="m-0">
                                    <input type="date" />
                                </Cell>
                                <Cell size={6} className="m-0">
                                    <input type="date" />
                                </Cell>
                            </Grid>
                            <div className="search">
                                <input type="submit" value="Chercher" className="btn" />
                            </div>
                        </form>
                    </Cell>
                    <Cell size={9} offset={3} className="mt-0 mr-0">
                        <div className="movies-list">
                            {moviesList}
                        </div>
                        <div className="pagination">pagination</div>
                    </Cell>
                </Grid>
            </div>
        );
    }
}