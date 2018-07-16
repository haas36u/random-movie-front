import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

import SocialItem from '../../components/Social/SocialItem';

export default class NotificationsIndex extends Component {

    constructor(props){
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            notificationsList: [],
            loader : null
        };
    }

    loader = <span className="spinner"><svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke="{{config.c2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg> </span>;        

    componentDidMount() {
        this.getActuality();
    }

    getActuality = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/notifications`, headers : {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            let notificationsList = response.data.map(function(notif){
                return (
                    <div className={notif.seen ? 'notifsItem' : 'notifsItem notSeen'} key={notif.id}>
                        {!notif.seen && <p className="notifsItem--markAsReaded">Marquer comme lue</p>}
                        <i className="fas fa-trophy"></i>
                        <div>
                            <p>{notif.notification.message}</p>
                            <p>{moment(notif.notification.date).fromNow()}</p>
                        </div>
                    </div>
                )
            });

            if (notificationsList.length === 0) notificationsList = <div className="noResults">Aucune notifications</div>;

            this.setState({notificationsList: notificationsList, loader: null});
        });
    }
    
    render() {
        
        return (
            <div id="notifications" className="container">
                {this.state.loader}

                <h2 className="text-center">Toutes mes notifications</h2>
                <div className="flex notifications__actions">
                    <div className="link text-bold">Tout marquer comme lu</div>
                    <div className="link text-bold">Tout supprimer</div>
                </div>

                <div className="notificationsContainer">
                    {this.state.notificationsList}
                </div>
            </div>
        );
    }
}