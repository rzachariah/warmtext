const config=require('../config');

const logEntryMiddleware = function (req, res, next) {
    // Don't log health checks
    if (req.originalUrl.toLowerCase() !== `${config.routingPath}/health`) {
        console.log('Request received by service', {
            OriginalUrl: req.originalUrl.toLowerCase(),
            ActivityId: req.get('x-request-id')
        });
    }
    next();
};

module.exports = function create() {
    return function (ctx, next) {
        logEntryMiddleware(ctx.request, ctx.response, next);
    };
};