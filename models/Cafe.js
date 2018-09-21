const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//location will be a point on a map so that users can search for Cafe's in a certain radius
//mongoDB expects longitude to come first so make sure its the 0 index coordinate
    //on the form ==> (id="lng" name="location[coordinates][0]")
//TODO: will need to incorporate goole maps on the front end
  //coordinates will auto populate when a user selects their address
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
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must provide coordinates!'
    }],
    address: {
      type: String,
      required: 'You must provide an address',
      trim: true
    }
  }
});

const Cafe = mongoose.model('Cafe', CafeSchema);

module.exports = Cafe;