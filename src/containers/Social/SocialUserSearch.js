import React, { Component } from 'react';
import axios from 'axios';
import { TextField } from 'react-md';
import SocialUserItem from '../../components/Social/SocialUserItem';

export default class SocialIndex extends Component {

    constructor(props){
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            searchedUsers : [],
            username: null
        };
    }

    searchUser = (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value.trim();
        if(!username) return;

        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/users?username=${username}`, headers : {"Authorization" : localStorage.getItem('token')}}).then((response) => {
            if(response.data.length === 0) return this.setState({searchedUsers: <p className="noResult">Aucun résultat trouvé</p>});

            const searchedUsers = response.data.map(function(user, key){
                return (
                    <SocialUserItem user={user} key={key}/>
                )
            });

            this.setState({searchedUsers: searchedUsers});
        });
    }

    render() {
    
        return (
            <div id="social" className="socialUserSearch">
                <div className="socialContainer social__item--background">

                    <h2><i className="fas fa-users"></i>Chercher un abonné</h2>

                    <form className="searchContainer" onSubmit={this.searchUser}>
                        <TextField id="search" placeholder="Rechercher" className="search" type="search" name="username"/>
                        <button className="cursor"><i className="fas fa-search"></i></button>
                    </form>
                    {this.state.searchedUsers}
                </div>
            </div>
        );
    }
}