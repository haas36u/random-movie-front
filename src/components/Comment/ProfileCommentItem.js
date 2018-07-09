import React, { Component } from 'react';
import moment from 'moment';

export default class ProfileCommentItem extends Component {
    
    render() { 
        let createdAt = new Date(this.props.comment.createdAt);

        return (
            <li className="commentsItem">
                <Avatar src={avatar} role="presentation" />
                <div className="commentsItem-content">
                    <p className="m-0 text-bold">Par {this.props.comment.user.username}, le {moment(createdAt).format("L")}</p>
                
                    <p>{this.props.comment.content}</p>
                </div>
            </li>
        );
    }
}