import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {handleLogout} from '../actions/auth';

class Logout extends Component {

  componentDidMount() {
    this.props.dispatch(handleLogout())
  }
  
  render() {
    return (
      <Redirect to="/" />
    );
  }
}


export default connect()(Logout);