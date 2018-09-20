const errorHandlers = {};

//To catch async/await errors
errorHandlers.catchErrors = fn => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

errorHandlers.notFound = (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
};

//for validation errors
errorHandlers.validationErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);
    //set the location to the page the user was on when errors occured
    res.location('back');
    res.status = 400;
    res.json({
        message: "Required fields are missing or invalid",
        errors: err.errors
    });
};

errorHandlers.globalErrorHandler = (err, req, res, next) => {
    res.status = err.status || 500;
    res.json({error: err.message});
};

module.exports = errorHandlers;