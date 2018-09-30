const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ReviewSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    ref: 'User',
    type: mongoose.Schema.ObjectId,
    required: 'You must supply an author!'
  },
  cafe: {
    ref: 'Cafe',
    type: mongoose.Schema.ObjectId,
    required: 'You must supply a cafe!'
  },
  text: {
    type: String,
    required: 'Please tell us a bit about your experience.'
  },
  rating: {
    type: Number,
    required: 'Please leave a rating!',
    min: [1, '1 is the lowest possible rating.'],
    max: [5, '5 is the highest possible rating.']
  }
});

function autoPopulate(next){
  this.populate({path: 'author', select: 'name'});
  next();
}

// every time a review is queried it will auto populate the authors name
ReviewSchema.pre('find', autoPopulate);
ReviewSchema.pre('findOne', autoPopulate);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;