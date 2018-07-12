import React, { Component } from 'react';
import { Cell } from 'react-md';
import { Link } from 'react-router-dom';

export default class CollectionItem extends Component {
    
    render() {

        return (
            <Cell size={4} className="movie_vignette" onClick={(e) => this.props.getCollection(this.props.collection.id)}>
                <div>
                    <img src={this.props.collection.movie.cover} alt={this.props.collection.name}/>
                </div>
                <p>{this.props.collection.name}</p>
            </Cell>
        );
    }
}