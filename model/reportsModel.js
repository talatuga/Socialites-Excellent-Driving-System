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
//------------------------ENROLLEES
// Reports.getStud1A = function(date, cb){
//     var sql = "SELECT * FROM preregstudent WHERE DATE(dateSubmit)=?";
//     db.get().query(sql, [date], function(err, result){
//         if(err) return cb(err);
//         cb(null, result);
//     });
// }

//DB: Tups, padagdag sa WHERE clause yung sa specific branch. thankks!
Reports.getStud1A = function(date){
    return new Promise(function(resolve, reject){
        var sql = "SELECT * FROM preregstudent WHERE DATE(dateSubmit)=?";
        db.get().query(sql, [date], function(err, result){
            if(err) return reject(err);
            if(result.length==0){
                resolve([]);
            }else{
                resolve(result);
            }
        });
    });
};

Reports.getStud1B = function(week, year, cb){
    var sql = "SELECT * FROM preregstudent WHERE WEEK(dateSubmit)=(?-1) AND YEAR(dateSubmit)=? ORDER BY dateSubmit";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud1C = function(month, year, cb){
    var sql = "SELECT * FROM preregstudent WHERE MONTH(dateSubmit)=? AND YEAR(dateSubmit)=? ORDER BY dateSubmit";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud1D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM preregstudent WHERE (MONTH(dateSubmit)<=? AND MONTH(dateSubmit)>=?) AND (YEAR(dateSubmit)<=? AND YEAR(dateSubmit)>=?) ORDER BY dateSubmit";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud1E = function(year, cb){
    var sql = "SELECT * FROM preregstudent WHERE YEAR(dateSubmit)=? ORDER BY dateSubmit";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

//------------------------TRANSFEREES
Reports.getStud2A = function(date, cb){
    var sql = "SELECT * FROM transfer_request WHERE DATE(effectiveDate)=?";
    db.get().query(sql, [date], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}
Reports.getStud2B = function(week, year, cb){
    var sql = "SELECT * FROM transfer_request WHERE WEEK(effectiveDate)=(?-1) AND YEAR(effectiveDate)=? ORDER BY effectiveDate";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud2C = function(month, year, cb){
    var sql = "SELECT * FROM transfer_request WHERE MONTH(effectiveDate)=? AND YEAR(effectiveDate)=? ORDER BY effectiveDate";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud2D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM transfer_request WHERE (MONTH(effectiveDate)<=? AND MONTH(effectiveDate)>=?) AND (YEAR(effectiveDate)<=? AND YEAR(effectiveDate)>=?) ORDER BY effectiveDate";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud2E = function(year, cb){
    var sql = "SELECT * FROM transfer_request WHERE YEAR(effectiveDate)=? ORDER BY effectiveDate";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

//------------------------ENROLEED STUDENTS
Reports.getStud3A = function(date, cb){
    var sql = "SELECT * FROM student WHERE DATE(dateRegistered)=?";
    db.get().query(sql, [date], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}
Reports.getStud3B = function(week, year, cb){
    var sql = "SELECT * FROM student WHERE WEEK(dateRegistered)=(?-1) AND YEAR(dateRegistered)=? ORDER BY dateRegistered";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud3C = function(month, year, cb){
    var sql = "SELECT * FROM student WHERE MONTH(dateRegistered)=? AND YEAR(dateRegistered)=? ORDER BY dateRegistered";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud3D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM student WHERE (MONTH(dateRegistered)<=? AND MONTH(dateRegistered)>=?) AND (YEAR(dateRegistered)<=? AND YEAR(dateRegistered)>=?) ORDER BY dateRegistered";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud3E = function(year, cb){
    var sql = "SELECT * FROM student WHERE YEAR(dateRegistered)=? ORDER BY dateRegistered";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

//------------------------PERFORMANCE EVALUATION
Reports.getStud4A = function(date, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND DATE(dateEvaluated)=?";
    db.get().query(sql, [date], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}
Reports.getStud4B = function(week, year, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND WEEK(dateEvaluated)=(?-1) AND YEAR(dateEvaluated)=? ORDER BY dateEvaluated";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud4C = function(month, year, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND MONTH(dateEvaluated)=? AND YEAR(dateEvaluated)=? ORDER BY dateEvaluated";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud4D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND (MONTH(dateEvaluated)<=? AND MONTH(dateEvaluated)>=?) AND (YEAR(dateEvaluated)<=? AND YEAR(dateEvaluated)>=?) ORDER BY dateEvaluated";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud4E = function(year, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND YEAR(dateEvaluated)=? ORDER BY dateEvaluated";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}


//INSTRUCTORS

module.exports = Reports;
