var db = require('./db');

var WebElement = function(){};

WebElement.prototype.getCourse = function(offset,limit,type,cb){
    var sql = "SELECT courseID, transmission, days, hour, price FROM web_course WHERE transmission = ?";
    db.get().query(sql, [type], function(err, data){
        if(err) return cb(err);
        cb(null, data);
    });
};

WebElement.prototype.getBranch = function(offset,limit,cb){
    var sql = "SELECT branchID, branchName, location, fulladdress, telno FROM web_branch";
    db.get().query(sql, function(err, data){
        if(err) return cb(err);
        cb(null, data);
    })
};

WebElement.prototype.subcribeNewsletter = function(email, cb){};

WebElement.prototype.unsubscribeNewsletter = function(email, cb){};

module.exports = WebElement;