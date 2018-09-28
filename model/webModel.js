var db = require('./db');

var WebElement = function(){};

var newsletter = "newsletter";

WebElement.prototype.getCourse = function(offset,limit,type,cb){
    var sql = "SELECT w.courseID, w.transmission, w.days, w.hour, w.price FROM web_course w, course c WHERE transmission = ? AND c.status = 1 AND w.courseID = c.id";
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

WebElement.prototype.getDisplayTotEnroll = function(year, cb){
    var sql = "SELECT COUNT(id) AS counter FROM preregstudent WHERE YEAR(dateSubmit) = ?";
    db.get().query(sql, [year], function(err, results){
        if(err) return cb(err);
        if(results.length == 0) return cb(null, []);
        cb(null, results);
    });
};

WebElement.prototype.getDisplayStud = function(cb){
    var sql = "SELECT count(id) AS counter FROM student WHERE status = 1";
    db.get().query(sql, function(err, results){
        if(err) return cb(err);
        if(results.length == 0) return cb(null, []);
        cb(null, results);
    });
};

module.exports = WebElement;