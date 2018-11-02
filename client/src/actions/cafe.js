/**
 * Actions for a single cafe
 */

import axios from '../utils/axios';

export const INIT_CREATE_CAFE = 'INIT_CREATE_CAFE';
export const CREATE_CAFE_SUCCESS = 'CREATE_CAFE_SUCCESS';
export const CREATE_CAFE_FAIL = 'CREATE_CAFE_FAIL';

function initCreateCafe(){
  return {
    type: INIT_CREATE_CAFE
  }
}

function createCafeSuccess(){
  return {
    type: CREATE_CAFE_SUCCESS
  }
}

function createCafeFail(error){
  return {
    type: CREATE_CAFE_FAIL,
    error
  }
}

export function handleCreateCafe(cafeData){
  return dispatch => {
    dispatch(initCreateCafe);
    axios.post('/cafes', {...cafeData})
      .then(res => {
        dispatch(createCafeSuccess());
      })
      .catch(err => {
        dispatch(createCafeFail(err.response.data));
      });

  }
}