import * as request from 'request';
import * as Twitter from 'twitter';
import config from '../../../../config/service';

export class DMService {

    private twService: Twitter;

    constructor() {        
        this.twService = new Twitter({
            consumer_key: config.getPropertyValue('TwitterConsumerKey'),
            consumer_secret: config.getPropertyValue('TwitterConsumerSecret'),
            access_token_key: config.getPropertyValue('TwitterAccessToken'),
            access_token_secret: config.getPropertyValue('TwitterAccessTokenSecret')
          });
    }

    getDM(req, res, callback) {
        this.twService.get('direct_messages/events/list.json', function(error, tweets, response) {
            callback(res, tweets);
        });
    }
       
}

export default new DMService();