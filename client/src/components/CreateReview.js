import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from './styles/FormStyles';
import Error from './ErrorMessage';
import {connect} from 'react-redux';
import {handleCreateReview} from '../actions/reviews';

class CreateReview extends Component {

  state = {
    text: '',
    rating: 1
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    cafeId: PropTypes.string.isRequired
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      ...this.state
    };
    this.props.dispatch(handleCreateReview(data, this.props.cafeId));
  }

  handleChange = e => {
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  render() {

    const  {loading, error} = this.props;

    return (
      <Form
        method="post"
        onSubmit={this.handleSubmit}>
        <Error error={error}/>
        <h2>Tell Us About Your Visit</h2>
        <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="rating">
              <input 
                type="text"
                name="rating"
                id="rating"
                placeholder="Rating"
                value={this.state.rating}
                onChange={this.handleChange}
                required/>
            </label>

            <label htmlFor="text">
              <textarea 
                name="text"
                id="text"
                placeholder="Describe your visit..."
                value={this.state.text}
                onChange={this.handleChange}
                required/>
            </label>
          <button
            type="submit"
            disabled={loading}>
            Post{loading ? 'ing your' : ''} Review!
          </button>
        </fieldset>
      </Form>
    )
  }
}

const mapStateToProps = ({reviews}) => ({
  loading: reviews.loading,
  error: reviews.error
});

export default connect(mapStateToProps)(CreateReview);