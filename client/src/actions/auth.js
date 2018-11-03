import {showLoading, hideLoading} from 'react-redux-loading';
import axios from '../utils/axios';
import setAuthHeaders from '../utils/setAuthHeaders';
import jwt_decode from 'jwt-decode';

export const AUTH_REQUEST = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

function authRequest(){
  return {
    type: AUTH_REQUEST
  }
}

function authSuccess(token){
  setAuthHeaders(token);
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

function setCurrentUser(token){
  const decodedUser = jwt_decode(token);
  return {
    type: SET_CURRENT_USER,
    user: decodedUser
  }
}

export function logout(){
  localStorage.removeItem('token');
  setAuthHeaders(false);
  return {
    type: AUTH_LOGOUT
  }
}


export function handleAuth({email, password}, history){
  return dispatch => {
    dispatch(showLoading());
    dispatch(authRequest());
    axios.post('/users/login', {email, password})
      .then(res => {
        const {token} = res.data;
        localStorage.setItem('token', token);
        dispatch(authSuccess(token));
        dispatch(setCurrentUser(token));
        dispatch(hideLoading());
        history.push('/');
      })
      .catch(err => {
        dispatch(authFail(err.response.data))
        dispatch(hideLoading())
      });
  }
}

//log the user in upon signing up
export function handleRegister({email, password, confirmPassword, name}, history){
  return dispatch => {
    dispatch(authRequest()); //set loading to true
    axios.post('/users/register', {email, password, confirmPassword, name})
      .then(res => {
        const {token} = res.data;
        localStorage.setItem('token', token);
        dispatch(authSuccess(token));
        dispatch(setCurrentUser(token));
        history.push('/');
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
      dispatch(setCurrentUser(token));
    }
  };
}