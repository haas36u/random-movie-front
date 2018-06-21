import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import MovieShow from '../containers/Movie/MovieShow';

import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Base/Header';
import Footer from '../components/Base/Footer';

const AppRouter = () => (
  <BrowserRouter>
    <div className="wrapper">
        <Header />
        <div className="main">
            <Switch>
                <Route path="/" component={Homepage} exact={true} />
                <Route path="/movies/id" component={MovieShow} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
        <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;