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

Lesson.addCourse = function(data, cb){
    Course.create(data, function(err,result){
        if(err) return cb(err);
        var data2 = [null,result.insertId,data[1],data[3],60,data[2]];
        WebCourse.create(data2,function(er){
            if(er) return cb(er);
            cb(null);
        });
    });
}

Lesson.editCourse = function(id, data, cb){
    Course.update(id, data, null, cb);
}

Lesson.delCourse = function(id, cb){
    Course.delete(id, "status", cb);
}

Lesson.getListCourse = function(o, l, cb){
    Course.getList(o, l, cb);
}

//Business Logic Code:

module.exports = Lesson;