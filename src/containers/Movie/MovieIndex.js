import React, { Component } from 'react';
import { Grid, Cell, SelectField } from 'react-md';
import axios from 'axios';
import Pagination from "react-js-pagination";

import MovieCard from '../../components/Movie/MovieCard';
import CollectionAddMovieModal from '../../components/Collection/CollectionAddMovieModal';

export default class MovieShow extends Component {
  
  constructor(props) {
    axios.defaults.headers['Content-Type'] = 'application/vnd.api+json';
    axios.defaults.headers['Accept'] = 'application/vnd.api+json';
    super(props);
    this.state = {
      url: 'movies/populars',
      typeOfRequest : 'default',
      movieTitle : null,
      genreId: null,
      moviesList: [],
      genres: [],
      currentPage: 1,
      itemsPerPage: 0,
      totalItems: 0,
      selectedMovie: {id: null, cover: null, title: null},
      loader : this.loader
    };
  }

  loader = <span className="spinner"><svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke="{{config.c2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg> </span>;
  
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
  
   getMoviesByTitle = (movieTitle, page = 1) => {
      this.setState({typeOfRequest: 'searchByTitle', movieTitle: movieTitle, loader: this.loader});
      axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
        params : {title: movieTitle, page: page},
        headers: {'Content-Type': 'application/vnd.api+json', "Authorization" : localStorage.getItem('token')}
      })
      .then((response) => {
          this.changeMoviesList(response.data);
      })
      .catch(error => {
          console.log(error)
      });
    }
   
   getMoviesGenre = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/genres`)
      .then((response) => {
          const genres = [];
          for(let i = 0; i < response.data.data.length; i++) {
              genres.push({
                  label: response.data.data[i].attributes.name,
                  value: response.data.data[i].attributes._id,
              });
          }

          this.setState({genres: genres});
      })
      .catch(error => {
          console.log(error)
      });
    }

    getMoviesByGenre = (page = 1) => {
      if(!this.state.genreId) return;
      
      this.setState({typeOfRequest: 'searchByGenre', loader: this.loader});

      axios.get(`${process.env.REACT_APP_API_URL}/genres/${this.state.genreId}/movies`, {
        params: {page: page},
        headers: {'Content-Type': 'application/vnd.api+json', "Authorization" : localStorage.getItem('token')}
      })
      .then((response) => {
          this.changeMoviesList(response.data);
      })
      .catch(error => {
          console.log(error)
      });
    }
    
    getMovies = (url = 'movies/populars', page = 1) => {
      this.setState(() => ({url: url, activePage: page, typeOfRequest: 'default', loader: this.loader}));

      axios.get(`${process.env.REACT_APP_API_URL}/${url}`, {
        params: {page: page},
        headers: {'Content-Type': 'application/vnd.api+json', "Authorization" : localStorage.getItem('token')} 
      })
      .then((response) => {
          this.changeMoviesList(response.data);
      })
      .catch(error => {
          console.log(error)
      });
    }

    changeMoviesList = (data) => {
      let moviesList = data.data.map((item) => {
        item.attributes.id = item.attributes._id;
          return(
              <MovieCard key={item.id} movie={item.attributes} showUserAction={true} openCollectionAddMovieModal={this.openCollectionAddMovieModal}/>
          );
      });

      if (moviesList.length === 0) moviesList = <p className="noResult--movies">Aucun film ne correspond à votre requête.</p> 

      this.setState(() => {
        return {
          moviesList: moviesList,
          currentPage: data.meta.currentPage,
          itemsPerPage: data.meta.itemsPerPage,
          totalItems: data.meta.totalItems,
          loader: null
        }
      });
    }
  
  handlePageChange = (pageNumber) => {
    if (this.state.typeOfRequest === 'default') this.getMovies(this.state.url, pageNumber);
    else if (this.state.typeOfRequest === 'searchByTitle') this.getMoviesByTitle(this.state.movieTitle, pageNumber)
    else this.getMoviesByGenre(pageNumber);
  };

  handleGenreChange = (genreId) => {
    this.setState({genreId: genreId});
  }

  openCollectionAddMovieModal = (e, movie) => {
    e.stopPropagation();
    this.setState({selectedMovie: movie});
    if(document.getElementById('collectionAddMovieModal')) document.getElementById('collectionAddMovieModal').style.display = 'flex';
  }
  
  render() {
    return (
      <div id="movieIndex">
        {this.state.loader}
        <Grid className="p-0">
          <Cell size={3} className="movie_tv_menu">
            <h2>Films</h2>
            <ul>
              <li onClick={(e) => this.getMovies('movies/populars')}>Les plus populaires</li>
              <li onClick={(e) => this.getMovies('movies/recents')}>Derniers ajouts</li>
            </ul>
            <div className="line"></div>
            <form action="">
              <SelectField id="select-movie" placeholder="Genres" menuItems={this.state.genres} position={SelectField.Positions.BELOW} onChange={this.handleGenreChange}/>
              <div className="search">
                <div className="btn" onClick={(e) => this.getMoviesByGenre()}>Chercher</div>
              </div>
            </form>
          </Cell>
          <Cell size={9} offset={3} className="moviesContainer mt-0 mr-0">

            <CollectionAddMovieModal movie={this.state.selectedMovie}/>
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