import React, { Component } from 'react';
import { Grid, Cell, SelectField, Slider } from 'react-md';
import axios from 'axios';
import Pagination from "react-js-pagination";

import MovieCard from '../../components/Movie/MovieCard';

export default class MovieShow extends Component {
  
  constructor(props) {
    axios.defaults.headers['Content-Type'] = 'application/vnd.api+json';
    axios.defaults.headers['Accept'] = 'application/vnd.api+json';
    super(props);
    this.state = {
      url: 'populars',
      movies: [],
      currentPage: 1,
      itemsPerPage: 0,
      totalItems: 0,
    };
  }
  
  componentDidMount() {
    this.changeMoviesList();
  }
  
  changeMoviesList = (url = 'populars', page = 1) => {
    this.setState(() => ({url: url, activePage: page}));
    
    axios.get(`${process.env.REACT_APP_API_URL}/movies/${url}`, {
      params: {page: page},
      headers: {'Content-Type': 'application/vnd.api+json'}
    })
      .then((response) => {
        console.log(response)
        this.setState(() => {
          return {
            movies: response.data.data,
            currentPage: response.data.meta.currentPage,
            itemsPerPage: response.data.meta.itemsPerPage,
            totalItems: response.data.meta.totalItems,
          }
        });
      })
      .catch(error => {
        console.log(error)
      });
  };
  
  handlePageChange = (pageNumber) => {
    this.changeMoviesList(this.state.url, pageNumber);
  };
  
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
    
    // if (!this.state || !this.state.moviesList) return <div>Loading...</div>;
    
    return (
      <div id="movieIndex">
        <Grid className="p-0">
          <Cell size={3} className="movie_tv_menu">
            <h2>Films</h2>
            <ul>
              <li onClick={(e) => this.changeMoviesList('populars')}>Les plus populaires</li>
              <li onClick={(e) => this.changeMoviesList('recents')}>Derniers ajouts</li>
            </ul>
            <div className="line"></div>
            <form action="">
              <SelectField id="select-movie" placeholder="Genres" menuItems={OBJECT_ITEMS}
                           position={SelectField.Positions.BELOW}/>
              <Slider id="" label="Date de sortie" min={1900} max={2018} step={1} valuePrecision={1} discrete/>
              <div className="search">
                <input type="submit" value="Chercher" className="btn"/>
              </div>
            </form>
          </Cell>
          <Cell size={9} offset={3} className="mt-0 mr-0">
            <div className="movies-list">
              {
                this.state.movies.map(function (item) {
                  return (
                    <MovieCard key={item.id} movie={item.attributes}/>
                  );
                })
              }
            </div>
            <div className="pagination-container">
              <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.itemsPerPage}
                totalItemsCount={this.state.totalItems}
                onChange={this.handlePageChange}
              />
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}