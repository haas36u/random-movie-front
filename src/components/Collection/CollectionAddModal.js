import React, { Component } from 'react';
import { Grid, Cell, TextField } from 'react-md';

export default class CollectionAddModal extends Component {

    handleChangeTitle = (value) => {
        console.log(value)
    }
    
    render() {
        const hideModal = (e) => {
            if(e.target === document.getElementById('collectionAddModal')) cancel();
        }

        const cancel = () => {
            document.getElementById('collectionAddModal').style.display = 'none';
        }

        return (
           <div className="modal" id="collectionAddModal" onClick={hideModal}>
                <div className="collectionModal modal-content">
                    <h2>Créer une collection</h2>
                    <Grid className="vertically-centered">
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
                    </Grid>

                    <div className="text-right">
                        <div className="btn mr-1 cancel" onClick={cancel}>Annuler</div>
                        <div className="btn">Créer</div>
                    </div>
                </div>
            </div>
        );
    }
}

/*

 <DialogContainer id="collectionAddModal" visible={this.props.visible} onHide={hideModal} title="Etez-vous sur?" focusOnMount={false}>
            </DialogContainer>*/