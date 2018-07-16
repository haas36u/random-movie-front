import React, { Component } from 'react';
import axios from 'axios';
import { TextField } from 'react-md';
import SocialUserItem from '../../components/Social/SocialUserItem';

export default class SocialIndex extends Component {

    constructor(props){
        super(props);
        this.state = {
            followedUsers : [],
            followedUsersUI : [],
            loader: this.loader
        };
    }

    loader = <span className="spinner"><svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke="{{config.c2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg> </span>;        

    componentDidMount() {
        this.getFollowedUsers();
    }

    getFollowedUsers = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/users/follows`, headers : {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}})
        .then((response) => {
            if(response.data.length === 0) return this.setState({followedUsers: <p className="noResult">Vous ne suivez personne actuellement</p>});

            this.createUsersUI(response.data);

            this.setState({followedUsers: response.data, loader: null});
        });
    }

    getUsersByUsername = (e) => {
        e.preventDefault();

        const username = e.target.elements.username.value.toLowerCase();
        
        if(!username) return this.createUsersUI(this.state.followedUsers);

        const followedUsers = this.state.followedUsers.filter(function(collection){
            return collection.username.toLowerCase().includes(username);
        });

        if(followedUsers.length === 0) return this.setState({followedUsersUI: <p className="noResult">Aucun résultat trouvé</p>});

        this.createUsersUI(followedUsers);
    }

    createUsersUI = (users) => {
        const followedUsers = users.map(function(user, key){
            return (
                <SocialUserItem user={user} key={key}/>
            )
        });
        this.setState({followedUsersUI : followedUsers});
    }
    
    render() {
    
        return (
            <div id="social" className="socialUserSearch">
                {this.state.loader}
                <div className="socialContainer social__item--background">

                    <h2><i className="fas fa-users"></i>Abonnements</h2>

                    <form className="searchContainer" onSubmit={this.getUsersByUsername}>
                        <TextField id="search" placeholder="Rechercher" className="search" type="search" name="username"/>
                        <button className="cursor"><i className="fas fa-search"></i></button>
                    </form>
                    {this.state.followedUsersUI}
                </div>
            </div>
        );
    }
}