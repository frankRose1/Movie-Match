const mongoose = require('mongoose');
const slugify = require('slugify');
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
  slug: String,
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
  },
  photo: String
});

CafeSchema.pre('save', async function(next){
  //if the name field was not modified, there is no need to run this
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name, {lower: true}); //this is refering to the cafe being saved
  //search for other stores with the same slug(checking for anything that starts w/ this.slug && "-" || a possible number after the dash)
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({slug: slugRegEx});
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
});

const Cafe = mongoose.model('Cafe', CafeSchema);

module.exports = Cafe;