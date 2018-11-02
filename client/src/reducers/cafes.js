import {RECEIVE_CAFES, FETCH_CAFES, CAFE_ERROR} from '../actions/cafes';

const initialState = {
  loading: false,
  cafes: [],
  error: null
}

export default function cafes(state = initialState, action){
  switch (action.type) {
    case FETCH_CAFES:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_CAFES:
      return {
        ...state,
        cafes: action.cafes,
        loading: false
      }
    case CAFE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}