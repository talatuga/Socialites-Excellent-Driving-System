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
                    data.course.push({id: result.id, trans: result.carType, price: result.amount});
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
            entry.push(null);
            entry.push(0);
            entry.push(1);
            bulk.push(entry);
            if(i == courseData.length-1){
                insert();
            }
        });
        data.push(bulk);
    }else{
        sql += "VALUES(null,?,?,?,?,?,CURRENT_TIMESTAMP,0,1)";
        data.push(enrollmentID);
        data.push(courseData.id);
        data.push(courseData.branch);
        data.push(JSON.stringify(courseData.lesson));
        data.push(courseData.special ? 1 : 0);
        insert();
    }
}

module.exports = Lesson;