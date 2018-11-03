import React, { Component } from 'react';
import {connect} from 'react-redux';
import Form from './styles/FormStyles';
import SubmitButton from './UI/SubmitButton';
import Error from './ErrorMessage';
import {handleRegister} from '../actions/auth';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      ...this.state
    };
    this.props.dispatch(handleRegister(data, this.props.history));
  };

  addToState = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value});
  };

  render() {

    const {loading, error, isAuthenticated} = this.props;

    if (isAuthenticated) {
      this.props.history.push('/');
    }

    return (
      <Form method="post" onSubmit={this.handleSubmit}>
        <Error error={error} />
        <h2>Sign Up</h2>
        <fieldset disabled={loading} aria-busy={loading}>
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
            disabledBtn={loading}
            text="Sign Up!" />
        </fieldset>
      </Form>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  loading: auth.loading,
  error: auth.error,
  isAuthenticated: auth.token !== null
});

export default connect(mapStateToProps)(SignUp);