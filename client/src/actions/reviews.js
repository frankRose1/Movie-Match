import axios from '../utils/axios';

export const INIT_ASYNC_REVIEW = 'INIT_ASYNC_REVIEW';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';
export const REVIEW_FAIL = 'REVIEW_FAIL';

function initAsyncReview(){
  return {
    type: INIT_ASYNC_REVIEW
  }
}

function reviewSuccess(){
  return {
    type: REVIEW_SUCCESS
  }
}

function reviewFail(error){
  return {
    type: REVIEW_FAIL,
    error
  }
}

export function handleCreateReview(reviewData, cafeId){
  return dispatch => {
    dispatch(initAsyncReview());
    axios.post(`/reviews/${cafeId}`, {...reviewData})
      .then(res => {
        console.log(res);
        dispatch(reviewSuccess());
      })
      .catch(err => {
        dispatch(reviewFail(err.response.data));
      });
  }
}