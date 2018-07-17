import React, { Component } from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, DialogContainer } from 'react-md';
import TooltipIcon from '../../../components/Badge/TooltipIcon';
import axios from 'axios';
import moment from 'moment';

export default class AdminCommentsIndex extends Component {

    constructor(props){
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            comments : [],
            showDeleteModal : false,
            showUnsignalModal : false,
            commentId: null
        };
    }
    
    componentDidMount(){
        this.getSignaledComments();
    }

    getSignaledComments = () => {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/comments/signaled`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            this.setState({comments: response.data});
        });
    }

    unsignal = () => {
        axios({method: 'put', url: `${process.env.REACT_APP_API_URL}/comments/${this.state.commentId}/unsignal`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            this.hideModal();
            this.setState((prevStates) => ({comments: prevStates.comments.filter((comment) => comment.id !== this.state.commentId )}));
        });
    }

    deleteComment = () => {
        axios({method: 'delete', url: `${process.env.REACT_APP_API_URL}/comments/${this.state.commentId}`, headers: {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            this.hideModal();
            this.setState((prevStates) => ({comments: prevStates.comments.filter((comment) => comment.id !== this.state.commentId )}));
        });
    }

    hideModal = () => {
        this.setState({showDeleteModal : false, showUnsignalModal: false});
    }
    showDeleteModal = (commentId) => {
        this.setState({showDeleteModal : true, commentId: commentId});
    }
    showUnsignalModal = (commentId) => {
        this.setState({showUnsignalModal : true, commentId: commentId});
    }

    render() {
    
        return (
            <div className="container">
                <h2 className="text-center mt-3">Commentaires ayant été sigalés</h2>

                <DialogContainer id="remove-comment-container" visible={this.state.showDeleteModal} onHide={this.hideModal} title="Voulez-vous supprimer définitivement ce commentaire ?" focusOnMount={false}>
                    <div className="text-right">
                        <div className="btn mr-1" onClick={this.hideModal}>Annuler</div>
                        <div className="btn" onClick={this.deleteComment}>Supprimer</div>
                    </div>
                </DialogContainer>

                <DialogContainer id="unsignal-comment-container" visible={this.state.showUnsignalModal} onHide={this.hideModal} title="Ce commentaire ne porte pas préjudice ?" focusOnMount={false}>
                    <div className="text-right">
                        <div className="btn mr-1" onClick={this.hideModal}>Annuler</div>
                        <div className="btn" onClick={this.unsignal}>Continuer</div>
                    </div>
                </DialogContainer>

                <DataTable plain>
                    <TableHeader>
                        <TableRow>
                            <TableColumn>Utilisateur</TableColumn>
                            <TableColumn>Date de publication</TableColumn>
                            <TableColumn>Contenu du commentaire</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                           this.state.comments.map((comment) => (
                                <TableRow key={comment.id}>
                                    <TableColumn>{comment.user.username}</TableColumn>
                                    <TableColumn>{moment(comment.createdAt).format("L")}</TableColumn>
                                    <TableColumn>{comment.content}</TableColumn>
                                    <TableColumn>
                                        <span onClick={(e) => this.showUnsignalModal(comment.id)}>
                                            <TooltipIcon tooltipLabel="Le commentaire ne porte pas préjudice" tooltipPosition="top">
                                                <i className="material-icons cursor">security</i>
                                            </TooltipIcon>
                                        </span>
                                        <span onClick={(e) => this.showDeleteModal(comment.id)}>
                                            <TooltipIcon tooltipLabel="Supprimer définitivement le commentaire" tooltipPosition="top">
                                                <i className="material-icons cursor">delete</i>
                                            </TooltipIcon>
                                        </span>
                                    </TableColumn>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </DataTable>
            </div>
        );
    }
}