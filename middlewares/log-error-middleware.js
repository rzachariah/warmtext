/* eslint-disable no-unused-vars */
const _ = require('lodash');

// this signature of function should not change.
const logErrorMiddleware = function (err, req, res, next) {
    if (err.statusCode === 400 && !_.isEmpty(err.errors)) {
        console.log(`Input Validation Error: ${JSON.stringify(err.errors)}`);
        res.status(err.statusCode).json({
            ErrorMessage: err.errors
        });
    } else {
        const is404 = err.statusCode === 404;
        if (!is404) {
            console.error(err);
        }
        res.status(err.statusCode || 500).json({
            ErrorMessage: is404 ? 'Not Found' : 'Internal Server Error'
        });
    }
};

module.exports = logErrorMiddleware;