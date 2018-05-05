var db = require('./db');

var Model = {}

Model.create = function (data, cb) {
    var sql = "INSERT INTO `studentinformation` (`guardianID`, `fullname`, `birthdate`, `birthplace`, `civilStatus`, `sex`, `occupation`, `telno`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, true);
    });
}

Model.get = function (id, field, cb) {    
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    if (field == null) {
        sql = "SELECT * FROM studentinformation WHERE id = ?";
    } else {
        field = field.replace(';', '');
        sql = "SELECT " + field + " as field FROM studentinformation WHERE id = ?";
    }
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, field == null ? result[0] : result[0].field);
    });
}

Model.getList = function (offset, limit, cb) {
    var sql = "SELECT * FROM studentinformation WHERE id > ? ORDER BY id ASC LIMIT ?";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Model.update = function (id, param, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    var data = param;
    if (field == null) {
        sql = "UPDATE `studentinformation` SET `guardianID`= ?, `fullname`= ?, `birthdate`= ?, `birthplace`= ?, `civilStatus`= ?, `sex`= ?, `occupation`= ?, `telno`= ? WHERE `id` = ?";
        data.push(id);
    } else {
        field = field.replace(';', '');        
        sql = "UPDATE `studentinformation` SET " + field + " = ? WHERE `id` = ?";
        data = [param, id]
    }
    db.get().query(sql, data, function (err, result) {
        if (err) return cb(err);
        cb(null, true);
    });
}

Model.updateAll = function (data = new Array, cb = function(){}) {
    var sql = "UPDATE `studentinformation` SET `guardianID`= ?, `fullname`= ?, `birthdate`= ?, `birthplace`= ?, `civilStatus`= ?, `sex`= ?, `occupation`= ?, `telno`= ?";
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, true);
    }); //I Don't suggest this, pero kasi may use to. Kaso medyo risky. Never call this unless needed.
}

Model.delete = function (id, cb) {
    //Unavailable; for evaluation muna.
}

module.exports = Model;