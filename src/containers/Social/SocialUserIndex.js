import React, { Component } from 'react';
import axios from 'axios';
import { TextField } from 'react-md';
import SocialUserItem from '../../components/Social/SocialUserItem';
import Loader from '../../components/Base/Loader';

export default class SocialIndex extends Component {

    constructor(props){
        super(props);
        this.state = {
            followedUsers : [],
            followedUsersUI : []
        };
    }

    componentDidMount() {
        this.getFollowedUsers();
    }

    getFollowedUsers = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/users/follows`, headers : {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}})
        .then((response) => {
            if(response.data.length === 0) return this.setState({followedUsers: <p className="noResult">Vous ne suivez personne actuellement</p>});

            this.createUsersUI(response.data);

            this.setState({followedUsers: response.data, loader: false});
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
                <Loader show={this.state.loader}/>
                <div className="socialContainer social__item--background">

                    <h2><i className="fas fa-users"></i>Mes abonnements</h2>

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