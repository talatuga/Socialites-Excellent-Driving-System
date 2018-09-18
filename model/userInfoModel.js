var db = require("./db");
var ModelModule = require("./model");
var table = "userinfo";
var otherTbl = "other_info";

var UserInfo = {};
UserInfo = Object.create(ModelModule);
UserInfo.table = table;
UserInfo.db = db;
UserInfo.other = otherTbl;

//Module related functionality:
UserInfo.getInfo = function(accID, userInfo, cb){
    if(typeof userInfo == "function"){
        cb = userInfo;
        userInfo = null;
    }
    var sql = "SELECT * FROM " + this.table;
    sql += (userInfo ? " WHERE id = ?" : " WHERE userAcc = ?");
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
        //var sql = "SELECT addUserInfo("+ Array(fields.length-1).fill("?").join() +") as id";
        var sql = "INSERT INTO "+ table +" ("+ fields.join() +") VALUES ("+ Array(fields.length).fill("?").join() +");";
        data.unshift(null);
        self.db.get().query(sql, data, function(err, result){
            if(err) return cb(err);
            if(other != null){
                var sql1 = "INSERT into " + otherTbl + " VALUES(null,?,?,1)";
                db.get().query(sql1, [result.insertId, JSON.stringify(other)], function(er){
                    if(er) return cb(er);
                    cb(null, result.insertId);
                });
            }else{
                cb(null, result.insertId);
            }
        });
    });
}

UserInfo.updateOther = function(id, field, data, cb){
    var sql = "SELECT * FROM " + otherTbl + " WHERE referenceID = ?";
    db.get().query(sql, [id], function(err, infoRaw){
        if(err) return cb(err);
        var infoData = infoRaw[0];
        infoData.data = JSON.parse(infoData.data);
        infoData.data[field] = data;
        infoData.data = JSON.stringify(infoData.data);
        sql = "UPDATE " + otherTbl + " SET data = ? WHERE referenceID = ?";
        db.get().query(sql, [infoData.data, id], function(err){
            if(err) return cb(err);
            cb(null, "data updated");
        });
    });
}

module.exports = UserInfo;