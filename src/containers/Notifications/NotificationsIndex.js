import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar } from 'react-md';

import SocialItem from '../../components/Social/SocialItem';

export default class NotificationsIndex extends Component {

    constructor(props){
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            actualityList: [],
            followedUsers : [],
            loader : this.loader
        };
    }

    loader = <span className="spinner"><svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke="{{config.c2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg> </span>;        

    componentDidMount() {
        this.getActuality();
        this.getFollowedUsers();
    }

    getActuality = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/feeds`, headers : {"Authorization" : localStorage.getItem('token'), 'Content-Type': 'application/json'}})
        .then((response) => {
            let actualityList = response.data.map(function(item, key){
                return (
                    <SocialItem actuality={item} key={key} />
                )
            });

            if (actualityList.length === 0) actualityList = <p>Aucune activité a été enregistrée de la part de vos abonnements</p>

            this.setState({actualityList: actualityList, loader: null});
        });
    }
    
    render() {
        
        return (
            <div id="notifications">
                {this.state.loader}
            </div>
        );
    }
}