import {AUTH_REQUEST, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT, SET_CURRENT_USER} from '../actions/auth';

const initalState = {
  loading: false,
  token: null,
  error: null,
  user: {}
}

export default function auth(state = initalState, action){
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        error: null,
        loading: false
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        user: {}
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}