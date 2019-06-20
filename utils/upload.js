const qiniu = require('qiniu')
var accessKey = '_3kyQaxki0UFdr8U947UaZySrnV4ZRT329YOSNAq';
var secretKey = 'IgMBOK2de3j-bhAMbLqpVsNJSUsAEI89CwsET1on';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

module.express = function () {
    var options = {
        scope:  'back-end',
        expires:3600,
        returnBody: '{"key":"$(key)","hash":"$(etag)","url":"http://ptdimdkmz.bkt.clouddn.com/$(key)"}'
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
}
