var db = require('./db');
var modelModule = require('./model');
var table = "useraccount";

var UserAccount = {};
UserAccount = Object.create(modelModule);
UserAccount.table = table;
UserAccount.db = db;

//Business Logic Code:

UserAccount.login = function (data, cb) {
    var user = data.username;
    var pass = data.password;
    var sql = "SELECT id, accType FROM "+ table +" WHERE username = ? AND password = SHA1(?)";
    db.get().query(sql, [user, pass], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

UserAccount.changePass = function(id, pass, cb){
    var sql = "UPDATE `"+ table +"` SET password = SHA1(?) WHERE `id` = ?";
    db.get().query(sql, [pass, id], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

UserAccount.register = function(data, cb){
    // var sql = "SELECT addUserAcc(?,?,?) as id";
    var sql = "INSERT " + table + "(username, password, accType) VALUES (?,SHA1(?),?)";
    this.db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result.insertId);
    });
}

UserAccount.edit = function(id, user, pass, type, cb){
    var sql = "";
    var data = [];
    if(pass == "" || pass == null || pass == undefined){
        sql = "UPDATE " + this.table + " SET username = ?, acctype = ? WHERE id = ?";
        data = [user, type, id];
    }else{
        sql = "UPDATE " + this.table + " SET username = ?, password = SHA1(?), acctype = ? WHERE id = ?";
        data = [user, pass, type, id];
    }
    this.db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

UserAccount.getList = function(offset, limit, type, cb){
    var sql = "SELECT * FROM "+ this.table +" WHERE id > ? AND accType = ? ORDER BY id ASC LIMIT ?";
    this.db.get().query(sql, [offset,  type, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = UserAccount;