const errorHandlers = {};

errorHandlers.notFound = (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
};

errorHandlers.globalErrorHandler = (err, req, res, next) => {
    res.status = err.status || 500;
    res.json({error: err.message});
};

module.exports = errorHandlers;