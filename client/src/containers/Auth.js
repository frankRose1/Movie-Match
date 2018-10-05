import React, { Component } from 'react';
import Input from '../components/UI/Input';
import axios from '../axios';

class Auth extends Component {

  state = {
    loading: false,
    formIsValid: false,
    controls: {
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Email Address',
          name: 'email',
          id: 'email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elType: 'input',
        elConfig: {
          type: 'password',
          placeholder: 'Password',
          name: 'password',
          id: 'password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    }
  }

  handleChange = (e, formElement) => {

  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const authFormInputs = formElementsArray.map(formEl => (
      <Input 
        handleChange={ (e) => this.handleChange(e, formEl.id) }
        key={formEl.id}
        invalid={!formEl.config.valid}
        touched={formEl.config.touched}
        shouldValidate={formEl.config.validation}
        elementType={formEl.config.elType}
        elementConfig={formEl.config.elConfig}
        value={formEl.config.value}/>
    ));

    return (
      <form className="styled-form" method="post" onSubmit={this.handleSubmit}>
        <h2>Sign In</h2>
          <fieldset disabled={this.state.loading} aria-busy={this.state.loading}>
            {authFormInputs}
            <button type="submit" disabled={!this.state.formIsValid}>Sign In</button>
          </fieldset>
      </form>
    );
  }
}

export default Auth;