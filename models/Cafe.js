const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const CafeSchema = new Schema({
  name: {
    type: String,
    required: 'You must provide a cafe name!',
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

const Cafe = mongoose.model('Cafe', CafeSchema);

module.exports = Cafe;