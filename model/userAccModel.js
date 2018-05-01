var db = require('./db');

var Model = {}

Model.create = function (data, cb) {
    var sql = "INSERT INTO `credential` (`username`, `password`, `accType`) VALUES (?, SHA1(?), ?);";
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
        sql = "SELECT * FROM credential WHERE id = ?";
    } else {
        field = field.replace(';', '');
        sql = "SELECT " + field + " as field FROM credential WHERE id = ?";
    }
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, field == null ? result[0] : result[0].field);
    });
}

Model.getAll = function(id, cb){
    var sql = "SELECT * FROM credential WHERE id = ?";
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, result[0]);
    });
}

Model.getList = function(offset, limit, cb){
    var sql = "SELECT * FROM credential WHERE id < ? ORDER BY id DESC LIMIT ?";
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
        sql = "UPDATE `credential` SET `username` = ?, `password` = SHA1(?), `accType` = ? WHERE `id` = ?";
        data.push(id);
    } else {
        field = field.replace(';', '');        
        sql = "UPDATE `credential` SET " + field + " = ? WHERE `id` = ?";
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

Model.login = function (data, cb) {
    var user = data.username;
    var pass = data.password;
    var sql = "SELECT id, accType FROM credential WHERE username = ? AND password = SHA1(?)";
    db.get().query(sql, [user, pass], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Model.changePass = function(id, pass, cb){
    var sql = "UPDATE `credential` SET password = SHA1(?) WHERE `id` = ?";
    db.get().query(sql, [pass, id], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

module.exports = Model;