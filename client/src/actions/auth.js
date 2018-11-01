import {showLoading, hideLoading} from 'react-redux-loading';
import axios from '../utils/axios';
import setAuthHeaders from '../utils/setAuthHeaders';

export const AUTH_REQUEST = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

function authRequest(){
  return {
    type: AUTH_REQUEST
  }
}

function authSuccess(token){
  return {
    type: AUTH_SUCCESS,
    token
  }
}

function authFail(error){
  return {
    type: AUTH_FAIL,
    error
  }
}

export function logout(){
  localStorage.removeItem('token');
  setAuthHeaders(false);
  return {
    type: AUTH_LOGOUT
  }
}

export function handleLogout(){
  return dispatch => {
    dispatch(showLoading());
    axios.get('/users/logout')
      .then(res => {
        dispatch(logout());
        dispatch(hideLoading());
      });
  }
}


export function handleAuth({email, password}){
  return dispatch => {
    dispatch(showLoading());
    dispatch(authRequest());
    axios.post('/users/login', {email, password})
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setAuthHeaders(res.data.token);
        dispatch(authSuccess(res.data.token));
        dispatch(hideLoading());
      })
      .catch(err => {
        dispatch(authFail(err.response.data))
        dispatch(hideLoading())
      });
  }
}

export function checkAuthState(){
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token){
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
}