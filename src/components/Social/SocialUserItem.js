import React, { Component } from 'react';
import { Avatar } from 'react-md';

export default class SocialUserItem extends Component {

    render() {

        let avatar = require('../../images/avatar_default.jpg');

        let btnText = this.props.user.follow ? 'Abonné' : 'Suivre';
        let btnClass = this.props.user.follow ? 'btn' : 'btn subscribe';

        return (
            <div className="userFollow__user">
                <Avatar src={avatar} role="presentation"/>
                <p>{this.props.user.username}</p>

                <div className={btnClass}>{btnText}</div>
            </div>
        );
    }
}