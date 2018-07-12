import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Cell, TextField } from 'react-md';

export default class CollectionUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collection : {},
            isPublic : true
        };

        this.onChangePrivacy = this.onChangePrivacy.bind(this);
    }

    componentDidMount() {
        this.getCollection();
        this.getMovies();
    }

    getCollection = () => {
        const collection =  {
            id: 12,
            name: 'Année 60',
            isPublic: true,
            movies : [{cover:"https://image.tmdb.org/t/p/w500/yVaQ34IvVDAZAWxScNdeIkaepDq.jpg", id:11, title:"La Guerre des étoiles"}]
        };

        this.setState({collection : collection, isPublic : collection.isPublic});
    }
    
    getMovies = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
            headers: {'Content-Type': 'application/json-application'} 
        })
        .then((response) => {
            const movies = response.data.map((movie) => {
                return(
                    <Cell size={3} >
                         <div className="user-profile__movie-card">
                            <img src={movie.cover} alt="" onClick={(e) => this.removeMovie(movie.id)}/>
                        </div>
                    </Cell>
                )  
            });
            this.setState({movies: movies});
        })
        .catch(error => {
            console.log(error)
        });
    }

    removeMovie = (movieId) => {
        console.log('remove', movieId)
    }

    onChangePrivacy(e){
        this.setState({isPublic: !e.target.checked});
    };

    handleUpdateCollection = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();

        console.log(name, this.state.isPublic)
    }

    goToCollections = () => {
        window.location.href = `/profile?tab=${this.props.match.params.id}`;
    }

    deleteCollection = () => {
        console.log(this.props.match.params.id)
        window.location.href = `/profile`;
    }

    render() {
        return (
            <div className="container">
                <div className="btn left mt-3" onClick={this.goToCollections}>Retour</div>
                <h2 className="text-center mt-3">Modifier la collection</h2>
                <form onSubmit={this.handleUpdateCollection}>
                    <Grid className="vertically-centered p-0">
                        <Cell size={6}>
                            <label for="collection-name" >Titre de la collection</label>
                        </Cell>
                        <Cell size={6}>
                            <TextField id="collection-name" name="name" type="text"/>
                        </Cell>
                        <Cell size={6}>
                            <label for="collectionn-privacy" >Garder cette collection privée</label>
                        </Cell>
                        <Cell size={6}>
                            <label className="switch">
                                <input id="collection-privacy" type="checkbox" checked={this.state.isPublic} onChange={this.onChangePrivacy}/>
                                <span className="slider"></span>
                            </label>
                        </Cell>
                        <Cell size={12} className="text-center mt-1">
                            <button className="btn">Sauvegarder</button>
                        </Cell>
                    </Grid>
                </form>
                <h2>Films de ma collection</h2>
                <p>Cliquez sur un film pour le supprimer</p>
                <Grid>
                    {this.state.movies}
                </Grid>
                <div className="text-right mb-2">
                    <div className="btn color-red" onClick={this.deleteCollection}>Supprimer la collection</div>
                </div>
            </div>
        );
    }
}