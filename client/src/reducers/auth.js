import {AUTH_REQUEST, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/auth';

const initalState = {
  loading: false,
  token: null,
  error: null
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
      }
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
}