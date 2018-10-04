import * as httpStatus from 'http-status';
var request = require('request');
var config = require('config-json');
var FB = require('fb');

config.load('config/app.json');

var fbService = new FB.Facebook(FB.options({ 
    //appId: config.get('fbAppId'), 
    version: config.get('graphApiVersion') 
}));
fbService.setAccessToken(config.get('temporaryToken'));

const getPageInfo = (req, res, callback) => {
    const pageNameId = req.params.id;

    let fields = { fields: ['id', 'name', 'link', 'picture', 'fan_count', 'talking_about_count'] };            
        
    fbService.api(pageNameId, fields, function (data) {   
        removeSensitiveData(data);    
        callback(res, data);
    });
}

const getPageFeed = (req, res, callback) => {
    const pageId = req.params.id;
    const next = req.params.next;
    const previous = req.params.previous;

    let fields = { limit: 100, fields: ['id', 'message', 'created_time', 'permalink_url', 'type', 'link', 'picture',
        'comments.limit(0).summary(true)', 'likes.limit(0).summary(true)', 'shares'] };

    let paging = next || previous;
    if(paging) {
        paging = `${paging}&access_token=${config.get('temporaryToken')}`;
        getPaging(paging, res, callback);
    } else {
        fbService.api(`${pageId}/feed`, fields, function (data) { 
            removeSensitiveData(data);
            callback(res, data);
        });
    }
}

const getPaging = function(url, res, callback) {
    request(url, function (error, response, body) {
        let data = JSON.parse(body);
        removeSensitiveData(data);
        callback(res, data);
    });
}

const removeSensitiveData = function(data) {
    if(data && data.paging) {
        let token = `access_token=${config.get('temporaryToken')}`;
        if(data.paging.next) data.paging.next = data.paging.next.replace(token, '');
        if(data.paging.previous) data.paging.previous = data.paging.previous.replace(token, '');
    }
}

export { getPageInfo, getPageFeed };