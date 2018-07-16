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

    loader = <span className="spinner"><svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke="{{config.c2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg> </span>;        

    handleAddCollection = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        this.setState({loader : this.loader});
        axios({method: 'post', url: `${process.env.REACT_APP_API_URL}/collections`, headers: {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}, data: {name: name, isPublic : !this.state.isPrivate}})
        .then(() => {
            if (this.props.isModal) this.cancel();
            this.props.getCollections();
            this.setState({loader: null});
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
                    {this.state.loader}
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