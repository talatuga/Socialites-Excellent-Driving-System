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

Grade.addGrade = function (data, cb){
    Grade.create(data,cb);
}

Grade.addGradeModal = function(studID, instID, cb){
    var sql = "SELECT i.id AS instID, ui.fullname, st.id AS studId, s.id AS schedID, s.date, s.time AS schedtime FROM userinfo ui, schedule s, instructor i, student st WHERE st.id = ? AND st.id = s.studID AND s.instID = ? AND i.id = s.instID AND i.userinfo = ui.id GROUP BY s.date";
    db.get().query(sql, [studID, instID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
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

Grade.getAssignedInst = function(studID, cb){
    var sql = "SELECT c.carType, ce.courseID, i.id, ui.fullname, b.name FROM instructor i, userinfo ui, course_enrolled ce, student st, vehicle v, branch b, schedule s, course c, enrollment e WHERE st.id = ? AND i.userInfo = ui.id AND i.id = s.instID AND s.branch = b.id AND s.studID = st.id AND ce.enrollmentID = e.id AND c.id = ce.courseID GROUP BY ui.fullname";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

// Needed values: instID, selected month, year (EVALUATION REPORTS FOR SPECIFIC MONTH)
Grade.getEvalInst = function (instID, month, year, cb){
    var sql = "SELECT i.id, ui.fullname, e.courseID, e.grade, e.comment, c.carType, e.dateEvaluated FROM instructor i, userinfo ui, course_enrolled ce, evaluation e, student st, course c WHERE st.id = e.studID AND st.userInfo = ui.id AND ce.courseID = e.courseID AND e.instID = ? AND e.target = 0 AND i.id = e.instID AND c.id = ce.courseID AND MONTH(e.dateEvaluated) = ? AND YEAR(e.dateEvaluated) = ? GROUP BY ui.fullname ORDER BY e.dateEvaluated DESC";
    db.get().query(sql, [instID, month, year], function(err, result){
        // console.log(result);
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        if(err) return cb(err);
        cb(null, result);
    });
}

// Needed values: instID, past month, year (OVERALL PERCENTAGE FROM JAN - PAST MONTH)
Grade.getEvalInstPerc = function (instID, year, month, cb){
    var sql = "SELECT ROUND(AVG(e.grade), 0) AS count FROM instructor i, userinfo ui, course_enrolled ce, evaluation e, student st, course c WHERE st.id = e.studID AND st.userInfo = ui.id AND ce.courseID = e.courseID AND e.instID = ? AND YEAR(e.dateEvaluated) = ? AND MONTH(e.dateEvaluated) >= 1 AND MONTH(e.dateEvaluated) <= ? AND e.target = 0 AND i.id = e.instID AND c.id = ce.courseID GROUP BY ui.fullname ORDER BY e.dateEvaluated DESC";
    db.get().query(sql, [instID, year, month], function(err, result){
        // console.log(result);
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

// Needed values: instID, selected month, year (MONTHLY PERCENTAGE)
Grade.getEvalInstPercMonth = function (instID, year, month, cb){
    var sql = "SELECT ROUND(AVG(e.grade), 0) AS count FROM instructor i, userinfo ui, course_enrolled ce, evaluation e, student st, course c WHERE st.id = e.studID AND st.userInfo = ui.id AND ce.courseID = e.courseID AND e.instID = ? AND YEAR(e.dateEvaluated) = ? AND MONTH(e.dateEvaluated) = ? AND e.target = 0 AND i.id = e.instID AND c.id = ce.courseID GROUP BY ui.fullname ORDER BY e.dateEvaluated DESC";
    db.get().query(sql, [instID, year, month], function(err, result){
        // console.log(result);
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Grade.getEvalStud = function (studID, cb){
    var sql = "SELECT i.id, ui.fullname, e.courseID, c.carType, e.dateEvaluated, e.grade, e.comment FROM instructor i, userinfo ui, course_enrolled ce, evaluation e, course c, student st WHERE st.id = e.studID AND i.userInfo = ui.id AND ce.courseID = e.courseID AND e.studID = ? AND e.target = 1 AND i.id = e.instID GROUP BY ui.fullname ORDER BY e.dateEvaluated DESC";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Grade.getEvalInstNumber = function (instID, cb){
    var sql = "SELECT COUNT(e.dateEvaluated) AS counter FROM evaluation e WHERE e.instID = ? AND e.target = 0";
    db.get().query(sql, [instID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Grade.getGradesStudent = function (studID, cb){
    var sql = "SELECT ce.selectedLesson, g.*, ui.fullname, l.title, s.date, s.time FROM course_enrolled ce, enrollment en, grades g, instructor i, userinfo ui, lesson l, schedule s WHERE en.id = ce.enrollmentID AND en.studID = ? AND g.studID = en.studID AND g.instID = i.id AND i.userinfo = ui.id AND g.lessonID = l.id AND s.id = g.schedID ORDER BY s.date";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Grade.getGradesInst = function (studID, cb){
    var sql = "SELECT ce.selectedLesson, g.*, ui.fullname, i.id AS instID, l.title, s.date, s.time FROM course_enrolled ce, enrollment en, grades g, instructor i, userinfo ui, lesson l, schedule s WHERE en.id = ce.enrollmentID AND en.studID = ? AND g.studID = en.studID AND ce.status = 1 AND g.instID = i.id AND i.userinfo = ui.id AND g.lessonID = l.id AND s.id = g.schedID ORDER BY s.date";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Grade.getGradesInst2 = function (studID, cb){
    var sql = "SELECT ce.selectedLesson, g.*, ui.fullname, i.id AS instID, l.title, s.date, s.time FROM course_enrolled ce, enrollment en, grades g, instructor i, userinfo ui, lesson l, schedule s WHERE en.id = ce.enrollmentID AND en.studID = ? AND g.studID = en.studID AND ce.status = 0 AND g.instID = i.id AND i.userinfo = ui.id AND g.lessonID = l.id AND s.id = g.schedID ORDER BY s.date";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Grade.getGradesSum = function (studID, cb){
    var sql = "SELECT SUM(g.grade) AS sum FROM course_enrolled ce, enrollment en, grades g, instructor i, userinfo ui, lesson l, schedule s WHERE en.id = ce.enrollmentID AND en.studID = ? AND g.studID = en.studID AND ce.status = 1 AND g.instID = i.id AND i.userinfo = ui.id AND g.lessonID = l.id AND s.id = g.schedID";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

module.exports = Grade;