import React, { Component } from 'react';
import axios from 'axios';
import CommentMovieItem from '../../components/Comment/CommentMovieItem';

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

        const goToMovie = () => {
            window.location.href = '/movies/' + this.props.match.params.id;
        }

        let numberComments = this.state.comments.length;

        const commentsList = this.state.comments.map(function(item, key){
            return(
                <CommentMovieItem key={key} comment={item} user={item.user}/>
            );
        });
    
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