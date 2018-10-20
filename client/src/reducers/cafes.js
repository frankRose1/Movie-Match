import {GET_CAFES} from '../actions/cafes';

export default function cafes(state, action){
  switch (action.type) {
    case GET_CAFES:
      return {
        ...state,
      }
    default:
      return state;
  }
}