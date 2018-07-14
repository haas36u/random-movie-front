import React, { Component } from 'react';
import { Avatar } from 'react-md';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import MovieCard from '../../components/Movie/MovieCard';
import CollectionItem from '../../components/Collection/CollectionItem';

export default class SocialItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.initalize();
    }

    initalize = () => {
        let userAction;
        let content;
        if (this.props.actuality.notation) {
            content = this.createStars();
            userAction = 'noté';
        } else if (this.props.actuality.comment) {
            content = this.props.actuality.comment.content;
            userAction = 'commenté';
        }

        this.setState({userAction: userAction, content: content});
    }

    createStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if(this.props.actuality.notation.mark > i) stars.push(<i className="fas fa-star" key={i} style={{color: '#F0CC00'}}></i>);
            else stars.push(<i className="fas fa-star" style={{color: '#989898'}}></i>);
        }

        return stars;
    }

    componentDidMount() {
        this.headerContent();
        this.getItem();
    }

    headerContent = () => {
        let headerContent;
        let userUI = <Link to={`/profile/${this.props.actuality.user.id}`} className="text-bold"> {this.props.actuality.user.username}</Link>;
        if (this.props.actuality.collection) headerContent = <p className="m-0"> {userUI} a partagé le tableau : <span className="text-bold">Mes films favoris</span></p>
        else headerContent = <p className="m-0">{userUI} a {this.state.userAction} le film : <Link to={`/movies/${this.props.actuality.movie.id}`} className="text-bold">{this.props.actuality.movie.title}</Link></p>
        
        this.setState({headerContent: headerContent});
    }

    getItem = () => {
        let itemContent;
        if (this.props.actuality.collection) itemContent = <CollectionItem collection={this.props.actuality.collection}/>;
        else  itemContent = <MovieCard movie={this.props.actuality.movie} showUserAction={true}/>

        this.setState({itemContent: itemContent});
    }

    render() {
        moment.locale('fr');

        let avatar = require('../../images/avatar_default.jpg');

        return (
            <div className="social__item social__item--background">
                <div className="social__item__header">
                    <Avatar src={avatar} role="presentation" />
                    <div>
                        {this.state.headerContent}
                        <p>{moment(this.props.actuality.createdAt).startOf('day').fromNow()}</p>
                    </div>
                </div>
                <div className="social__item__content">
                    <p>{this.state.content}</p>
                    {this.state.itemContent}
                </div>
            </div>
        );
    }
}