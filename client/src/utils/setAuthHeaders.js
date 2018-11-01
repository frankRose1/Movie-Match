/**
 * Handle the authorizaion headers on the axios instance when a users signs in our out
 */

import axios from './axios';

const setAuthHeaders = token => {
  if (token) {
    //apply the token to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //delete the header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthHeaders;

