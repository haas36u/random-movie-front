import React, { Component } from 'react';
import axios from 'axios';

import NotificationsItem from '../../components/Notifications/NotificationsItem';

export default class NotificationsIndex extends Component {

    constructor(props){
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = 'application/json';
        super(props);
        this.state = {
            notifications : [],
            loader : null
        };
    }

    loader = <span className="spinner"><svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke="{{config.c2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg> </span>;        

    componentDidMount() {
        this.getNotifications();
    }

    getNotifications = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/notifications`, headers : {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            this.setState({notifications: response.data, loader: null});
        });
    }

    markAllAsReaded = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/notifications/mark_all_as_seen`, headers : {"Authorization" : localStorage.getItem('token')}})
        .then(() => {
            let notifs = this.state.notifications;
            for (let i = 0; i < notifs.length; i++) {
                notifs[i].seen = true;
            }
            this.setState({notifications: notifs});
        });
    }

    removeAll = () => {
        axios({method: 'delete', url : `${process.env.REACT_APP_API_URL}/notifications/remove_all`, headers : {"Authorization" : localStorage.getItem('token')}})
        .then(() => {
            this.setState({notifications: []});
        });
    }
    
    render() {
        
        return (
            <div id="notifications" className="container">
                {this.state.loader}

                <h2 className="text-center">Toutes mes notifications</h2>
                <div className="flex notifications__actions">
                    <div className="link text-bold" onClick={this.markAllAsReaded}>Tout marquer comme lu</div>
                    <div className="link text-bold" onClick={this.removeAll}>Tout supprimer</div>
                </div>

                <div className="notificationsContainer">
                    {
                        this.state.notifications.map(function(notif){
                            return (
                                <NotificationsItem notif={notif} key={notif.id}/>
                            )
                        })
                    }
                    {
                        this.state.notifications.length === 0 && <div className="noResults">Aucune notifications</div>
                    }
                </div>
            </div>
        );
    }
}