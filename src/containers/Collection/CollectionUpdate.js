import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Cell, TextField } from 'react-md';
import ProfileMovieCard from '../../components/Movie/ProfileMovieCard';

export default class CollectionUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getMovies();
    }
    
    getMovies = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
            headers: {'Content-Type': 'application/json-application'} 
        })
        .then((response) => {
            const movies = response.data.map(function(movie) {
                return(
                    <Cell size={3}>
                        <ProfileMovieCard movie={movie} showUserAction={false}/>
                    </Cell>
                )  
            });
            this.setState({movies: movies});
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleChangeTitle = (value) => {
        console.log(value)
    }

    render() {
        return (
            <div className="container">
                <div className="btn left mt-3">Retour</div>
                <h2 className="text-center mt-3">Modifier la collection</h2>
                <Grid className="vertically-centered p-0">
                    <Cell size={6}>
                        <label for="collectionn-name" >Titre de la collection</label>
                    </Cell>
                    <Cell size={6}>
                        <TextField id="collection-name" type="text" onChange={this.handleChangeTitle}/>
                    </Cell>
                    <Cell size={6}>
                        <label for="collectionn-privacy" >Garder cette collection privée</label>
                    </Cell>
                    <Cell size={6}>
                        <label className="switch">
                            <input id="collection-privacy" type="checkbox"/>
                            <span className="slider"></span>
                        </label>
                    </Cell>
                    <Cell size={12} className="text-center mt-1">
                        <div className="btn">Sauvegarder</div>
                    </Cell>
                </Grid>
                <h2>Films de ma collection</h2>
                <p>Cliquez sur un film pour le supprimer</p>
                <Grid>
                    {this.state.movies}
                </Grid>
                <div className="text-right mb-2">
                    <div className="btn color-red">Supprimer la collection</div>
                </div>
            </div>
        );
    }
}