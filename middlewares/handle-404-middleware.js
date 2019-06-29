const _ = require('lodash');

const init404ErrorHandlerMiddleware = function (req, res, next) {
    console.log('Not Found', {
        OriginalUrl: req.originalUrl
    });
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
};

module.exports = init404ErrorHandlerMiddleware;