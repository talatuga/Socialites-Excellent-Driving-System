var db = require("./db");
var ModelModule = require("./model");
var table = "userinfo";

var UserInfo = {};
UserInfo = Object.create(ModelModule);
UserInfo.table = table;
UserInfo.db = db;

//Module related functionality:
UserInfo.getInfo = function(accID, cb){
    var sql = "SELECT * FROM " + this.table + " WHERE userAcc = ?";
    db.get().query(sql, [accID], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

UserInfo.register = function(data, cb){
    var self = this;
    UserInfo.getFields(UserInfo.table, function(err, fields){
        var sql = "SELECT addUserInfo("+ Array(fields.length-1).fill("?").join() +") as id";
        self.db.get().query(sql, data, function(err, result){
            if(err) return cb(err);
            cb(null, result[0].id);
        });
    });
}

module.exports = UserInfo;