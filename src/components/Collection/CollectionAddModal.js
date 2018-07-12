import React, { Component } from 'react';
import { Grid, Cell, TextField } from 'react-md';

export default class CollectionAddModal extends Component {

    handleChangeTitle = (value) => {
        console.log(value)
    }

    handleAddCollection = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        const privacy = e.target.elements.privacy.value.trim();
        console.log(name, privacy)
    }

    hideModal = (e) => {
        if(e.target === document.getElementById('collectionAddModal')) this.cancel();
    }

    cancel = () => {
        document.getElementById('collectionAddModal').style.display = 'none';
    }
    
    render() {
        return (
           <div className="modal" id="collectionAddModal" onClick={this.hideModal}>
                <div className="collectionModal modal-content">
                    <h2>Créer une collection</h2>
                    <form onSubmit={this.handleAddCollection}>
                        <Grid className="vertically-centered">
                            <Cell size={6}>
                                <label >Titre de la collection</label>
                            </Cell>
                            <Cell size={6}>
                                <TextField id="collection-name" name="name" type="text" onChange={this.handleChangeTitle}/>
                            </Cell>
                            <Cell size={6}>
                                <label>Garder cette collection privée</label>
                            </Cell>
                            <Cell size={6}>
                                <label className="switch">
                                    <input id="collection-privacy" name="privacy" type="checkbox"/>
                                    <span className="slider"></span>
                                </label>
                            </Cell>
                        </Grid>

                        <div className="text-right">
                            <div className="btn mr-1 cancel" onClick={this.cancel}>Annuler</div>
                            <div className="btn">Créer</div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}