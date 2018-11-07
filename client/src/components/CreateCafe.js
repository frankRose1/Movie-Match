import React, { Component } from 'react';
import Form from './styles/FormStyles';
import TagsList from './styles/TagsListStyles';
import Error from './ErrorMessage';
import {connect} from 'react-redux';
import {handleCreateCafe} from '../actions/cafe';

class CreateCafe extends Component {
  state = {
    imageUploading: false,
    formIsValid: false,
    name: '',
    image: '',
    largeImage: '',
    description: '',
    address: '',
    lat: '',
    lng: '',
    tags: []
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      image: this.state.image,
      largeImage: this.state.largeImage,
      description: this.state.description,
      location: {
        address: this.state.address,
        coordinates: [parseInt(this.state.lng), parseInt(this.state.lat)]
      }
    };
    this.props.dispatch(handleCreateCafe(data, this.props.history));
  };

  updateTags = e => {
    const {checked, value} = e.target;
    let updatedTags = [...this.state.tags];
    if (checked) {
      updatedTags.push(value);
    } else {
      updatedTags = updatedTags.filter(tag => tag !== value);
    }
    this.setState({ tags: updatedTags });
  }

  addToState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async  e => {
    this.setState({imageUploading: true});
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'thegrind');
    const res = await fetch('https://api.cloudinary.com/v1_1/dbviuyhby/image/upload/', {method: 'POST', body: data});
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      imageUploading: false
    });
  };

  render() {

    const {loading, error} = this.props;
    const tagChoices = ['Free Wifi', 'Open Late', 'Family Friendly', 'Pet Friendly', 'Licensed'];

    return (
      <Form method="post" onSubmit={this.handleSubmit}>
        <Error error={error}/>
        <h2>Tell Us About Your Awesome Cafe</h2>
          <fieldset disabled={loading || this.state.imageUploading} aria-busy={loading || this.state.imageUploading}>
            <div>
              <label htmlFor="file">
                <input 
                  type="file" 
                  name="image" 
                  placeholder="Upload an Image!" 
                  onChange={this.uploadFile} 
                  required/>
                {this.state.image && <img width="200" src={this.state.image} alt="Upload Preview" />}
              </label>
            </div>
            <div>
              <label htmlFor="name">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  value={this.state.name} 
                  placeholder="Cafe Name" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="description">
                <textarea 
                  name="description" 
                  id="description"
                  value={this.state.description} 
                  placeholder="Tell the world what makes your Cafe unique" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="address">
                <input 
                  type="text"
                  name="address" 
                  id="address"
                  value={this.state.address} 
                  placeholder="Address" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="lat">
                <input 
                  type="text"
                  name="lat" 
                  id="lat"
                  value={this.state.lat} 
                  placeholder="Latitude" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            <div>
              <label htmlFor="lng">
                <input
                  type="text"
                  name="lng" 
                  id="lng"
                  value={this.state.lng} 
                  placeholder="Longitude" 
                  onChange={this.addToState} 
                  required/>
              </label>
            </div>
            
            <p>Add some tags to improve search results!</p>
            <TagsList>
              {tagChoices.map(tag => (
                <li key={tag} className="tag-choice">
                    <input 
                      type="checkbox"
                      id={tag}
                      value={tag}
                      name={tag}
                      onChange={this.updateTags}/>
                    <label htmlFor={tag}>#{tag}</label>
                </li>
              ))}
            </TagsList>
            <button type="submit" disabled={loading || this.state.imageUploading}>Creat{loading ? 'ing' : 'e'} Cafe!</button>
          </fieldset>
      </Form>
    );
  }
}

const mapStateToProps = ({cafe}) => ({
  loading: cafe.loading,
  error: cafe.error
});

export default connect(mapStateToProps)(CreateCafe);