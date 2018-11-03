/**
 * Actions for a single cafe
 */

import axios from '../utils/axios';

export const INIT_ASYNC_CAFE = 'INIT_ASYNC_CAFE';
export const CAFE_SUCCESS = 'CAFE_SUCCESS';
export const CAFE_FAIL = 'CAFE_FAIL';
export const RECEIVE_CAFE = 'RECEIVE_CAFE';
export const CLEAR_CAFE_ERROR = 'CLEAR_CAFE_ERROR';

function initAsyncCafe(){
  return {
    type: INIT_ASYNC_CAFE
  }
}

function cafeSuccess(){
  return {
    type: CAFE_SUCCESS
  }
}

function cafeFail(error){
  return {
    type: CAFE_FAIL,
    error
  }
}

function receiveCafe(cafe){
  return {
    type: RECEIVE_CAFE,
    cafe
  }
}

export function clearCafeError(){
  return {
    type: CLEAR_CAFE_ERROR
  }
}

export function handleCreateCafe(cafeData, history){
  return dispatch => {
    dispatch(initAsyncCafe());
    axios.post('/cafes', {...cafeData})
      .then(res => {
        dispatch(cafeSuccess());
        history.push('/');
      })
      .catch(err => {
        dispatch(cafeFail(err.response.data));
      });
  }
}

export function fetchCafeBySlug(slug){
  return dispatch => {
    dispatch(initAsyncCafe());
    axios.get(`/cafe/${slug}`)
      .then(res => {
        console.log(res);
        dispatch(receiveCafe(res.data));
        dispatch(cafeSuccess());
      })
      .catch(err => {
        dispatch(cafeFail(err.response.data));
      });
  }
}