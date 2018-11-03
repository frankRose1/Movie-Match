import {INIT_ASYNC_REVIEW, REVIEW_FAIL, REVIEW_SUCCESS} from '../actions/reviews';

const initialState = {
  loading: false,
  error: null
}

export default function reviews(state = initialState, action){
  switch (action.type) {
    case INIT_ASYNC_REVIEW:
      return { 
        ...state,
        loading: true
      }
    case REVIEW_SUCCESS:
      return { 
        ...state,
        loading: false,
        error: null
      }
    case REVIEW_FAIL:
      return { 
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
