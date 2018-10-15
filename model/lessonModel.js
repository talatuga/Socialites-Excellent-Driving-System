var db = require('./db');
var ModelModule = require('./model');
var table = "lesson";

var Lesson = {};
Lesson = Object.create(ModelModule);
Lesson.table = table;
Lesson.db = db;

var Course = {};
Course = Object.create(ModelModule);
Course.table = "course";
Course.db = db;

var WebCourse = {};
WebCourse = Object.create(ModelModule);
WebCourse.table = "web_course";
WebCourse.db = db;

var CourseEnrolled = {};
CourseEnrolled = Object.create(ModelModule);
CourseEnrolled.table = "course_enrolled";

//Business Logic Code:

Lesson.addCourse = function(data, cb){
    Course.create(data, function(err,result){
        if(err) return cb(err);
        var data2 = [null,result.insertId,data[2],data[4],60,data[3]];
        WebCourse.create(data2,function(er){
            if(er) return cb(er);
            cb(null);
        });
    });
}

Lesson.editCourse = function(id, data, cb){
    Course.update(id, data, null, function(err, result){
        if(err) return cb(err);
        var sql = "UPDATE " + WebCourse.table + " SET transmission = ?, days = ?, price = ? WHERE courseID = ?";
        db.get().query(sql, [data[1], data[3], data[2], id], function(er, res){
            if(er) return cb(er);
            cb(null);
        });
    });
}

Lesson.delCourse = function(id, cb){
    Course.delete(id, "status", cb);
}

Lesson.getListCourse = function(o, l, cb){
    Course.getList(o, l, cb);
}

Lesson.getCourse = function(id, cb){
    Course.get(id, cb);
}

Lesson.getCoursePrice = function(courseArr){
    return new Promise((resolve, reject)=>{
        var query = [];
        var data = {
            course: [],
            total: 0,
            origTotal: 0,
        };
        courseArr.forEach((e,i) => {
            query.push(new Promise((res, rej)=>{
                Lesson.getCourse(e.course, function(err, result){
                    if(err) return rej(err);
                    data.course.push({id: result.id, days: result.days, trans: result.carType, price: result.amount});
                    data.total += e.special ? (result.amount * 2) : result.amount;
                    data.origTotal += result.amount;
                    res();
                })
            }));
            if(i == courseArr.length-1){
                Promise.all(query).catch(reject).then(function(){
                    resolve(data);
                });
            }
        });
    });
}

Lesson.enrollCourse = function(enrollmentID, courseData, cb){
    var sql = "INSERT INTO " + CourseEnrolled.table + " ";
    var data = [];
    var insert = function(){
        db.get().query(sql, data, function(err, result){
            if(err) return cb(err);
            cb(null,result);
        });
    };
    if(Array.isArray(courseData)){
        sql += "VALUES ?";
        var bulk = [];
        courseData.forEach((e,i)=>{
            var entry = [null];
            entry.push(enrollmentID);
            entry.push(e.id);
            entry.push(e.branch);
            entry.push(JSON.stringify(e.lesson));
            entry.push(e.special ? 1 : 0);
            entry.push(Date.parse("today").toString("yyyy-MM-dd hh:mm:ss"));
            entry.push(0);
            entry.push(2);
            bulk.push(entry);
            if(i == courseData.length-1){
                insert();
            }
        });
        data.push(bulk);
    }else{
        sql += "VALUES(null,?,?,?,?,?,CURRENT_TIMESTAMP,0,2)";
        data.push(enrollmentID);
        data.push(courseData.id);
        data.push(courseData.branch);
        data.push(JSON.stringify(courseData.lesson));
        data.push(courseData.special ? 1 : 0);
        insert();
    }
}

Lesson.getCourseEnrolled = function(studID, cb){
    var sql = "SELECT ce.id as 'enrolledID', ce.enrollmentID, ce.courseID, ce.branch, ce.selectedLesson, ce.special, ce.dateEnrolled, ce.paid, ce.status as 'enrollStatus', c.* FROM course_enrolled ce, enrollment en, course c WHERE en.id = ce.enrollmentID AND en.studID = ? AND c.id = ce.courseID";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Lesson.endCourse = function(studentID, cb){
    var sql = "SELECT ce.id as 'id' FROM "+ CourseEnrolled.table +" ce, enrollment e WHERE e.id = ce.enrollmentID AND ce.status = 1 AND e.studID = ?";
    var sql2 = "UPDATE " + CourseEnrolled.table + " SET status = 0 WHERE status = 1 AND id = ?";
    db.get().query(sql, [studentID], function(err, course_enrolled){
        if(err) return cb(err);
        db.get().query(sql2, [course_enrolled.id], function(err){
            if(err) return cb(err);
            cb(null);
        });
    });
}

Lesson.getLessonEnrolled = function(studID, cb){
    var sql = "SELECT ce.selectedLesson, l.id, l.title FROM course_enrolled ce, enrollment en, lesson l WHERE en.id = ce.enrollmentID AND en.studID = ?";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        if(result[0].selectedLesson == "[]"){
            Lesson.getList(0,50, function(err, result){
                if(err) return cb(err);
                cb(null,result);
            });
        }else{
            var lessonsIDArr = JSON.parse(result[0].selectedLesson);
            var query = [];
            lessonsIDArr.forEach((e,i)=>{
                query.push(new Promise((resolve,reject)=>{
                    Lesson.get(e, null, function(err, result){
                        if(err) return reject(err);
                        resolve(result);
                    });
                }));
                if(i == lessonsIDArr.length-1){
                    Promise.all(query).catch(cb).then(function(lessons){
                        cb(null, lessons);
                    });
                }
            });
        }
    });
}

Lesson.getHandledStudents = function(instID, cb){
    var sql = "SELECT s.studID, s.instID, ui.fullname, ce.courseID, ce.special, b.name, c.carType FROM course c, schedule s, student st, userinfo ui, course_enrolled ce, branch b, enrollment e WHERE s.instID = ? AND st.userInfo = ui.id AND st.id = s.studID AND s.branch = b.id AND e.studID = st.id  AND ce.enrollmentID = e.id AND c.id = ce.courseID AND ce.status = 1 GROUP BY s.studID";
        db.get().query(sql, [instID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Lesson.getHandledPast = function(instID, cb){
    var sql = "SELECT s.studID, s.instID, ui.fullname, ce.courseID, ce.special, b.name, c.carType FROM course c, schedule s, student st, userinfo ui, course_enrolled ce, branch b, enrollment e WHERE s.instID = ? AND st.userInfo = ui.id AND st.id = s.studID AND s.branch = b.id AND e.studID = st.id  AND ce.enrollmentID = e.id AND c.id = ce.courseID AND ce.status = 0 GROUP BY s.studID";
        db.get().query(sql, [instID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

Lesson.getAvailableLessons = function(studID, cb){
    var sql = "SELECT l.title, l.id AS lessonID FROM course_enrolled ce, enrollment en, grades g, instructor i, userinfo ui, lesson l, schedule s WHERE en.id = ce.enrollmentID AND en.studID = ? AND g.studID = en.studID AND ce.status = 1 AND g.instID = i.id AND i.userinfo = ui.id AND g.lessonID = l.id AND s.id = g.schedID";
    db.get().query(sql, [studID], function(err, result){
        if(err) return cb(err);
        if(result.length == 0) return cb(null, []);
        cb(null, result);
    });
}

module.exports = Lesson;