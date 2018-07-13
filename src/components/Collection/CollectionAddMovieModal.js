import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Cell, TextField } from 'react-md';

export default class CollectionAddMovieModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collectionsUI : [],
            collectionsFilter : [],
            selectedCollection: null
        };
    }

    componentDidMount() {
        this.getCollections();
    }

    getCollections = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/collections`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            const collections = this.createCollectionsData(response.data);
            this.createCollectionsUI(collections);

            this.setState({collections: collections, collectionsFilter : collections});
        });
    }

    createCollectionsData = (data) => {
        if (!data.data) return data;

        const collections = [];

        for (let i = 0; i < data.data.length; i++) {
            let collection = data.data[i].attributes;
            collection.id = collection._id;
            delete collection._id;
            collections.push(collection);
        }

        return collections;
    } 

    createCollectionsUI = (collections) => {
        let collectionsUI = collections.map((collection) => {
            return(
                <li key={collection.id} onClick={(e) => this.selectCollection(e, collection.id)} className="cursor collectionName">{collection.name}</li>
            );
        });

        if (collectionsUI.length === 0) collectionsUI = <p className="noResult">Aucune collection ne correspond à votre recherche</p>;

        this.setState({collectionsUI: collectionsUI});
    }

    handleSearchCollection = (e) => {
        e.preventDefault();
        const collectionTitle = e.target.elements.title.value.toLowerCase();

        const collections = this.state.collectionsFilter.filter(function(collection){
            return collection.name.toLowerCase().includes(collectionTitle);
        });

        this.createCollectionsUI(collections);
    }

    selectCollection = (e, collectionId) => {
        for (let i = 0; i <  document.getElementsByClassName('collectionName').length; i++) {
            document.getElementsByClassName('collectionName')[i].classList.remove('active');
        }
        e.target.classList.add('active');
        this.setState({selectedCollection: collectionId});
    }

    saveMovieInCollection = () => {
        if (this.state.selectedCollection === null) return;
        axios({method: 'post', url: `${process.env.REACT_APP_API_URL}/collections/movies`, headers: {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}, data: {collection: `api/collections/${this.state.selectedCollection}`, movie : `api/movies/${this.props.movie.id}`}})
        .then(() => {
            this.cancel();
        });
    }

    hideModal = (e) => {
        if(e.target === document.getElementById('collectionAddMovieModal')) this.cancel();
    }

    cancel = () => {
        document.getElementById('collectionAddMovieModal').style.display = 'none';
    }
    
    render() {

        return (
           <div className="modal" id="collectionAddMovieModal" onClick={this.hideModal}>
                <div className="collectionModal modal-content">
                    <h2>Choisir une collection</h2>
                    <Grid>
                        <Cell size={6} className="text-center">
                            <img src={this.props.movie.cover} alt={this.props.movie.title}/>
                        </Cell>
                        <Cell size={6}>
                            <form onSubmit={this.handleSearchCollection} className="searchContainer">
                                <TextField id="collection-id" name="title" placeholder="Chercher une collection" type="search"/>
                                <button><i className="fas fa-search"></i></button>
                            </form>
                            <ul>
                                {this.state.collectionsUI}
                            </ul>
                        </Cell>
                        <Cell size={6}></Cell>
                        <Cell size={6}>
                            <div className="createCollection float-right">
                                <div>
                                    <i className="fas fa-plus-circle"></i>
                                    <Link to={{ pathname: '/profile', query: { tab: 1 } }}><p>Créer une collection</p></Link>
                                </div>
                            </div>
                        </Cell>
                    </Grid>

                    <div className="text-right">
                        <div className="btn mr-1 cancel" onClick={this.cancel}>Annuler</div>
                        <div className="btn" onClick={this.saveMovieInCollection}>Ajouter à la collection</div>
                    </div>
                </div>
            </div>
        );
    }
}