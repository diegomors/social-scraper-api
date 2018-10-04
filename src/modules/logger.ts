var fs = require('fs')
  , Log = require('log');

const getLogger = function(level) {
    let dir = './log'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let path = `${dir}/${new Date().toLocaleDateString()}.log`;
    let file = fs.createWriteStream(path, {flags:'a'});
    return new Log(level, file);
}

const appendError = function(message) { 
    let logError = getLogger('error');
    logError.error(message);
}

export { appendError };