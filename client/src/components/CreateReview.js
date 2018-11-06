import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import StyledReviewForm from './styles/ReviewFormStyles';
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
    let {value, name} = e.target;
    value = name === 'rating' ? parseInt(value) : value;
    this.setState({ [name]: value} );
  }

  render() {

    const  {loading, error} = this.props;

    return (
      <StyledReviewForm
        method="post"
        onSubmit={this.handleSubmit}>
        <Error error={error}/>

          <textarea
            name="text"
            placeholder="Did you try this place? Have something to say? Leave a review..."
            value={this.state.text}
            onChange={this.handleChange}/>

          <div className="reviewer-meta">
            <div className="reviewer-stars">
              {[5, 4, 3, 2, 1].map(num => (
                <Fragment key={num}>
                  <input 
                    type='radio'
                    name='rating'
                    value={num}
                    id={`star${num}`}
                    onChange={this.handleChange}
                    required/>
                    <label htmlFor={`star${num}`}>{num} Stars</label>
                </Fragment>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}>
              Submit{loading ? 'ing your' : ''} Review!
            </button>

          </div>

      </StyledReviewForm>
    )
  }
}

const mapStateToProps = ({reviews}) => ({
  loading: reviews.loading,
  error: reviews.error
});

export default connect(mapStateToProps)(CreateReview);