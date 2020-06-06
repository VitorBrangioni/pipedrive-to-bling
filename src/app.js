const express = require('express');
const { router } = require('./api');
const cors = require('cors');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

class App {

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.services();
    }

    middlewares() {
        this.express.use(cors());
    }

    routes() {
        this.express.use('/api', router);
    }

    services() {
    }
 
}

module.exports = new App().express;