var db = require('./db');
var ModelModule = require('./model');

var Reports = {};
Reports = Object.create(ModelModule);
Reports.table = "account";
Reports.db = db;

var Student = {};
Student = Object.create(ModelModule);
Student.table = "student";
Student.db = db;

var PreRegister = {};
PreRegister = Object.create(ModelModule);
PreRegister.table = "preRegStudent";
PreRegister.db = db;

var Enroll = {};
Enroll = Object.create(ModelModule);
Enroll.table = "enrollment";
Enroll.db = db;

var Transfer = {};
Transfer = Object.create(ModelModule);
Transfer.table = "transfer_request";
Transfer.db = db;

var Evaluation = {};
Evaluation = Object.create(ModelModule);
Evaluation.table = "evaluation";
Evaluation.db = db;

var Schedule = {};
Schedule = Object.create(ModelModule);
Schedule.table = "schedule";
Schedule.db = db;


//GROSS INCOME


//STUDENTS
Reports.getStud1 = function(date, cb){
    var sql = "SELECT * FROM preregstudent WHERE dateSubmit=?";
    db.get().query(sql, [date], function(err, result){
        console.log(result);
        if(err) return cb(err);
        cb(null, result);
    });
}

//INSTRUCTORS

module.exports = Reports;