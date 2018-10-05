import React, { Component } from 'react';
import Input from '../components/UI/Input';
import axios from '../axios';

class CreateCafe extends Component {
  state = {
    loading: false,
    error: false,
    formIsValid: false,
    createCafeForm: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Cafe Name',
          name: 'name',
          id: 'name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      description: {
        elType: 'textarea',
        elConfig: {
          type: 'text',
          placeholder: 'Cafe description',
          name: 'description',
          id: 'description'
        },
        value: ''
      },
      photo: {
        elType: 'input',
        elConfig: {
          type: 'file',
          placeholder: 'Choose an Image',
          name: 'photo',
          id: 'photo',
          accept: 'image/gif image/jpeg image/png'
        },
        value: ''
      },
      address: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Address',
          name: "location[address]",
          id: 'address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }, 
      lng: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Longitude',
          name: "location[coordinates][0]",
          id: 'lng'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }, 
      lat: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Latitude',
          name: "location[coordinates][1]",
          id: 'lat'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      method: {
        elType: 'select',
        elConfig: {
          options: [
            {value: 'fastest', display: 'Fastest'},
            {value: 'slowest', display: 'Slowest'}
          ],
          name: 'method'
        },
        value: ''
      }
    }
  }

  handleChange = (e, elementIdentifier) => {
    const updatedForm = {
      ...this.state.createCafeForm
    };
    const updatedFormEl = {
      ...updatedForm[elementIdentifier]
    };
    updatedFormEl.value = e.target.value;
    updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
    updatedForm[elementIdentifier] = updatedFormEl;
    //check overall form validity
    let formIsValid = true
    for (let key in updatedForm) {
      if(updatedForm[key].hasOwnProperty('valid')){
        formIsValid = updatedForm[key].valid && formIsValid;
      }
    }
    this.setState({createCafeForm: updatedForm, formIsValid: formIsValid});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});
    const data = {};
    for (let key in this.state.createCafeForm) {
      data[this.state.createCafeForm[key].elConfig.name] = this.state.createCafeForm[key].value;
    }
    const axiosConfig = {
      url: '/cafes',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    axios.post(axiosConfig)
      .then(res => {
        console.log(res);
        this.setState({loading: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({error: true, loading: false});
      });
  };

  /**
   * @param {string} value - e.target.value of the form input
   * @param {object} rules - "validation" object in the form elemen config in state
   */
  checkValidity = (value, rules) => {
    if (!rules) return true; //some elements will not have a validation(rules) key
    let isValid = true;
    //will only be valid if the rule is satisfied and isValid is already set to true(will matter if more rules are incorporated)
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.createCafeForm) {
      formElementsArray.push({
        id: key,
        config: this.state.createCafeForm[key]
      });
    }

    const formInputs = formElementsArray.map(formEl => (
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
        <h2>Tell Us About Your Awesome Cafe</h2>
          <fieldset disabled={this.state.loading} aria-busy={this.state.loading}>
            {formInputs}
            <button type="submit" disabled={!this.state.formIsValid}>Create Cafe!</button>
          </fieldset>
      </form>
    );
  }
}

export default CreateCafe;