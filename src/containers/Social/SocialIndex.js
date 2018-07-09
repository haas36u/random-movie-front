import React, { Component } from 'react';
import axios from 'axios';

export default class SocialIndex extends Component {

    componentDidMount() {

    }
    
    render() {

        if(!this.state) return <div>Loading...</div>
    
        return (
            <div className="container" id="social">
                <div className="btn cursor">Retour au film</div>
                <h2 className="center"></h2>
            </div>
        );
    }
}