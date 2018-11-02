/**
 * Reducer for a single cafe
 */
import {INIT_CREATE_CAFE, CREATE_CAFE_SUCCESS, CREATE_CAFE_FAIL} from '../actions/cafe';

const initalState = {
  loading: false,
  error: null
};

export default function cafe(state = initalState, action){
  switch (action.type) {
    case INIT_CREATE_CAFE:
      return {
        ...state,
        loading: true
      }
    case CREATE_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }
    case CREATE_CAFE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}
