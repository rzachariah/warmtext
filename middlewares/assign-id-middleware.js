const uuid = require('uuid');

const assignIdMiddleware = function(req, res, next) {
    let activityId = req.get('x-request-id');
    if (!activityId) {
        activityId = uuid.v4();
        req.headers['x-request-id'] = activityId;
    }

    next();
};

module.exports = function create() {
    return function (ctx, next) {
        assignIdMiddleware(ctx.request, ctx.response, next);
    };
};