import React, { Component } from 'react';
import axios from 'axios';
import CommentMovieItem from '../../components/Comment/CommentMovieItem';

export default class CommentsIndex extends Component {

    constructor(props) {
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);

        this.state = {
            movie: {},
            commentsList: [],
            numberComments: 0
        }
    }

    componentDidMount() {
        this.getMovie();
        this.getComments();
    }

    getMovie = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({movie : response.data});
        })
        .catch(error => {
            console.log(error)
        });
    }

    getComments = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/movies/${this.props.match.params.id}/comments`)
        .then((response) => {
            let comments = response.data;

            const commentsList = comments.map(function(item, key){
                return(
                    <CommentMovieItem key={key} comment={item} user={item.user}/>
                );
            });

            this.setState({numberComments : comments.length});
            this.setState({commentsList: commentsList});
        })
        .catch(error => {
            console.log(error)
        });
    }
    
    render() {

        if(!this.state) return <div>Loading...</div>

        const goToMovie = () => {
            window.location.href = '/movies/' + this.props.match.params.id;
        }
    
        return (
            <div className="container comments_page">
                <div className="btn cursor" onClick={goToMovie}>Retour au film</div>
                <h2 className="center">{this.state.movie.title}</h2>
    
                <h4>{this.state.numberComments} commentaires utilisateurs</h4>
                <ul>
                   {this.state.commentsList}
                </ul>
            </div>
        );
    }
}