var config = require('config-json');
var FB = require('fb');

config.load('config/app.json');

var fbService = new FB.Facebook(FB.options({ 
    version: config.get('graphApiVersion') 
}));
fbService.setAccessToken(config.get('temporaryToken'));

const getPageInfo = (req, res, callback) => {
    const pageNameId = req.params.id;

    let fields = { fields: ['id', 'name', 'link', 'picture', 'fan_count', 'talking_about_count'] };            
        
    fbService.api(pageNameId, fields, function (data) {       
        callback(res, data);
    });
}

const getPageFeed = (req, res, callback) => {
    const pageId = req.params.id;
    const next = req.params.next;
    const previous = req.params.previous;

    let fields = { limit: 100, fields: ['id', 'message', 'created_time', 'permalink_url', 'type', 'link', 'picture',
        'comments.limit(0).summary(true)', 'likes.limit(0).summary(true)', 'shares'] };

    if(next) fields["next"] = next;
    if(previous) fields["previous"] = previous;
        
    fbService.api(`${pageId}/feed`, fields, function (data) { 
        callback(res, data);
    });
}

export { getPageInfo, getPageFeed };