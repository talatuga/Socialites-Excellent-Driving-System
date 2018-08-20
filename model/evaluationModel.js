var db = require('./db');
var ModelModule = require('./model');
var table = "grades";

var Grade = {};
Grade = Object.create(ModelModule);
Grade.table = "grades";
Grade.db = db;

var Evaluation = {};
Evaluation = Object.create(ModelModule);
Evaluation.table = "evaluation";
Evaluation.db = db;

//Business Logic Below:

Grade.addGradeModal = function(instID, cb){
    var sql = "SELECT i.id, ui.fullname, st.id, s.date, s.time FROM userinfo ui, schedule s, instructor i, student st WHERE st.id = s.studID  AND s.instID = ? AND i.id = s.instID AND i.userinfo = ui.id";
    db.get().query(sql, [instID], function(err, result){
        console.log(instID);
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        console.log(result);
        if(err) return cb(err);
        cb(null, result);
    });
}

Grade.saveAddGrade = function(data, cb){
    Grade.create(data, function(err,result){
        if(err) return cb(err);
        var data2 = [null,result.insertId,data[2],data[4],60,data[3]];
        WebCourse.create(data2,function(er){
            if(er) return cb(er);
            cb(null);
        });
    });
}

// Grade.editGrade = function(data, cb){
// }

// Grade.delGrade = function(id, cb){
//     Course.delete(id, "status", cb);
// }

Grade.getAssignedInst = function(studID, cb){
    var sql = "SELECT c.carType, ce.courseID, i.id, ui.fullname, b.address FROM instructor i, userinfo ui, course_enrolled ce, student st, vehicle v, branch b, schedule s, course c, enrollment e WHERE st.id = ? AND i.userInfo = ui.id AND i.id = s.instID AND s.branch = b.id AND e.studID = st.id AND ce.enrollmentID = e.id AND c.id = ce.courseID GROUP BY ui.fullname";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Grade.addGrade = function(data, cb){
    Evaluation.create(data, cb);
}

module.exports = Grade;