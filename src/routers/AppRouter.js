import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated, isAdmin } from '../actions/auth';

import Homepage from '../containers/Homepage';
import MovieIndex from '../containers/Movie/MovieIndex';
import MovieShow from '../containers/Movie/MovieShow';
import CommentsIndex from '../containers/Comments/CommentsIndex';
import CollectionUpdate from '../containers/Collection/CollectionUpdate';
import SocialIndex from '../containers/Social/SocialIndex';
import SocialUserSearch from '../containers/Social/SocialUserSearch';
import SocialUserIndex from '../containers/Social/SocialUserIndex';
import Registration from '../containers/User/Registration';
import RegistrationFavoriteMovies from '../containers/User/RegistrationFavoriteMovies';
import AdminCommentsIndex from '../containers/Admin/Comment/AdminCommentsIndex';
import Login from '../containers/User/Login';
import Profile from '../containers/User/Profile';
import NotificationsIndex from '../containers/Notifications/NotificationsIndex';
import Cgu from '../containers/static/Cgu';
import LegalMentions from '../containers/static/LegalMentions';

import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Base/Header';
import Footer from '../components/Base/Footer';
import TooltipIcon from '../components/Badge/TooltipIcon';
import RegistrationFavoriteMoviesTypes from '../containers/User/RegistrationFavoriteMoviesType';

const closeNav = (e) => {
    e.stopPropagation();
    document.getElementById("sidenav").style.width = "0";
}

const randomAction = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/movies/random`)
    .then((response) => {
        window.location.href = '/movies/' + response.data.id;
    })
    .catch(error => {
        console.log(error)
    });
}

let logo = require('../images/logo.png');

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
)  

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated() === true && isAdmin() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
)  

const AppRouter = () => (
  <BrowserRouter>
    <div className="wrapper">
        <Header />
        <div className="main" onClick={closeNav}>
            <Switch>
                <Route path="/" component={Homepage} exact={true} />
                <Route path="/movies" component={MovieIndex} exact={true}/>
                <PrivateRoute path="/movies/:id/comments" component={CommentsIndex}/>
                <Route path="/movies/:id" component={MovieShow}/>
                <PrivateRoute path="/collections/:id/update" component={CollectionUpdate} />
                <PrivateRoute path="/social" component={SocialIndex} exact={true} />
                <PrivateRoute path="/social/search" component={SocialUserSearch} exact={true} />
                <PrivateRoute path="/social/users" component={SocialUserIndex} exact={true} />
                <Route path="/registration" component={Registration} exact={true} />
                <PrivateRoute path="/registration/select-movies" component={RegistrationFavoriteMovies} exact={true} />
                <PrivateRoute path="/registration/select-movies-types" component={RegistrationFavoriteMoviesTypes} exact={true} />
                <Route path="/login" component={Login} exact={true} />
                <PrivateRoute path="/profile" component={Profile} exact={true} />
                <PrivateRoute path="/profile/:id" component={Profile} />
                <AdminRoute path="/admin" component={AdminCommentsIndex}/>
                <PrivateRoute path="/notifications" component={NotificationsIndex} exact={true} />
                <Route path="/cgu" component={Cgu} exact={true} />
                <Route path="/legal-mentions" component={LegalMentions} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
            <div className="logo">
                <TooltipIcon tooltipLabel="Film aléatoire" tooltipPosition="top"> 
                    <img src={logo} alt="Logo Random Movie" onClick={randomAction} />
                </TooltipIcon>
            </div>
        </div>
        <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;