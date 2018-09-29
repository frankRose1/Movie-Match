const mongoose = require('mongoose');
const Review = mongoose.model('Review');

const reviewController = {};

//POST /reviews/:storeId --> sotreId will be used in the post request with axios
// req.body will only have "text" and "rating"
reviewController.createReview = async (req, res) => {

};

module.exports = reviewController;