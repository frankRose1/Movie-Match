import React, { Component } from "react";
import Form from "./styles/FormStyles";
import { connect } from "react-redux";
import { handleAuth } from "../actions/auth";
import Error from "./ErrorMessage";

class Auth extends Component {
  state = {
    formIsValid: false,
    email: "",
    password: ""
  };

  addToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.dispatch(handleAuth(data, this.props.history));
  };


  render() {
    const { loading, error, isAuthenticated } = this.props;

    if (isAuthenticated) {
      this.props.history.push('/');
    }

    return (
      <Form method="post" onSubmit={this.handleSubmit}>
        <Error error={error} />
        <h2>Sign In</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <div>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                placeholder="Email Address"
                onChange={this.addToState}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                placeholder="Your password"
                onChange={this.addToState}
                required
              />
            </label>
          </div>
          <button 
            type="submit" 
            disabled={loading}>
              Sign{loading ? 'ing' : ''} In!
            </button>
        </fieldset>
      </Form>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.token !== null
  };
};

export default connect(mapStateToProps)(Auth);
