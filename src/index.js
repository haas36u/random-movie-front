import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
require('dotenv').config();

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();