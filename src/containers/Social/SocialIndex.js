import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Avatar} from 'react-md';

import SocialItem from '../../components/Social/SocialItem';
import Loader from '../../components/Base/Loader';

export default class SocialIndex extends Component {

  constructor(props) {
    axios.defaults.headers['Content-Type'] = 'application/json';
    axios.defaults.headers['Accept'] = 'application/json';
    super(props);
    this.state = {
      total: 0,
      currentCount: 0,
      offset: 3,
      actualityList: [],
      isFetching: false,
      currentPage: 1,
      followedUsers: []
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.loadOnScroll);
    this.getTotalFeed();
    this.getFollowedUsers();
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.loadOnScroll);
  }

  getTotalFeed = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/feeds/count`,
      headers: {"Authorization": localStorage.getItem('token'), 'Content-Type': 'application/json'},
    })
      .then((response) => {
        this.setState({total: response.data});
        this.getActuality();
      });
  }

  loadOnScroll = () => {
    if (this.state.currentCount === this.state.total) return;
    let el = document.getElementById('content-end');
    if (el === null) return;
    let rect = el.getBoundingClientRect();
    let isAtEnd = (
      // rect.top >= 0 &&
      // rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
    if (isAtEnd) {
      //User at the end of content. load more content
      if (!this.state.isFetching) {
        this.setState({isFetching: true, loader: true});

        //get content from server
        if (this.state.currentCount !== this.state.total) {
          this.getActuality()
        }
      }
    }
  }

  getActuality = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/feeds`,
      headers: {"Authorization": localStorage.getItem('token'), 'Content-Type': 'application/json'},
      params: {page: this.state.currentPage},
    })
      .then((response) => {
        this.setState((prevState) => {
          return {
            isFetching: false,
            currentCount: prevState.currentCount + response.data.length,
            actualityList: [...prevState.actualityList, ...response.data],
            currentPage: prevState.currentPage + 1,
            loader: false
          }
        })
      });
  }

  getFollowedUsers = () => {
    let avatar = require('../../images/avatar_default.jpg');

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/users/follows`,
      headers: {"Authorization": localStorage.getItem('token'), 'Content-Type': 'application/json'}
    })
      .then((response) => {
        const users = response.data.slice(0, 4);

        const followedUsers = users.map(function (user) {
          return (
            <Link to={`/profile/${user.id}`} className="userFollow__user" key={user.id}>
              <Avatar src={avatar} role="presentation"/>
              <p>{user.username}</p>
            </Link>
          )
        });

        this.setState({followedUsers: followedUsers});
      });
  }

  render() {

    return (
      <div id="social">
        <Loader show={this.state.loader}/>
        <div className="socialContainer">
          <div className="userFollow userFollowTop">
            <h2>Vous suivez...</h2>
            <div>
              {this.state.followedUsers}

              <Link to="/social/search" className="userFollow__user">
                <i className="fas fa-plus-circle"></i>
                <p>Chercher un abonné</p>
              </Link>
              <Link to="/social/users">Voir la liste complète</Link>
            </div>
          </div>
          <div className="socialContainer__items">
            {
              this.state.actualityList.length > 0 &&
              this.state.actualityList.map((current, key) => {
                return <SocialItem actuality={current} key={key}/>
              })
            }
            {
                this.state.actualityList.length === 0 && <p>Aucune activités n'a été enregistrés de la part de vos abonnements</p>
            }
            {
              (this.state.currentCount !== this.state.total) ?
                <div id="content-end">
                 Nous chargeons le contenu pour vous...
                </div> : null
            }
          </div>

          <div className="userFollow userFollowAside">
            <h2>Vous suivez...</h2>
            <div>
              {this.state.followedUsers}

              <Link to="/social/search" className="userFollow__user">
                <i className="fas fa-plus-circle"></i>
                <p>Chercher un abonné</p>
              </Link>
              <Link to="/social/users">Voir la liste complète</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
