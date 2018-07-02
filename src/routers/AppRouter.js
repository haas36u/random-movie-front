import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from '../containers/Homepage';
import MovieIndex from '../containers/Movie/MovieIndex';
import MovieShow from '../containers/Movie/MovieShow';
import Registration from '../containers/User/Registration';
import Connection from '../containers/User/Connection';
import Profile from '../containers/User/Profile';
import Cgu from '../containers/static/Cgu';
import LegalMentions from '../containers/static/LegalMentions';

import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Base/Header';
import Footer from '../components/Base/Footer';

const closeNav = () => {
    document.getElementById("sidenav").style.width = "0";
}

const randomAction = () => {

}

let logo = require('../images/logo.png');

const AppRouter = () => (
  <BrowserRouter>
    <div className="wrapper">
        <Header />
        <div className="main" onClick={closeNav}>
            <Switch>
                <Route path="/" component={Homepage} exact={true} />
                <Route path="/movies" component={MovieIndex} exact={true}/>
                <Route path="/movies/:id" component={MovieShow}/>
                <Route path="/registration" component={Registration} exact={true} />
                <Route path="/login" component={Connection} exact={true} />
                <Route path="/profile" component={Profile} exact={true} />
                <Route path="/cgu" component={Cgu} exact={true} />
                <Route path="/legal-mentions" component={LegalMentions} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
            <img src={logo} alt="Logo Random Movie" title="Film aléatoire" onClick={randomAction} className="logo"/>
        </div>
        <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;