import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Cell, Avatar } from 'react-md';
import MovieActions from '../../components/Movie/MovieActions';
var Trianglify = require('trianglify');
var pattern = Trianglify({width: 200, height: 200})

export default class Profile extends Component {

    
    render() {
                
        let pattern = Trianglify({
            x_colors: 'Blues'
        });

        let triangle = pattern.png();

        let bgTriangle = {
            backgroundImage: 'url(' + triangle + ')'
        }
        
        let avatar = require('../../images/avatar_default.jpg');

        return (
        <div id="user-profile">
            <div className="user-profile__header background-trianglify" style={bgTriangle}>
                <div className="container">
                    <a href="" className="btn right">Modifier</a>
                    <Avatar src={avatar} role="presentation" />
                    <div className="user-profile__header__info">
                        <h3>User name</h3>
                        <p>Membre depuis 01/01/2018</p>
                    </div>
                </div>
                <div className="user-profile__header__tracking">
                    <div className="container">
                        <Grid className="p-0">
                            <Cell size={6} className="m-0">
                                <Grid className="p-0">
                                    <Cell size={2} className="m-0">
                                        <i class="material-icons md-xl">local_movies</i>
                                    </Cell>
                                    <Cell size={10} className="m-0">
                                        <p class="mt-0 mb-0">100 heures, 27 minutes et 20 secondes</p>
                                        <p class="mt-0">12 films</p>
                                    </Cell>
                                </Grid>
                            </Cell>
                            <Cell size={6} className="m-0">
                                <Grid className="p-0">
                                    <Cell size={2} className="m-0">
                                        <i class="material-icons md-xl">live_tv</i>
                                    </Cell>
                                    <Cell size={10} className="m-0">
                                        <p class="mt-0 mb-0">12 heures, 10 minutes et 15 secondes</p>
                                        <p class="mt-0">120 séries</p>
                                    </Cell>
                                </Grid>
                            </Cell>
                        </Grid>
                    </div>
                </div>
            </div>
       
        </div>
        );
    }
}