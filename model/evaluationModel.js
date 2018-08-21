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

Grade.addEvaluation = function (data, cb){
    Evaluation.create(data,cb);
}

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
    var sql = "SELECT c.carType, ce.courseID, i.id, ui.fullname, b.address FROM instructor i, userinfo ui, course_enrolled ce, student st, vehicle v, branch b, schedule s, course c, enrollment e WHERE st.id = ? AND i.userInfo = ui.id AND i.id = s.instID AND s.branch = b.id AND s.studID = st.id AND ce.enrollmentID = e.id AND c.id = ce.courseID GROUP BY ui.fullname";
    db.get().query(sql, [studID], function(err, result){
        console.log(studID);
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        console.log(result);
        if(err) return cb(err);
        cb(null, result);
    });
}

Grade.getEvalInst = function (instID, cb){
    var sql = "SELECT i.id, ui.fullname, e.courseID, e.grade, e.comment, c.carType, e.dateEvaluated FROM instructor i, userinfo ui, course_enrolled ce, evaluation e, student st, course c WHERE st.id = e.studID AND st.userInfo = ui.id AND ce.courseID = e.courseID AND e.instID = ? AND e.target = 0 AND i.id = e.instID AND c.id = ce.courseID GROUP BY ui.fullname ORDER BY e.dateEvaluated DESC";
    db.get().query(sql, [instID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        console.log(result);
        if(err) return cb(err);
        cb(null, result);
    });
}

Grade.getEvalInstNumber = function (instID, cb){
    var sql = "SELECT COUNT(e.dateEvaluated) AS counter FROM evaluation e WHERE e.instID = ? AND e.target = 0";
    db.get().query(sql, [instID], function(err, result){
        console.log(result);
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        console.log(result);
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = Grade;