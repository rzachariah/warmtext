class Configuration {
    constructor() {
        this.routingPath = '/api/v1';
        this.port = process.env.PORT || 3000;
    }
}

module.exports = new Configuration();