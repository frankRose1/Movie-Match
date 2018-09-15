const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');

const port = process.env.PORT || 5000;

const app = express();

app.use(logger('dev'));
app.user(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', router);

app.use(errorHandlers.notFound);

app.use(errorHandlers.globalErrorHandler);

app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});
