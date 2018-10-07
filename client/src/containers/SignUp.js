import React, { Component } from 'react';
import axios from '../axios';
import Form from '../components/styles/FormStyles';
import SubmitButton from '../components/UI/SubmitButton';

class SignUp extends Component {
  state = {
    loading: false,
    error: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    axios.post('/users/register', data)
    .then(res => {
      console.log(res);
      this.setState({ 
        loading: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    })
    .catch(err => {
      this.setState({loading: false, error: err});
    });
  };

  addToState = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  render() {
    return (
      <Form method="post" onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <fieldset disabled={this.state.loading} aria-busy={this.state.loading}>
          <div>
            <label htmlFor="name">
              <input 
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                value={this.state.name}
                onChange={this.addToState}
                required/>
            </label>
          </div>
          <div>
            <label htmlFor="email">
              <input 
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.addToState}
                required/>
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input 
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.addToState}
                required/>
            </label>
          </div>
          <div>
            <label htmlFor="confirmPassword">
              <input 
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.addToState}
                required/>
            </label>
          </div>
          <SubmitButton 
            disabledBtn={this.state.loading}
            text="Sign Up!" />
        </fieldset>
      </Form>
    );
  }
}

export default SignUp;