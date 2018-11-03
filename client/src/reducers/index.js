import {combineReducers} from 'redux';
import auth from './auth';
import cafes from './cafes';
import cafe from './cafe';
import reviews from './reviews';
import {loadingBarReducer} from 'react-redux-loading';

export default combineReducers({
  auth,
  cafes,
  cafe,
  reviews,
  loadingBar: loadingBarReducer
});