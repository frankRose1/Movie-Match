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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A logged in user is required!'
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
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
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


CafeSchema.statics.getTagsList = function(){
  return this.aggregate([
    // $unwind will give an instance of the cafe for each tag it has, 1 store will be returned 3 times if it has 3 different tags
    {$unwind: '$tags'},
    //group is grouping everything by its tag field --> then a new field, "count" is created in each group and everytime a new item is added to the group it adds 1 to the count
    {$group: { _id: '$tags', count: { $sum: 1} } },
    //sort will sort the tags by most popular (descending)
    { $sort: {count: -1} }
  ]);
};

CafeSchema.statics.getHighestRated = function(){
  return this.aggregate([
    //1 lookup stores and populate the reviews. (cant use virtuals because aggregate is a lower level mongoDB function)
    { $lookup: {from: 'reviews', localField: '_id', foreignField: 'cafe', as: 'reviews'} },
    // 2 match cafes who have 2 or more reviews (looking to see if the reviews.1 index exists)
    { $match: {'reviews.1': {$exists: true} } },
    // 3 add a field called averageRating that gets the average of all of the .rating properies in the reviews array
    { $addFields: { averageRating: {$avg: '$reviews.rating'} } },
    // 4 sort by highest rated
    {$sort: {averageRating: -1}},
    // 5 limit to top 10
    {$limit: 10}
  ]);
};

//by default virtuals will not be inclued with the queried results --> need to set "toJson" and "toObject" on schema
CafeSchema.virtual('reviews', {
  ref: 'Review', //model to link to
  localField: '_id', // field on the Cafe model
  foreignField: 'cafe' //field on the Review model
});

//auto populate virtuals
function autoPopulate(next){
  this.populate('reviews');
  next();
}
CafeSchema.pre('find', autoPopulate);
CafeSchema.pre('findOne', autoPopulate);


const Cafe = mongoose.model('Cafe', CafeSchema);

module.exports = Cafe;