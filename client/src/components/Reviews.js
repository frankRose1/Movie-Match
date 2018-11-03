import React from 'react'
import PropTypes from 'prop-types'
import ReviewsStyles from './styles/ReviewsStyles';

const Reviews = ({reviews}) => (
  <ReviewsStyles>
    {reviews.map(review => (
      <div key={review.id}>
        <div className="review-header">
          <div className="review-author">
            <img src="" alt=""/>
            <p>review authors name</p>
          </div>
          <div className="review-stars">
            <p>number of stars out of 5</p>
          </div>
          <p className="review-time">
            time the review was created
          </p>
        </div>
        <p className="review-body">
          review text
        </p>
      </div>
    ))}
  </ReviewsStyles>
);

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default Reviews;

