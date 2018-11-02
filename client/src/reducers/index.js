import {combineReducers} from 'redux';
import auth from './auth';
import cafes from './cafes';
import cafe from './cafe';
import {loadingBarReducer} from 'react-redux-loading';


export default combineReducers({
  auth,
  cafes,
  cafe,
  loadingBar: loadingBarReducer
});