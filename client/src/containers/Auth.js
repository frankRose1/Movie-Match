import React, { Component } from 'react';
import Form from '../components/styles/FormStyles';
import Input from '../components/UI/Input';
import axios from '../axios';

class Auth extends Component {

  state = {
    loading: false,
    formIsValid: false,
    error: false,
    email: '',
    password: '',
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

  
  addToState = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  // to be used on logout
  removeTokenExample = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('someOtherField');
  };

  storeAuthToken = (resData) => {
    console.log(resData);
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
        this.storeAuthToken(res);
        this.setState({loading: false, email: '', password: ''});
      })
      .catch(err => {
        console.log(err);
        this.setState({error: err, loading: false});
      });
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
            <button type="submit" disabled={this.state.loading}>Sign In</button>
          </fieldset>
      </Form>
    );
  }
}

export default Auth;