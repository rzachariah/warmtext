'use strict';

const config = require('./config');
const Application = require('./app');

const port = config.port;
const app = new Application();

async function startup() {
    try {
        await app.initMiddlewares(config);
        app.run(port);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const gracefulShutdown = function () {
    console.log('Received kill signal. Shutting down service');
    process.exit();
};

//Listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

//Listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

startup();