import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
require('dotenv').config();
const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'))