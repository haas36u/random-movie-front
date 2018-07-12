import React, { Component } from 'react';
import { Grid, Cell, TextField } from 'react-md';

export default class CollectionAddMovieModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collections : [],
            selectedCollection: null
        };
    }

    componentDidMount() {
        const collections = [
            {id: 1, name : 'Super films'},
            {id: 2, name: 'Pour maman'}
        ]
        this.getCollections(collections);
    }

    getCollections = (collections) => {
        const collectionsList = collections.map((collection) => {
            return(
                <li key={collection.id} onClick={(e) => this.selectCollection(collection.id)} className="cursor">{collection.name}</li>
            );
        });

        this.setState({collections: collectionsList});
    }

    handleSearchCollection = (e) => {
        e.preventDefault();
        const collectionTitle = e.target.elements.title.value.trim();
        console.log(collectionTitle)
        const collections = [
            {id: 1, name : collectionTitle}
        ]
        this.getCollections( collections);
    }

    selectCollection = (collectionId) => {
        this.setState({selectedCollection: collectionId});
    }

    saveMovieInCollection = () => {
        console.log(this.state.selectedCollection)
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
                                {this.state.collections}
                            </ul>
                        </Cell>
                        <Cell size={6}></Cell>
                        <Cell size={6}>
                            <div className="createCollection float-right">
                                <div>
                                    <i className="fas fa-plus-circle"></i>
                                    <p>Créer une collection</p>
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