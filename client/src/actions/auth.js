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

//TODO: may not need a call to the backend, logout might be the only action creator needed
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
        const {token} = res.data;
        localStorage.setItem('token', token);
        setAuthHeaders(token);
        dispatch(authSuccess(token));
        dispatch(hideLoading());
      })
      .catch(err => {
        dispatch(authFail(err.response.data))
        dispatch(hideLoading())
      });
  }
}

//log the user in upon signing up
export function handleRegister({email, password, confirmPassword, name}){
  return dispatch => {
    dispatch(authRequest()); //set loading to true
    axios.post('/users/register', {email, password, confirmPassword, name})
      .then(res => {
        const {token} = res.data;
        localStorage.setItem('token', token);
        setAuthHeaders(token);
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
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