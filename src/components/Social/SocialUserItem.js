import React, { Component } from 'react';
import { Avatar } from 'react-md';

export default class SocialUserItem extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            btnText : props.user.follow ? 'Abonné' : 'Suivre',
            btnClass : props.user.follow ? 'btn' : 'btn subscribe'
        }
    }

    followUser = () => {
        // do request
        this.setState({btnText: this.state.btnText === 'Suivre' ? 'Abonné' : 'Suivre', btnClass: this.state.btnClass === 'btn' ? 'btn subscribe' : 'btn'});
    }

    render() {

        let avatar = require('../../images/avatar_default.jpg');

        return (
            <div className="userFollow__user">
                <Avatar src={avatar} role="presentation"/>
                <p>{this.props.user.username}</p>

                <div className={this.state.btnClass} onClick={this.followUser}>{this.state.btnText}</div>
            </div>
        );
    }
}