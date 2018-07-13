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
            collectionName : '',
            showModal : false,
            showDeleteCollectionModal : false,
            selectedMovie : null,
            toasts : []
        };

        this.onChangePrivacy = this.onChangePrivacy.bind(this);
    }

    componentDidMount() {
        this.getCollection();
    }

    getCollection = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/collections/${this.props.match.params.id}`, headers: {"Authorization" : localStorage.getItem('token')}}).then((response) => {
            this.setState({collection : response.data, movies: response.data.movies, isPublic : response.data.isPublic, collectionName: response.data.name});
        });
    }

    deleteMovie = () => {
        this.hideModal();
        const moviesFilter = this.state.movies.filter((movie) => {
            if (movie.id === this.state.selectedMovie) return false;
            else return true;
        });

        this.setState({movies: moviesFilter});
        this.addToast('Film supprimé de la collection');
    }

    onChangeName = (value) => {
        this.setState({collectionName: value});
    }

    onChangePrivacy = (e) => {
        this.setState({isPublic: e.target.checked});
    };

    handleUpdateCollection = (e) => {
        e.preventDefault();

        axios({method: 'put', url: `${process.env.REACT_APP_API_URL}/collections/${this.props.match.params.id}`, headers: {"Authorization" : localStorage.getItem('token')}, data: {name: this.state.collectionName, isPublic : this.state.isPublic}})
        .then(() => {
            this.addToast('Collection mise à jour');
        });
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

    hideDeleteCollectionModal = () => {
        this.setState({showDeleteCollectionModal : false});
    }
    showDeleteCollectionModal = () => {
        this.setState({showDeleteCollectionModal : true});
    }

    deleteCollection = () => {
        console.log(this.props.match.params.id)
        axios({method: 'delete', url: `${process.env.REACT_APP_API_URL}/collections/${this.props.match.params.id}`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then(() => {
            window.location.href = `/profile`;
        });
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
                            <TextField id="collection-name" name="name" value={this.state.collectionName} type="text" onChange={this.onChangeName}/>
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
                {
                    this.state.movies.length === 0 &&
                    <p className="noResult">Vous n'avez pas encore ajouté de film à la collection {this.state.collection.name}</p>
                }

                <DialogContainer id="add-comment-container" visible={this.state.showModal} onHide={this.hideModal} title="Voulez-vous supprimer définitivement le film de votre collection ?" focusOnMount={false}>
                    <div className="text-right">
                        <div className="btn mr-1" onClick={this.hideModal}>Annuler</div>
                        <div className="btn" onClick={(e) => this.deleteMovie(this.state.selectedMovie)}>Supprimer</div>
                    </div>
                </DialogContainer>

                <Grid>
                    {
                        this.state.movies.length > 0 &&
                        this.state.movies.map((movie) => {
                            return(
                                <Cell size={3} key={movie.id}>
                                     <div className="user-profile__movie-card">
                                        <img src={movie.cover} alt={movie.title} onClick={(e) => this.showModal(movie.id)}/>
                                    </div>
                                </Cell>
                            )  
                        })
                    }
                </Grid>

                <DialogContainer id="add-comment-container" visible={this.state.showDeleteCollectionModal} onHide={this.hideDeleteCollectionModal} title="Voulez-vous supprimer définitivement votre collection ?" focusOnMount={false}>
                    <div className="text-right">
                        <div className="btn mr-1" onClick={this.hideDeleteCollectionModal}>Annuler</div>
                        <div className="btn" onClick={this.deleteCollection}>Supprimer</div>
                    </div>
                </DialogContainer>

                <div className="text-right mb-2">
                    <div className="btn color-red" onClick={this.showDeleteCollectionModal}>Supprimer la collection</div>
                </div>

                <Snackbar id="snackbar" toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast} />
            </div>
        );
    }
}