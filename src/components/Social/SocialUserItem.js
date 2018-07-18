import React, { Component } from 'react';
import { Avatar } from 'react-md';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SocialUserItem extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            btnText : props.user.isFollow ? 'Abonné' : 'Suivre',
            btnClass : props.user.isFollow ? 'followBtn' : 'followBtn subscribe'
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({btnText : nextProps.user.isFollow ? 'Abonné' : 'Suivre', btnClass : nextProps.user.isFollow ? 'followBtn' : 'followBtn subscribe'});   
    }

    followUser = () => {
        axios({method: 'post', url : `${process.env.REACT_APP_API_URL}/users/follow`, headers : {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}, data: {follow: `api/users/${this.props.user.id}`}})
        .then((response) => {
            this.setState({btnText: this.state.btnText === 'Suivre' ? 'Abonné' : 'Suivre', btnClass: this.state.btnClass === 'followBtn' ? 'followBtn subscribe' : 'followBtn'});
        });
    }

    render() {

        let avatar = require('../../images/avatar_default.jpg');

        return (
            <div className="userFollow__user">
                <Link to={`/profile/${this.props.user.id}`}>
                    <Avatar src={avatar} role="presentation"/>
                </Link>
                <Link to={`/profile/${this.props.user.id}`}>
                    <p>{this.props.user.username}</p>
                </Link>

                <div className={this.state.btnClass} onClick={this.followUser}>{this.state.btnText}</div>
            </div>
        );
    }
}