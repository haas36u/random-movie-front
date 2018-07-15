import React, { Component } from 'react';
import { Avatar } from 'react-md';
import axios from 'axios';

export default class SocialUserItem extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            btnText : props.user.isFollow ? 'Abonné' : 'Suivre',
            btnClass : props.user.isFollow ? 'btn' : 'btn subscribe'
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({btnText : nextProps.user.isFollow ? 'Abonné' : 'Suivre', btnClass : nextProps.user.isFollow ? 'btn' : 'btn subscribe'});   
    }

    followUser = () => {
        axios({method: 'post', url : `${process.env.REACT_APP_API_URL}/users/follow`, headers : {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}, data: {follow: `api/users/${this.props.user.id}`}})
        .then((response) => {
            this.setState({btnText: this.state.btnText === 'Suivre' ? 'Abonné' : 'Suivre', btnClass: this.state.btnClass === 'btn' ? 'btn subscribe' : 'btn'});
        });
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