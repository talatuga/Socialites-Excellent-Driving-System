var db = require("./db");
var ModelModule = require("./model");
var table = "userinfo";
var otherTbl = "other_info";

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

UserInfo.register = function(data, other, cb){
    var self = this;
    if(typeof other == "function"){
        cb = other;
        other = null;
    }
    UserInfo.getFields(UserInfo.table, function(err, fields){
        var sql = "SELECT addUserInfo("+ Array(fields.length-1).fill("?").join() +") as id";
        self.db.get().query(sql, data, function(err, result){
            if(err) return cb(err);
            if(other != null){
                var sql1 = "INSERT into " + otherTbl + " VALUES(null,?,?,1)";
                db.get().query(sql1, [result[0].id, JSON.stringify(other)], function(er){
                    if(er) return cb(er);
                    cb(null, result[0].id);
                });
            }else{
                cb(null, result[0].id);
            }
        });
    });
}

module.exports = UserInfo;