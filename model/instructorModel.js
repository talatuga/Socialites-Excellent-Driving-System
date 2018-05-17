var db = require('./db');
var ModelModule = require('./model');
var UserInfo = require('./userInfoModel');
var table = "instructor";

//Constructor
var Instructor = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
Instructor.prototype = ModelModule.prototype;
Instructor.prototype.constructor = Instructor;

//Custom codes here: Instructor.prototype

//Override getList() function from parent model class.
Instructor.prototype.getList = function(offset, limit, cb){
    var sql = "CALL getInstList(?,?)";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Instructor.prototype.getInf = function(accID, cb){
    UserInfo.getInfo(accID, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Instructor.prototype.getVacant = function(id, cb){
    var sql = "SELECT vacant FROM " + this.tableName + " WHERE id = ?";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = new Instructor(table, db); //Export model for middleware use.