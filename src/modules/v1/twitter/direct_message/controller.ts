import * as httpStatus from 'http-status';
import * as logger from '../../../logger';
import dmService from './service';

const handleResponse = function(res, data) {
    if(data && !data.errors) {
        sendResponse(res, httpStatus.OK, data);
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

export class DMController {

    private resource:string = 'twitter/dm';

    constructor(app) {
        this.createRoutes(app);       
    }

    createRoutes(app, version='v1') {
        app.route(`/${version}/${this.resource}`).get(this.getDM);
    }

    getDM(req, res) {
        try {
            dmService.getDM(req, res, handleResponse);
        } catch (error) {
            handleError(error, req, res);
        }
    }

}