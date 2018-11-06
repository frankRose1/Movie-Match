import React, {Fragment} from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import ReviewsStyles from './styles/ReviewsStyles';

function createStars(num){
  let arr = [];
  for(let i = 1; i <= num; i++){
    arr.push(i);
  }
  return arr;
}

function createEmptyStars(num){
  const numOfEmptyStars = 5 - num;
  if (numOfEmptyStars === 0) return [];
  let arr = [];
  for (let i = 0; i < numOfEmptyStars; i++){
    arr.push(i);
  }
  return arr;
}

const Reviews = ({reviews}) => (
  <ReviewsStyles>
    {reviews
      .sort((a, b) => new Date(b.created) - new Date(a.created) )
      .map(review => (
      <li key={review._id}>
        <div className="review-header">
          <div className="review-author">
            <img src={review.author.avatar} alt={`${review.author.name}'s Avatar`}/>
            <p>{review.author.name}</p>
          </div>
          <div className="review-stars" title={`Rated ${review.rating} out of 5 stars.`}>
            <Fragment>
              {createStars(review.rating).map(r => (
                <span key={r}>
                  ★
                </span>
              ))}
              {createEmptyStars(review.rating).map(r => (
                <span key={r}>
                  ☆
                </span>
              ))}
            </Fragment>
          </div>
          <p className="review-time">
            {formatDistance(review.created, new Date())} ago
          </p>
        </div>
        <p className="review-body">
          {review.text}
        </p>
      </li>
    ))}
  </ReviewsStyles>
);

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default Reviews;

