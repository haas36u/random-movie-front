import React, { Component } from 'react';
import axios from 'axios';
import { DialogContainer, Snackbar } from 'react-md';
import CommentMovieItem from '../../components/Comment/CommentMovieItem';

export default class CommentsIndex extends Component {

    constructor(props) {
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);

        this.state = {
            movie: {},
            commentsList: [],
            numberComments: 0,
            movieId: null,
            showModal: false,
            toasts : []
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

            const commentsList = comments.map((item, key) => {
                return(
                    <CommentMovieItem key={key} comment={item} user={item.user} showModal={this.showModal} canSignal={true}/>
                );
            });

            this.setState({numberComments : comments.length});
            this.setState({commentsList: commentsList});
        })
        .catch(error => {
            console.log(error)
        });
    }

    signalComment = () => {
        axios({method: 'put', url : `${process.env.REACT_APP_API_URL}/comments/${this.state.commentId}/signal`, headers : {"Authorization" : localStorage.getItem('token')}, 'Content-Type': 'application/json'})
        .then((response) => {
            this.addToast('Commentaire signalé');
            this.hideModal();
        });
    }

    addToast = (text, action, autohide = true) => {
        this.setState((state) => {
          const toasts = state.toasts.slice();
          toasts.push({ text, action });
          return { toasts, autohide };
        });
    };

    dismissToast = () => {
        const [, ...toasts] = this.state.toasts;
        this.setState({ toasts });
    };

    hideModal = () => {
        this.setState({showModal : false});
    }
    showModal = (commentId) => {
        this.setState({commentId: commentId,showModal : true});
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

                <DialogContainer id="add-comment-container" visible={this.state.showModal} onHide={this.hideModal} title="Voulez-vous signaler ce commentaire ?" focusOnMount={false}>
                    <div className="text-right">
                        <div className="btn mr-1" onClick={this.hideModal}>Annuler</div>
                        <div className="btn" onClick={this.signalComment}>Signaler</div>
                    </div>
                </DialogContainer>

                <ul>
                   {this.state.commentsList}
                </ul>

                <Snackbar id="snackbar" toasts={this.state.toasts} autohide={true} onDismiss={this.dismissToast} />
            </div>
        );
    }
}