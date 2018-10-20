import {combineReducers} from 'redux';
import authedUser from './auth';
import cafes from './cafes';
import {loadingBarReducer} from 'react-redux-loading';


export default combineReducers({
  authedUser,
  loadingBar: loadingBarReducer
});