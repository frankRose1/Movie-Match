//import .env variables
require('dotenv').config({path: '.env'})
// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
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


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
//     res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT, DELETE');
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cookieParser());
//decode the JWT and put the userId on the request
app.use( (req, res, next) => {
    const {token} = req.cookies;
    if (token) {
        const {userId} = jwt.verify( token, process.env.APP_SECRET );
        req.userId = userId;
    }
    next();
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true})); //allows using inputs w/nested data name="location[address]" ==> location.address
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
