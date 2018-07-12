import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Cell, TextField, DialogContainer, Snackbar } from 'react-md';

export default class CollectionUpdate extends Component {

    constructor(props) {
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            movies: [],
            collection : {},
            isPublic : true,
            showModal : false,
            selectedMovie : null,
            toasts : []
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
        axios.get(`${process.env.REACT_APP_API_URL}/movies`)
        .then((response) => {
            this.setState({movies: response.data});
        })
        .catch(error => {
            console.log(error)
        });
    }

    removeMovie = () => {
        this.hideModal();
        const moviesFilter = this.state.movies.filter((movie) => {
            if (movie.id === this.state.selectedMovie) return false;
            else return true;
        });

        this.setState({movies: moviesFilter});
        this.addToast('Film supprimé de la collection');
    }

    onChangePrivacy(e){
        this.setState({isPublic: !e.target.checked});
    };

    handleUpdateCollection = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();

        console.log(name, this.state.isPublic)
        this.addToast('Collection mise à jour');
    }

    addToast = (text, action, autohide = true) => {
        this.setState((state) => {
          const toasts = state.toasts.slice();
          toasts.push({ text, action });
          return { toasts, autohide };
        });
    };

    hideModal = () => {
        this.setState({showModal : false});
    }
    showModal = (movieId) => {
        this.setState({selectedMovie: movieId, showModal : true});
    }

    goToCollections = () => {
        window.location.href = `/profile?tab=${this.props.match.params.id}`;
    }

    deleteCollection = () => {
        console.log(this.props.match.params.id)
        window.location.href = `/profile`;
    }

    dismissToast = () => {
        const [, ...toasts] = this.state.toasts;
        this.setState({ toasts });
      };

    render() {
        return (
            <div className="container">
                <div className="btn left mt-3" onClick={this.goToCollections}>Retour</div>
                <h2 className="text-center mt-3">Modifier la collection</h2>
                <form onSubmit={this.handleUpdateCollection}>
                    <Grid className="vertically-centered p-0 mt-3">
                        <Cell size={6}>
                            <label>Titre de la collection</label>
                        </Cell>
                        <Cell size={6}>
                            <TextField id="collection-name" name="name" type="text"/>
                        </Cell>
                        <Cell size={6}>
                            <label>Garder cette collection privée</label>
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
                <h2 className="mt-3">Films de ma collection</h2>
                <p>Cliquez sur un film pour le supprimer</p>

                <DialogContainer id="add-comment-container" visible={this.state.showModal} onHide={this.hideModal} title="Voulez-vous supprimer définitivement le film de votre collection ?" focusOnMount={false}>
                    <div className="text-right">
                        <div className="btn mr-1" onClick={this.hideModal}>Annuler</div>
                        <div className="btn" onClick={(e) => this.removeMovie(this.state.selectedMovie)}>Supprimer</div>
                    </div>
                </DialogContainer>

                <Grid>
                    {
                        this.state.movies.map((movie) => {
                            return(
                                <Cell size={3} key={movie.id}>
                                     <div className="user-profile__movie-card">
                                        <img src={movie.cover} alt="" onClick={(e) => this.showModal(movie.id)}/>
                                    </div>
                                </Cell>
                            )  
                        })
                    }
                </Grid>
                <div className="text-right mb-2">
                    <div className="btn color-red" onClick={this.deleteCollection}>Supprimer la collection</div>
                </div>

                <Snackbar id="snackbar" toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast}
                />
            </div>
        );
    }
}