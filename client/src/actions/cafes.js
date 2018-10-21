import axios from '../utils/axios';
import {showLoading, hideLoading} from 'react-redux-loading';

export const GET_CAFES = 'GET_CAFES';


function receiveCafes(cafes){
  return {
    type: GET_CAFES,
    cafes
  }
}

// export function handleGetCafes(){
//   return dispatch => {
//     dispatch(showLoading());
//     return getCafes()
//       .then(cafes => dispatch(receiveCafes(cafes)))
//       .then( () => dispatch(hideLoading()));
//   }
// }