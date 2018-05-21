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
    var sql = "SELECT addUserAcc(?,?,?) as id";
    this.db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        console.log(JSON.stringify(result));
        cb(null, result[0].id);
    });
}

UserAccount.edit = function(id, user, pass, type, cb){
    var sql = "UPDATE " + this.table + " SET username = ?, password = SHA1(?), acctype = ? WHERE id = ?";
    this.db.get().query(sql, [user, pass, type, id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = UserAccount;