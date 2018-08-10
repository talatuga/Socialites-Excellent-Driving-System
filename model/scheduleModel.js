var db = require('./db');
var table = "schedule";

var Model = {}

Model.create = function (data = [], cb = (error=new Error, result=[])=>{}) {
    var sql = "INSERT INTO `schedule` (`date`, `time`, `hour`, `studentID`, `instructorID`, `branchID`) VALUES (?, ?, ?, ?, ?, ?);";
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, true);
    });
}

Model.get = function (id, field, cd) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    if (field == null) {
        sql = "SELECT * FROM schedule WHERE id = ?";
    } else {
        field = field.replace(';', '');
        sql = "SELECT " + field + " as field FROM schedule WHERE id = ?";
    }
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, field == null ? result[0] : result[0].field);
    });
}

Model.getAll = function(id, cb){
    var sql = "SELECT * FROM schedule WHERE id = ?";
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, result[0]);
    });
}

Model.getList = function(offset, limit, cb){
    var sql = "SELECT * FROM schedule WHERE id < ? ORDER BY id DESC LIMIT ?";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
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
        sql = "UPDATE `schedule` SET `date`= ?, `time`= ?, `hour`= ?, `studentID`= ?, `instructorID`= ?, `branchID`= ? WHERE `id`= ?";
        data.push(id);
    } else {
        field = field.replace(';', '');        
        sql = "UPDATE `schedule` SET " + field + " = ? WHERE `id` = ?";
        data = [param, id]
    }
    db.get().query(sql, data, function (err, result) {
        if (err) return cb(err);
        cb(null, true);
    });
}

Model.delete = function (id, cb) {
    //Still ondev
}

Model.getAvailable = function(id, cb){
    var sql = "SELECT * FROM "+ table +" WHERE studID = ? AND status = 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Model.getAssigned = function(id, cb){
    var sql = "SELECT * FROM "+ table +" WHERE studID = ? AND status > 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Model.removeSched = function(id, cb){
    var sql = "UPDATE " + table + " SET status = 1 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

Model.assignSched = function(id, cb){
    var sql = "UPDATE " + table + " SET status = 2 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

module.exports = Model;