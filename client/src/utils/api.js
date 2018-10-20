/**
 * Code to interface with the node server
 * To be imported for the use of the async action creators
 */

import axios from './axios';

export function getCafes(){
  return axios.get('/cafes')
  .then(res => res.data)
  .catch(err => err)
}
