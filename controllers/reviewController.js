const mongoose = require('mongoose');
const Review = mongoose.model('Review');

const reviewController = {};

//POST /reviews/:storeId --> sotreId will be used in the post request with axios
// req.body will only have "text" and "rating" need to add other fields
//on the front end the reviews setion will re-render
reviewController.createReview = async (req, res) => {
  req.body.author = req.session.userId;
  req.body.cafe = req.params.cafeId;
  const review = new Review(req.body);
  await review.save();
  res.location(`/cafe/:cafeSlug`); //the front end will have the slug saved in state
  res.sendStatus(201);
};

module.exports = reviewController;