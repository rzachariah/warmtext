'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

class Application {
    constructor() {
        this.expressApp = express();
        this.server = null;
        this.swaggerHandler = null;
        this.expressAppHandler = null;
    }

    async initMiddlewares(config) {
        this.swaggerHandler = require('./middlewares/swagger-middleware');
        this.expressApp.enable('trust proxy');
        this.expressApp.disable('x-powered-by');
        const jsonParser = bodyParser.json({
            limit: 1024 * 1024 * 1024 * 2,
            type: 'application/json'
        });
        this.expressApp.use(jsonParser);
        //initialize swagger and error handling middlewares
        await this.swaggerHandler.initSwagger(config, this.expressApp, __dirname);
    }

    run(port) {
        this.expressApp.set('port', port);
        console.log('Starting service on ' + port);
        this.server = http.createServer(this.expressApp);
        this.expressAppHandler = this.server.listen(port);
    }
}

module.exports = Application;