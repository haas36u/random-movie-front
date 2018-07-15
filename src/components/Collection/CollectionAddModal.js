import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Cell, TextField } from 'react-md';

export default class CollectionAddModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPrivate : false,
            content : null
        };

        this.onChangePrivacy = this.onChangePrivacy.bind(this);
    }

    handleAddCollection = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        axios({method: 'post', url: `${process.env.REACT_APP_API_URL}/collections`, headers: {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}, data: {name: name, isPublic : !this.state.isPrivate}})
        .then(() => {
            if (this.props.isModal) this.cancel();
            this.props.getCollections();
        });
    }

    onChangePrivacy(e){
        this.setState({isPrivate: e.target.checked});
    };

    hideModal = (e) => {
        if(e.target === document.getElementById('collectionAddModal')) this.cancel();
    }

    cancel = () => {
        document.getElementById('collectionAddModal').style.display = 'none';
    }

    render() {

        const renderAsContent = () => {
            return (
                <div>
                    <h2>Créer une collection</h2>
                    <form onSubmit={this.handleAddCollection}>
                        <Grid className="vertically-centered">
                            <Cell size={6}>
                                <label htmlFor="collection-name">Titre de la collection</label>
                            </Cell>
                            <Cell size={6}>
                                <TextField id="collection-name" name="name" type="text" />
                            </Cell>
                            <Cell size={6}>
                                <label htmlFor="collection-privacy">Garder cette collection privée</label>
                            </Cell>
                            <Cell size={6}>
                                <label className="switch">
                                    <input id="collection-privacy" name="privacy" type="checkbox" onChange={this.onChangePrivacy}/>
                                    <span className="slider"></span>
                                </label>
                            </Cell>
                        </Grid>
    
                        <div className="text-right">
                            {this.props.isModal && <div className="btn mr-1 cancel" onClick={this.cancel}>Annuler</div>}
                            <button className="btn">Créer</button>
                        </div>
                    </form>
                </div>
            )
        }

        const renderAsModal = (
            <div className="modal" id="collectionAddModal" onClick={this.hideModal}>
                <div className="collectionModal modal-content">
                    {renderAsContent()}
                </div>
            </div>
        )

        const renderContent = ( (this.props.isModal && renderAsModal) || renderAsContent() )
  
        return renderContent
    }
}