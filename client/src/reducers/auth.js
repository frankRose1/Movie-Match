import {SET_AUTHED_USER} from '../actions/auth';

export default function auth(state = null, action){
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}