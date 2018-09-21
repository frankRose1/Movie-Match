import React, { Component } from 'react';
import Input from '../components/UI/Input';

class CreateCafe extends Component {
  state = {
    loading: false,
    createCafeForm: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Cafe Name',
          name: 'name',
          id: 'name'
        },
        value: ''
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
      address: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Address',
          name: "location[address]",
          id: 'address'
        },
        value: ''
      }, 
      lng: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Longitude',
          name: "location[coordinates][0]",
          id: 'lng'
        },
        value: ''
      }, 
      lat: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Latitude',
          name: "location[coordinates][1]",
          id: 'lat'
        },
        value: ''
      },
      method: {
        elType: 'select',
        elConfig: {
          options: [
            {value: 'fastest', display: 'Fastest'},
            {value: 'slowest', display: 'Slowest'}
          ]
        }
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
    updatedForm[elementIdentifier] = updatedFormEl;
    this.setState({createCafeForm: updatedForm});
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.createCafeForm) {
      formElementsArray.push({
        id: key,
        config: this.state.createCafeForm[key]
      });
    }
    
    return (
      <form className="create-cafe-form" action="/cafes" method="POST">
        <h2>Tell Us About Your Awesome Cafe</h2>
          {formElementsArray.map(formEl => (
            <Input
              handleChange={ (e) => this.handleChange(e, formEl.id) }
              key={formEl.id}
              elementType={formEl.config.elType}
              elementConfig={formEl.config.elConfig}
              value={formEl.config.value}/>
          ))}
      </form>
    );
  }
}

export default CreateCafe;