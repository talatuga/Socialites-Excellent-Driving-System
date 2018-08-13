var db = require('./db');

var WebElement = function(){};

var newsletter = "newsletter";

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

WebElement.prototype.subcribeNewsletter = function(email, cb){
    var sql = "INSERT INTO " + newsletter + "(email, token) VALUES ?";
    var token = require('../bin/util/tokenGenerator').generateToken(20);
    var values = [[email,token]];
    db.get().query(sql, [values], function(err, result){
        if(err) return cb(err);
        cb(null, result.insertId);
    });
};

WebElement.prototype.unsubscribeNewsletter = function(email, token, cb){
    
};

WebElement.prototype.getLicenseApply = function(cb){
    var sql = "SELECT * FROM license_apply_price WHERE status = 1";
    db.get().query(sql, function(err, results){
        if(err) return cb(err);
        cb(null, results);
    });
};

module.exports = WebElement;