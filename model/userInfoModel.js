var db = require("./db");
var ModelModule = require("./model");
var table = "userinfo";

var UserInfo = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
UserInfo.prototype = ModelModule.prototype;
UserInfo.prototype.constructor = UserInfo;

//Module related functionality:
UserInfo.prototype.getInfo = function(accID, cb){
    var sql = "SELECT * FROM " + this.tableName + " WHERE userAcc = ?";
    db.get().query(sql, [accID], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = new UserInfo(table, db);