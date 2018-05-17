var db = require('./db');
var ModelModule = require('./model');
var table = "studentinformation";

var Student = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
Student.prototype = ModelModule.prototype;
Student.prototype.constructor = Student;

//Business Logic Code Below:
Student.prototype.getList = function(offset, limit, cb){
    var sql = "CALL getStudList(?,?)";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
    });
}

module.exports = new Student(table, db);