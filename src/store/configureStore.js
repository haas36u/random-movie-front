import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import authReducer from '../reducers/auth';
import thunk from 'redux-thunk';

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
    combineReducers({
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  
  return store;
}