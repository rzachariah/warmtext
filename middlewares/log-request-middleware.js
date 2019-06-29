const perfNow = require('performance-now');
const config=require('../config');

const logRequestMiddleware = function (req, res, next) {
    // Don't log health checks
    if (req.originalUrl.toLowerCase() === `${config.routingPath}/health`) {
        next();
        return;
    }

    const startTime = perfNow();
    const logContext = {
        'OriginalUrl': req.originalUrl.toLowerCase()
    };
    console.log('Start Request', logContext);

    // Response.end is the last method called before putting the bytes on the wire
    const originalReqEnd = res.end;
    res.end = function (...args) {
        const endTime = perfNow();
        logContext.ExecutionTimeInMilliseconds = endTime - startTime;
        logContext.StatusCode = res.statusCode;
        console.log('End Request', logContext);
        originalReqEnd.apply(res, args);
    };
    next();
};

module.exports = function create() {
    return function (ctx, next) {
        logRequestMiddleware(ctx.request, ctx.response, next);
    };
};