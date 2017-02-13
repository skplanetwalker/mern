var crypto = require('crypto');
var mysalt = "skplanetwalker";

module.exports = function(password){
    return crypto.createHash('sha512').update( password + mysalt).digest('base64');
};