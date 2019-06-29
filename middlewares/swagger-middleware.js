const SwaggerExpress = require('swagger-express-mw');

const handle404Middleware = require('./handle-404-middleware');
const logErrorMiddleware = require('./log-error-middleware');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');

function initSwagger(config, app, appRoot) {
    const startupExecutor = (resolve, reject) => {
        const swaggerConfig = {
            appRoot, // required config
        };

        SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
            if (err) {
                console.error(err);
                reject(err);
            }

            try {
                swaggerExpress.register(app);

                //setup swagger ui
                const options = {
                    swaggerUi: swaggerExpress.runner.config.swagger.docEndpoints.ui || 'docs', //swagger ui web page
                    apiDocs: swaggerExpress.runner.config.swagger.docEndpoints.raw || 'swagger', //api document in json format
                };
                app.use(SwaggerUi(swaggerExpress.runner.swagger, options));

                app.set('productPath', swaggerExpress.runner.swagger.basePath);

                app.get('/', (req, res) => {
                    const healthyStatus = {
                        status: "UP"
                    };
                    res.status(200).json(healthyStatus);
                });

                // these needs to registered at the end
                app.use(handle404Middleware);
                app.use(logErrorMiddleware);
            } catch (exp) {
                reject(exp);
            }

            resolve(app);
        }, (reason) => {
            console.error(reason);
            reject('Failed to start');
        });
    };

    return new Promise(startupExecutor);
}

module.exports = {
    initSwagger
};