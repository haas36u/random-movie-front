import React, { Component } from 'react';
import { Cell } from 'react-md';

export default class CollectionItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            covers : []
        };
    }

    componentDidMount() {
        this.showCovers();
    }
    
    showCovers = () => {
        let covers = [];
        for (let i = 0; i < 2; i++) {           
            if (this.props.collection.movies.length > i) covers.push(<img src={this.props.collection.movies[i].cover} key={this.props.collection.id} alt={this.props.collection.name}/>);
        }
        if (covers.length === 0) covers = <p className="text-italic">Aucun film dans cette collection</p>;

        this.setState({covers : covers});
    }

    render() {

        return (
            <Cell size={4} className="collection_vignette" onClick={(e) => this.props.getCollection(this.props.collection.id)}>
                <div>{this.state.covers}</div>
                <p>{this.props.collection.name}</p>
            </Cell>
        );
    }
}