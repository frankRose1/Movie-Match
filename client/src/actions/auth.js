import {showLoading, hideLoading} from 'react-redux-loading';
import axios from '../utils/axios';

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
        console.log(res);
        dispatch(authSuccess(res.data.token));
        dispatch(hideLoading());
      })
      .catch(err => {
        console.log(err.response.data.error);
        dispatch(authFail(err.response.data))
        dispatch(hideLoading())
      });
  }
}