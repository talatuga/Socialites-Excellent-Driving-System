var db = require('./db');
var table = "notification";

exports.add = function(target, type, message, actions, cb){
    var sql = "INSERT INTO " + table + "(accID, type, detail, action) VALUES(?,?,?,?)";
    db.get().query(sql, [target, type, JSON.stringify(message), actions], function(err, result){
        if(err) return cb(err);
        cb(null, result.insertId);
    });
};

exports.getPending = function(id, cb){
    var sql = "SELECT * FROM " + table + " WHERE id = ? AND status = 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

exports.getUserPending = function(accID, cb){
    var sql = "SELECT * FROM " + table + " WHERE accID = ? AND status = 1";
    db.get().query(sql, [accID], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

exports.markNotifRead = function(id, cb){
    var sql = "UPDATE " + table + " SET status = 2 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    });
}