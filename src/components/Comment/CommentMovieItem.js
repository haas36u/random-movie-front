import React, { Component } from 'react';
import { Avatar } from 'react-md';
import moment from 'moment';
import { Link } from 'react-router-dom';
import TooltipIcon from '../../components/Badge/TooltipIcon';

export default class CommentMovieItem extends Component {

    render() {

        let avatar    = require('../../images/avatar_default.jpg');
        let createdAt = new Date(this.props.comment.createdAt);

        return (
            <li className="commentsItem">
                <Avatar src={avatar} role="presentation" />
                <div className="commentsItem--content">
                    <p className="m-0">
                        Par <Link to={`/profile/${this.props.user.id}`} className="text-bold cursor">{this.props.user.username}</Link>, le {moment(createdAt).format("L")}
                    </p>
                
                    <p>{this.props.comment.content}</p>
                    {
                        this.props.canSignal &&
                        <div className="right cursor signalComment" onClick={(e) => this.props.showModal(this.props.comment.id)}>
                            <TooltipIcon tooltipLabel="Ce commentaire porte préjudice" tooltipPosition="top">

                                <i class="fas fa-exclamation-circle"></i>
                            </TooltipIcon>
                        </div>
                    }
                </div>
            </li>
        );
    }
}