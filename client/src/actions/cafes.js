import axios from '../utils/axios';
import {showLoading, hideLoading} from 'react-redux-loading';

export const FETCH_CAFES = 'FETCH_CAFES';
export const RECEIVE_CAFES = 'RECEIVE_CAFES';
export const CAFE_ERROR = 'CAFE_ERROR';

function fetchCafes(){
  return {
    type: FETCH_CAFES
  }
}

function receiveCafes(cafes){
  return {
    type: RECEIVE_CAFES,
    cafes
  }
}

function cafeError(error){
  return {
    type: CAFE_ERROR,
    error
  }
}

export function handleFetchCafes(){
  return dispatch => {
    dispatch(fetchCafes);
    axios.get('/cafes')
      .then(res => {
        dispatch(receiveCafes(res.data))
      })
      .catch(err => {
        console.log(err);
        dispatch(cafeError(err.response.data));
      });
  };
}