import React, { Component } from 'react';
import Input from '../components/UI/Input';
import axios from '../axios';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Your Email Address',
          name: 'email',
          id: 'email'
        },
        value: ''
      },
      password: {
        elType: 'input',
        elConfig: {
          type: 'password',
          placeholder: 'Your Password',
          name: 'password',
          id: 'password'
        },
        value: ''
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

    const authForm = formElementsArray.map(formEl => (
      <Input 
        handleChange={ (e) => this.handleChange(e, formEl.id) }
        key={formEl.id}
        elementType={formEl.config.elType}
        elementConfig={formEl.config.elConfig}
        value={formEl.config.value}/>
    ));

    return (
      <form className="styled-form" method="post" onSubmit={this.handleSubmit}>
        {authForm}
      </form>
    );
  }
}

export default Auth;