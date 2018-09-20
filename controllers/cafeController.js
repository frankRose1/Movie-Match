const mongoose = require('mongoose');
const Cafe = mongoose.model('Cafe');

cafeController = {};

// POST /cafes ==> send 201 & redirect user to "/"
cafeController.createCafe = async (req, res) => {
    const cafe = await new Cafe(req.body);
    await cafe.save();
    res.location('/');
    res.sendStatus(201);
};

module.exports = cafeController;