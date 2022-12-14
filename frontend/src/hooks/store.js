import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const getInitialState = () => {
  var favoriteList = {};
  
  if (localStorage.getItem('favoriteList')) {
    try {
      favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    } catch (e) { }
  }
  return {
    favoriteList: favoriteList
  };
}

const composeEnhancer = (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  reducers,
  getInitialState(),
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
  