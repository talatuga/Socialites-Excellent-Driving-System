var db = require('./db');

var Model = {}

Model.create = function (type, data, cb) {
    var sql = "";
    if(type == "student"){
        sql = "INSERT INTO `studentevaluation` (`studentID`, `instructorID`, `evaluation`) VALUES (?, ?, ?);";
    }else{
        sql = "INSERT INTO `instructorevaluation` (`studentID`, `instructorID`, `evaluation`, `comment`) VALUES (?, ?, ?, ?);";
    }
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, true);
    });
}

Model.get = function (id, type, field, cd) {
    var table = type == "student" ? "studentevaluation" : "instructorevaluation";
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    if (field == null) {
        sql = "SELECT * FROM "+ table +" WHERE id = ?";
    } else {
        field = field.replace(';', '');
        sql = "SELECT " + field + " as field FROM "+ table +" WHERE id = ?";
    }
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, field == null ? result[0] : result[0].field);
    });
}

Model.getAll = function(id, type, cb){
    var table = type == "student" ? "studentevaluation" : "instructorevaluation";    
    var sql = "SELECT * FROM "+ table +" WHERE id = ?";
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, result[0]);
    });
}

Model.getList = function(offset, limit, type, cb){
    var table = type == "student" ? "studentevaluation" : "instructorevaluation";        
    var sql = "SELECT * FROM "+ table +" WHERE id < ? ORDER BY id DESC LIMIT ?";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Model.update = function (id, type, param, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    var data = param;
    var table = type == "student" ? "studentevaluation" : "instructorevaluation";        
    if (field == null) {
        if(type == "student"){
            sql = "UPDATE `studentevaluation` SET `studentID`= ?, `instructorID`= ?, `evaluation`= ? WHERE `id`= ?";
        }else{
            sql = "UPDATE `instructorevaluation` SET `studentID`= ?, `instructorID`= ?, `evaluation`= ?, `comment`= ? WHERE `id`= ?";
        }
        data.push(id);
    } else {
        field = field.replace(';', '');        
        sql = "UPDATE "+ table +" SET " + field + " = ? WHERE `id` = ?";
        data = [param, id]
    }
    db.get().query(sql, data, function (err, result) {
        if (err) return cb(err);
        cb(null, true);
    });
}

Model.delete = function (id, cb) {
    //Unavailable; for evaluation muna.
}

module.exports = Model;