import * as request from 'request';
import * as config from 'config-json';
import * as FB from 'fb';

const removeSensitiveData = function(data) {
    if(data && data.paging) {
        let token = `access_token=${config.get('temporaryToken')}`;
        if(data.paging.next) data.paging.next = data.paging.next.replace(token, '');
        if(data.paging.previous) data.paging.previous = data.paging.previous.replace(token, '');
    }
}

const getPagingUrl = function(url, res, callback) {
    request(url, function (error, response, body) {
        let data = JSON.parse(body);
        removeSensitiveData(data);
        callback(res, data);
    });
}

export class PageService {

    private fbService: FB.Facebook;

    constructor() {
        config.load('config/app.json');
        this.fbService = new FB.Facebook({  
            version: config.get('graphApiVersion'),
            accessToken: config.get('temporaryToken')
        });
    }

    getPageInfo(req, res, callback) {
        const pageNameId = req.params.id;
    
        let fields = { fields: ['id', 'name', 'link', 'picture', 'fan_count', 'talking_about_count'] };            
            
        this.fbService.api(pageNameId, fields, function (data) {   
            removeSensitiveData(data);    
            callback(res, data);
        });
    }
    
    getPageFeed(req, res, callback) {
        const pageId = req.params.id;
        const next = req.params.next;
        const previous = req.params.previous;
        const after = req.params.after;
        const before = req.params.before;

        let fields = { limit: 100, fields: ['id', 'name', 'description', 'message', 'message_tags', 'caption', 'type',
            'created_time', 'permalink_url', 'link', 'picture', 'place', 'comments.limit(0).summary(true)',
            'likes.limit(0).summary(true)', 'shares.limit(0).summary(true)'] };
    
        let pagingUrl = next || previous;
        if(pagingUrl) {
            pagingUrl = `${pagingUrl}&access_token=${config.get('temporaryToken')}`;
            getPagingUrl(pagingUrl, res, callback);
        } else {
            if(after) fields["after"] = after;
            if(before) fields["before"] = before;
    
            this.fbService.api(`${pageId}/feed`, fields, function (data) { 
                removeSensitiveData(data);
                callback(res, data);
            });
        }
    }
       
}

export default new PageService();