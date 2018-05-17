/* 
    adminModel.js, if you check on db, there is no such thing as this table exist.
    there are reason why this exist, and it is important.
*/
var db = require('./db');

var UserInfo = require('./userInfoModel');

var Admin = function(){}

Admin.prototype.getInfo = function(accID, cb){
    UserInfo.getInfo(accID, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = new Admin();