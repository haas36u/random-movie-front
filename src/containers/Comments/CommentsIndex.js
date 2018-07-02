import React, { Component } from 'react';
import { Avatar } from 'react-md';
import axios from 'axios';

export default class CommentsIndex extends Component {

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({movie : response.data});
        })
        .catch(error => {
            console.log(error)
        });

        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/comments`)
        .then((response) => {
            this.setState({comments : response.data});
        })
        .catch(error => {
            console.log(error)
        });
    }
    
    render() {

        if(!this.state || !this.state.movie || !this.state.comments) return <div>Loading...</div>

        let avatar = require('../../images/avatar_default.jpg');

        const goToMovie = () => {
            window.location = '/movies/' + this.props.match.params.id;
        }

        const commentsList = this.state.comments.map(function(item){
            return(
                <li className="collection-item avatar">
                    <Avatar src={avatar} role="presentation" />
                    <div className="collection-item-content">
                        <p className="m-0 text-bold">Par {item.user.username}, le {item.createdAt}</p>
                    
                        <p>{item.content}</p>
                        <span className="right cursor">
                            Signaler le commentaire
                        </span>
                    </div>
                </li>
            );
        });

        let numberComments = this.state.comments.length;
    
        return (
            <div className="container comments_page">
                <div className="btn cursor" onClick={goToMovie}>Retour au film</div>
                <h2 className="center">{this.state.movie.title}</h2>
    
                <h4>{numberComments} commentaires utilisateurs</h4>
                <ul>
                   {commentsList}
                </ul>
            </div>
        );
    }
}