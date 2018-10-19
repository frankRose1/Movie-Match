import React, { Component } from 'react';
import Form from '../components/styles/FormStyles';
import SubmitButton from '../components/UI/SubmitButton';
import {Route, Link, withRouter} from 'react-router-dom';
import PasswordReset from './PasswordReset';
import axios from '../axios';

class Auth extends Component {

  state = {
    loading: false,
    formIsValid: false,
    error: false,
    email: '',
    password: ''
  }
  
  addToState = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  storeAuthToken = (res) => {
    console.log(res);
    // localStorage.setItem('token', 'tokendata');
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('/users/login', data)
      .then(res => {
        this.setState({loading: false, email: '', password: ''});
      })
      .catch(err => {
        console.log(err);
        this.setState({error: err, loading: false});
      });
  };

  render() {

    return (
      <div>
        <Form className="styled-form" method="post" onSubmit={this.handleSubmit}>
          <h2>Sign In</h2>
            <fieldset disabled={this.state.loading} aria-busy={this.state.loading}>
              <div>
                  <label htmlFor="email">
                    <input 
                      type="email" 
                      name="email"
                      id="email"
                      value={this.state.email}
                      placeholder="Email Address" 
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
                      value={this.state.password} 
                      placeholder="Your password" 
                      onChange={this.addToState} 
                      required/>
                  </label>
                </div>
                <p className="reset-pw">Forgot your password? 
                  <Link to={`${this.props.match.url}/reset`}>
                  Request a reset
                  </Link>
                </p>
              <SubmitButton 
                disabledBtn={this.state.loading}
                text="Sign In!" />
            </fieldset>
        </Form>
        <Route path={`${this.props.match.url}/reset`} component={PasswordReset}/>
      </div>
    );
  }
}

export default withRouter(Auth);