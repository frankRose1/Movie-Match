//import .env variables
require('dotenv').config({path: '.env'})
// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require("passport");
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const errorHandlers = require('./handlers/errorHandlers');
const port = process.env.PORT || 5000;
//import models
require('./models/User');
require('./models/Cafe');
require('./models/Review');
const router = require('./routes');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise; //use es6 promises
const db = mongoose.connection;
db.on('error', err => {
    console.error(`Failed to connect to database: ${err.message}`);
});


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next();
// });

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(passport.initialize());
require('./handlers/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/api/v1', router);

app.use(errorHandlers.notFound);

//mongoose validation errors
app.use(errorHandlers.validationErrors)

app.use(errorHandlers.globalErrorHandler);

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
