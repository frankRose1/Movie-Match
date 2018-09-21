import React, { Component } from 'react';
import Input from '../components/UI/Input';
import axios from 'axios';

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
    updatedForm[elementIdentifier] = updatedFormEl;
    this.setState({createCafeForm: updatedForm});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true})
    //send a request with axios
    const data = {};
    for (let key in this.state.createCafeForm) {
      data[this.state.createCafeForm[key].elConfig.name] = this.state.createCafeForm[key].value;
    }
    axios.post('/cafes', data)
      .then(res => {
        console.log(res);
        this.setState({loading: false});
      })
      .catch(err => console.log(err));
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
      <form className="create-cafe-form" action="/cafes" method="POST" onSubmit={this.handleSubmit}>
        <h2>Tell Us About Your Awesome Cafe</h2>
          {formElementsArray.map(formEl => (
            <Input
              handleChange={ (e) => this.handleChange(e, formEl.id) }
              key={formEl.id}
              elementType={formEl.config.elType}
              elementConfig={formEl.config.elConfig}
              value={formEl.config.value}/>
          ))}
          <input type="submit" value="Create Cafe" />
      </form>
    );
  }
}

export default CreateCafe;