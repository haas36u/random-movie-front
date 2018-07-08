import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import background from '../images/dark_vador_homepage.jpg';

export default class Homepage extends Component {

  constructor(props){
    super(props);

    this.state = {
      moviesList : []
    }
  }
  
  getRecentsMovies = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/movies/recents`)
    .then((response) => {
        let movies = response.data;
        let finalMovies = [];

        for (let i = 0; i < 5; i++) {
          finalMovies.push(movies[i]);
        }

        const moviesList = finalMovies.map(function(item, key){
            return(
              <img src={item.cover} alt="" key={key}/>
            );
        });

        this.setState({moviesList : moviesList});
    })
    .catch(error => {
        console.log(error)
    });
  }

  componentDidMount() {
    this.getRecentsMovies();
  }

  render() {

    if(!this.state) return <div>Loading...</div>;
    
    return (
      <div id="homepage">
        <div id="homepage_presentation">
          <div id="homepage_presentation--description">
              <h1>Random Movie</h1>
              <p>A cours d'idée pour vos soirées ?</p>
              <p>Nous nous occupons de tout !</p>
              <Link to="/registration" className="btn mt-2">Rejoins la communauté</Link>
          </div>
          <img src={background} alt="Random Movie Homepage"/>
        </div>

        <div id="homepage_find-idea">
            <h2>Trouvez facilement des idées</h2>
            <p>Nous vous recommandons personnellement des films, en plus de voir ce que vos amis regarde en ce moment !</p>

            <div className="images">
              {this.state.moviesList}
            </div>
        </div>
      </div>
    );
  }
}