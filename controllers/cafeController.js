const mongoose = require('mongoose');
const Cafe = mongoose.model('Cafe');

cafeController = {};

// POST /cafes ==> send 201 & redirect user to "/"
cafeController.createCafe = async (req, res) => {
    req.body.user = req.userId;
    const cafe = await new Cafe(req.body);
    await cafe.save();
    res.location('/');
    res.sendStatus(201);
};

// GET /cafes ==> send 200 and the cafes
cafeController.getCafes = async (req, res) => {
    const cafes = await Cafe.find();
    res.status(200);
    res.json(cafes);
};

cafeController.getIndividualCafe = async (req, res) => {
    const {cafeSlug} = req.params;
    const cafe = await Cafe.findOne({slug: cafeSlug})
                            .populate('user');
    //if a specific slug does not return a cafe handle it manually
    if (!cafe) return next();
    res.status(200);
    res.json(cafe);
};

//TODO: Confirm a user owns the store
//POST /cafes/:cafeId/edit ==> send 204 and redirect to the cafe page
// the form on the frontend will be populated with the existing values on the Cafe
// if required fields are omitted then runValidators will catch it
cafeController.updateCafe = async (req ,res) => {
    const {cafeId} = req.params;
    // query, data, options
    const cafe = await Cafe.findOneAndUpdate({_id: cafeId}, req.body, {
        new: true, //return the new updated cafe instead of the old one
        runValidators: true //run validation on updates as well as creating cafes
    }).exec();
    res.location(`/cafe/${cafe.slug}`);
    res.sendStatus(204);
};

//use aggregations to filter the cafes by their tags
//can be used on a page to show the number of cafes that belong to a certain tag
cafeController.getCafesByTag = async (req, res) => {
    const {tag} = req.params;
    const tagQuery = tag || { $exists: true }; //either use the tag in the params or find all stores that have atleast one tag in the array
    const tagsPromise = Cafe.getTagsList();
    const storesPromise = Cafe.find({tags: tagQuery});
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
    res.json({tags, stores});
};

//GET /cafes/top-rated
cafeController.getTopCafes = async (req, res) => {
    const cafes = await Cafe.getHighestRated();
    res.json(cafes);
};


module.exports = cafeController;