import React, { Component } from 'react';
import { Grid, Cell,SelectField, Slider } from 'react-md';
import axios from 'axios';

import MovieCard from '../../components/Movie/MovieCard';

export default class MovieShow extends Component {


    componentDidMount() {

        axios.get(`${process.env.REACT_APP_API_URL}/movies/populars`)
        .then((response) => {
            let movies = response.data;

            const moviesList = movies.map(function(item){
                return(
                    <MovieCard movie={item} />
                );
            });

            this.setState({moviesList : moviesList});
        })
        .catch(error => {
            console.log(error)
        });
    }

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

        if(!this.state || !this.state.moviesList) return <div>Loading...</div>;
    
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
                            <Slider id="" label="Date de sortie" min={1900} max={2018} step={1} valuePrecision={1} discrete/>
                            <div className="search">
                                <input type="submit" value="Chercher" className="btn" />
                            </div>
                        </form>
                    </Cell>
                    <Cell size={9} offset={3} className="mt-0 mr-0">
                        <div className="movies-list">
                            {this.state.moviesList}
                        </div>
                        <div className="pagination">pagination</div>
                    </Cell>
                </Grid>
            </div>
        );
    }
}