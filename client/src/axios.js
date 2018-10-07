import axios from 'axios';

//to override any default settings defined in this instance, just import the axios module
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;