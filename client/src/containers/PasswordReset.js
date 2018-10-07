import React, { Component } from 'react';
import axios from '../axios';
import SubmitButton from '../components/UI/SubmitButton';
import Form from '../components/styles/FormStyles';

class PasswordReset extends Component {
  state = {
    loading: false,
    error: false,
    email: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});
    const data = {email: this.state.email};
    axios.post('/users/account/reset', data)
      .then(res => {
        console.log(res);
        this.setState({loading: false, email: ''});
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false, error: err});
      });
  };

  addToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
    <Form onSubmit={this.handleSubmit} method="post">
      <h2>Reset Password</h2>
      <fieldset disabled={this.state.loading} aria-busy={this.state.loading}>
        <div>
          <label htmlFor="email">
            <input 
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              placeholder="Your Email" 
              onChange={this.addToState} 
              required />
          </label>
        </div>
        <SubmitButton
          disabledBtn={this.state.loading}
          text="Reset"/>
      </fieldset>
    </Form>
    );
  }
}

export default PasswordReset;