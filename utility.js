var querystring= require('querystring');

exports.getAuthorizedUrl=function(loginURL,params){
    return loginURL+'?'+querystring.stringify(params);
}