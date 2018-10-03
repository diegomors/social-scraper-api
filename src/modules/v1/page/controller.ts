import * as httpStatus from 'http-status';
import * as service from './service';
import * as logger from '../../../logger';

const handleResponse = function(res, data) {
    if(data && !data.error) {
        if((data != {} && !data.data) || (data.data && Array.isArray(data.data) && (<Array<any>>data.data).length > 0)) {
            sendResponse(res, httpStatus.OK, data);
        } else {
            sendResponse(res, httpStatus.NO_CONTENT, data);
        }
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, data);
    }
}

const sendResponse = function(res, statusCode, data) {
    res.status(statusCode).json({ 'result': data });
}

const handleError = function(err, req, res) {
    logger.appendError(`[${req.url}] - ${err.message}`);
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, err.message);
}

export class PageController {
    private resource:string = 'page';

    constructor(app) {
        this.createRoutes(app);        
    }

    createRoutes(app, version='v1') {
        app.route(`/${version}/${this.resource}/:id`).get(this.getPageInfo);
        app.route(`/${version}/${this.resource}/:id/feed`).get(this.getPageFeed);
        app.route(`/${version}/${this.resource}/:id/feed/next/:next`).get(this.getPageFeed);
        app.route(`/${version}/${this.resource}/:id/feed/prev/:previous`).get(this.getPageFeed);
    }

    async getPageInfo(req, res) {
        try {
            service.getPageInfo(req, res, handleResponse);
        } catch (error) {
            handleError(error, req, res);
        }
    }

    async getPageFeed(req, res) {
        try {
            service.getPageFeed(req, res, handleResponse);
        } catch (error) {
            handleError(error, req, res);
        }
    }

}
