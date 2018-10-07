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
    const errors = [];
    for (let key in err.errors) {
        if (err.errors.hasOwnProperty(key)) {
            errors.push(err.errors[key].message)
        }
    }
    console.log(errors);
    //set the location to the page the user was on when errors occured
    res.location('back');
    res.status(400);
    res.json({
        message: "Required fields are missing or invalid",
        errors
    });
};

errorHandlers.globalErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err.message);
    res.json({error: err.message});
};

module.exports = errorHandlers;