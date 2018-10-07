import React, { Component } from 'react';
import axios from '../axios';

class Logout extends Component {

  removeToken = () => {
    console.log('remove token');
    // localStorage.removeItem('token');
    // localStorage.removeItem('someOtherField');
  };

  handleLogout = () => {
    axios.get('/users/logout')
    .then(res => {
      console.log(res);
      this.removeToken();
    })
    .catch(err => {
      console.log(err);
    });
  };
  render() {
    return (
      <button onClick={this.handleLogout}>Logout</button>
    );
  }
}

export default Logout;