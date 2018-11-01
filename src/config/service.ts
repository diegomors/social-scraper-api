import * as config from 'config-json';

export class AppConfigService {

    constructor() {
        config.setBaseDir(__dirname);
        config.load('app.json');
    }

    getPropertyValue(property: string) {
        return config.get(property);
    }

}

export default new AppConfigService();