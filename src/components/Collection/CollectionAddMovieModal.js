import React, { Component } from 'react';
import { Grid, Cell, TextField } from 'react-md';

export default class CollectionAddMovieModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collections : []
        };
    }

    componentDidMount() {
        this.getCollections();
    }

    handleChangeTitle = (value) => {
        console.log(value)
    }

    getCollections = () => {
        const collections = [
            {name : 'Super films'},
            {name: 'Pour maman'}
        ]

        const collectionsList = collections.map(function(collection, key){
            return(
                <li key={key}>{collection.name}</li>
            );
        });

        this.setState({collections: collectionsList});
    }
    
    render() {
        const hideModal = (e) => {
            if(e.target === document.getElementById('collectionAddMovieModal')) cancel();
        }

        const cancel = () => {
            document.getElementById('collectionAddMovieModal').style.display = 'none';
        }

        return (
           <div className="modal" id="collectionAddMovieModal" onClick={hideModal}>
                <div className="collectionModal modal-content">
                    <h2>Choisir une collection</h2>
                    <Grid>
                        <Cell size={6} className="text-center">
                            <img src="https://image.tmdb.org/t/p/w500/yVaQ34IvVDAZAWxScNdeIkaepDq.jpg" alt="Poster"/>
                        </Cell>
                        <Cell size={6}>
                            <TextField id="collection-name" placeholder="Chercher une collection" type="search" onChange={this.handleChangeTitle}/>
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
                        <div className="btn mr-1 cancel" onClick={cancel}>Annuler</div>
                        <div className="btn">Ajouter à la collection</div>
                    </div>
                </div>
            </div>
        );
    }
}