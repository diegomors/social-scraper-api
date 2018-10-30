import * as request from 'request';
import * as config from 'config-json';
import * as Twitter from 'twitter';

config.load('config/app.json');

export class DMService {

    private twService: Twitter;

    constructor() {        
        this.twService = new Twitter({
            consumer_key: config.get('TwitterConsumerKey'),
            consumer_secret: config.get('TwitterConsumerSecret'),
            access_token_key: config.get('TwitterAccessToken'),
            access_token_secret: config.get('TwitterAccessTokenSecret')
          });
    }

    getDM(req, res, callback) {
        this.twService.get('direct_messages/events/list.json', function(error, tweets, response) {
            callback(res, tweets);
        });
    }
       
}

export default new DMService();