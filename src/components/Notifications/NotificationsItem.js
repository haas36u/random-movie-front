import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import 'moment/locale/fr';

export default class SocialItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifSeen: this.props.notif.seen,
            markAsReadedText : !this.props.notif.seen && <p className="notifsItem--markAsReaded" onClick={this.markAsReaded}>Marquer comme lue</p>
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({notifSeen: nextProps.notif.seen, markAsReadedText : !this.props.notif.seen && <p className="notifsItem--markAsReaded" onClick={this.markAsReaded}>Marquer comme lue</p>});
    }

    markAsReaded = () => {
        axios({method: 'get', url : `${process.env.REACT_APP_API_URL}/notifications/${this.props.notif.id}/mark_as_seen`, headers : {"Authorization" : localStorage.getItem('token')}})
        .then((response) => {
            this.setState({notifSeen: true, markAsReadedText: null});
        });
    }

    render() {
        moment.locale('fr');

        return (
            <div className={this.state.notifSeen ? 'notifsItem' : 'notifsItem notSeen'}>
            {this.state.markAsReadedText}
                <i className="fas fa-trophy"></i>
                <div>
                    <p>{this.props.notif.notification.message}</p>
                    <p>{moment(this.props.notif.notification.date).fromNow()}</p>
                </div>
            </div>
        );
    }
}