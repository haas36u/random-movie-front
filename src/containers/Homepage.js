import React, { Component } from 'react';
import background from '../images/dark_vador_homepage.jpg';
import popular from '../images/deadpool.jpg';
import popular1 from '../images/starwars.jpg';

export default class Homepage extends Component {
  
  render() {
    
    return (
      <div id="homepage">
        <div id="homepage_presentation">
          <div id="homepage_presentation--description">
              <h1>Random Movie</h1>
              <p>A cours d'idée pour vos soirées ?</p>
              <p>Nous nous occupons de tout !</p>
              <a href="" className="btn mt-2">Rejoins la communauté</a>
          </div>
          <img src={background} alt=""/>
        </div>

        <div id="homepage_find-idea">
            <h2>Trouvez facilement des idées</h2>
            <p>Nous vous recommandons personnellement des films, en plus de voir ce que vos amis regarde en ce moment !</p>

            <div className="images">
              <img src={popular} alt=""/>
              <img src={popular1} alt=""/>
              <img src={popular} alt=""/>
              <img src={popular1} alt=""/>
              <img src={popular} alt=""/>
            </div>
        </div>
      </div>
    );
  }
}