var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');

import { PageController } from './modules/v1/page/controller';

export class App {

    public app: any;
    public server: any;
    public port: number;

    constructor() {                        
        this.setPort();

        this.app = express();        
        this.middleware();
        this.routes();  
        
        this.server = http.createServer(this.app);
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.route('/').get((req, res) => res.status(200).json({ 
            'status': 'OK',
            'date': new Date().toISOString()
        }));

        new PageController(this.app);
    }

    private setPort() {
        this.port = +(process.env.PORT || 3000);
    }
}

export default new App();