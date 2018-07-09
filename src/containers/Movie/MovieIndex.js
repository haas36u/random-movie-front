import React, { Component } from 'react';
import { Grid, Cell, SelectField } from 'react-md';
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
      movieTitle : null,
      genreId: null,
      moviesList: [],
      genres: [],
      currentPage: 1,
      itemsPerPage: 0,
      totalItems: 0,
    };
  }
  
  componentDidMount() {
     if(this.props.location.query && this.props.location.query.movieTitle){
            this.setState({movieTitle: this.props.location.query.movieTitle});
            this.getMoviesByTitle(this.props.location.query.movieTitle);
        }
      else this.getMovies(this.state.url, 1);

      this.getMoviesGenre();
  }
  
  //TODO send two request instead of one !!!
    componentWillUpdate(nextProps, nextState){
       if(nextProps.location.query && nextProps.location.query.movieTitle && this.state.movieTitle !== nextProps.location.query.movieTitle){
           this.setState(
               (state) => ({movieTitle: nextProps.location.query.movieTitle}),
               () => { this.getMoviesByTitle(nextProps.location.query.movieTitle) });
       }
    }
  
   getMoviesByTitle = (movieTitle) => {
        axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
          params : {title: movieTitle},
          headers: {'Content-Type': 'application/vnd.api+json'}
        })
        .then((response) => {
            this.changeMoviesList(response.data);
        })
        .catch(error => {
            console.log(error)
        });
    }
   
   getMoviesGenre = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/genres`, {
          headers: {'Content-Type': 'application/vnd.api+json'}
        })
        .then((response) => {
            const genres = [];
            for(let i = 0; i < response.data.length; i++) {
                genres.push({
                    label: response.data[i].name,
                    value: response.data[i].id,
                });
            }

            this.setState({genres: genres});
        })
        .catch(error => {
            console.log(error)
        });
    }

    getMoviesByGenre = () => {
        if(!this.state.genreId) return;

        axios.get(`${process.env.REACT_APP_API_URL}/genres/${this.state.genreId}/movies`, {
          headers: {'Content-Type': 'application/vnd.api+json'}
        })
        .then((response) => {
            this.changeMoviesList(response.data);
        })
        .catch(error => {
            console.log(error)
        });
    }
    
     getMovies = (url = 'populars', page = 1) => {
        this.setState(() => ({url: url, activePage: page}));

        axios.get(`${process.env.REACT_APP_API_URL}/movies/${url}`, {
          params: {page: page},
          headers: {'Content-Type': 'application/vnd.api+json'}
        })
        .then((response) => {
            this.changeMoviesList(response.data);
        })
        .catch(error => {
            console.log(error)
        });
    }

    changeMoviesList = (movies) => {
        const moviesList = movies.map(function(item, key){
            return(
                <MovieCard key={key} movie={item} />
            );
        });

      this.setState(() => {
          return {
            moviesList: moviesList,
            currentPage: movies.meta.currentPage,
            itemsPerPage: movies.meta.itemsPerPage,
            totalItems: movies.meta.totalItems,
          }
        });
    }
  
  handlePageChange = (pageNumber) => {
    this.getMovies(this.state.url, pageNumber);
  };

    handleGenreChange = (genreId) => {
        this.setState({genreId: genreId});
    }

  
  render() {
   
    if (!this.state) return <div>Loading...</div>;
    
    return (
      <div id="movieIndex">
        <Grid className="p-0">
          <Cell size={3} className="movie_tv_menu">
            <h2>Films</h2>
            <ul>
              <li onClick={(e) => this.getMovies('populars')}>Les plus populaires</li>
              <li onClick={(e) => this.getMovies('recents')}>Derniers ajouts</li>
            </ul>
            <div className="line"></div>
            <form action="">
              <SelectField id="select-movie" placeholder="Genres" menuItems={this.state.genres}
                           position={SelectField.Positions.BELOW} onChange={this.handleGenreChange}/>
              <div className="search">
                <div className="btn" onClick={this.getMoviesByGenre}>Chercher</div>
              </div>
            </form>
          </Cell>
          <Cell size={9} offset={3} className="mt-0 mr-0">
            <div className="movies-list">
              {this.state.moviesList}
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