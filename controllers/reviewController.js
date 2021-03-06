const mongoose = require('mongoose');
const Review = mongoose.model('Review');

const reviewController = {};

//POST /reviews/:storeId --> sotreId will be used in the post request with axios
// req.body will only have "text" and "rating" need to add other fields
//on the front end the reviews setion will re-render
reviewController.createReview = async (req, res) => {
  req.body.author = req.user.id;
  req.body.cafe = req.params.cafeId;
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
};

module.exports = reviewController;