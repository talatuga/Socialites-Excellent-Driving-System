var db = require('./db');
var modelModule = require('./model');
var table = "useraccount";

var UserAccount = function(tableName, database){
    modelModule.apply(this, arguments);
    this.tableName = tableName;
}
UserAccount.prototype = modelModule.prototype;
UserAccount.prototype.constructor = UserAccount;

//Business Logic Code:

UserAccount.prototype.login = function (data, cb) {
    var user = data.username;
    var pass = data.password;
    var sql = "SELECT id, accType FROM "+ table +" WHERE username = ? AND password = SHA1(?)";
    db.get().query(sql, [user, pass], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

UserAccount.prototype.changePass = function(id, pass, cb){
    var sql = "UPDATE `"+ table +"` SET password = SHA1(?) WHERE `id` = ?";
    db.get().query(sql, [pass, id], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

module.exports = new UserAccount(table, db);