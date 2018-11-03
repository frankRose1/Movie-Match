/**
 * Reducer for a single cafe
 */
import {
  INIT_ASYNC_CAFE, 
  CAFE_SUCCESS, 
  CAFE_FAIL, 
  RECEIVE_CAFE
    } from '../actions/cafe';

const initalState = {
  loading: false,
  error: null,
  cafe: {}
};

export default function cafe(state = initalState, action){
  switch (action.type) {
    case INIT_ASYNC_CAFE:
      return {
        ...state,
        loading: true
      }
    case CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }
    case RECEIVE_CAFE:
      return {
        ...state,
        cafe: action.cafe
      }
    case CAFE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}
