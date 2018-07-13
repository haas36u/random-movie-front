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
      selectedMovie: {id: null, cover: null, title: null}
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
  
   getMoviesByTitle = (movieTitle, page = 1) => {
      this.setState({typeOfRequest: 'searchByTitle', movieTitle: movieTitle});
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
      
      this.setState({typeOfRequest: 'searchByGenre'});

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
      this.setState(() => ({url: url, activePage: page, typeOfRequest: 'default'}));

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
      const moviesList = data.data.map((item) => {
        item.attributes.id = item.attributes._id;
          return(
              <MovieCard key={item.id} movie={item.attributes} showUserAction={true} openCollectionAddMovieModal={this.openCollectionAddMovieModal}/>
          );
      });

      this.setState(() => {
        return {
          moviesList: moviesList,
          currentPage: data.meta.currentPage,
          itemsPerPage: data.meta.itemsPerPage,
          totalItems: data.meta.totalItems,
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
   
    if (!this.state) return <div>Loading...</div>;
    
    return (
      <div id="movieIndex">
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