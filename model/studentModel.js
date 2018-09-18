var db = require('./db');
var ModelModule = require('./model');
var table = "student";

var Student = {};
Student = Object.create(ModelModule);
Student.table = table;
Student.db = db;

var PreRegister = {};
PreRegister = Object.create(ModelModule);
PreRegister.table = "preRegStudent";
PreRegister.db = db;

//Business Logic Code Below:
Student.getList = function(offset, limit, type, branch, cb){
    if(typeof branch == "function"){
        cb = branch;
        branch = null;
    }
    var sql = "";
    var data = [offset, limit];
    if(branch){
        sql = "CALL getStudListOnBranch(?,?,?,?)";
        data.push(branch);
        data.push(type);
    }else{
        if(type == 0){
            sql = "CALL getStudList(?,?)";
        }else{
            sql = "CALL getPastStud(?,?)";
        }
    }
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Student.get = function (id, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "CALL getStud(?)";
    this.db.get().query(sql, [id], function (err, result) {
        if (err) return cb(null, null);
        if (field == null) {
            cb(null, result[0]);
        } else {
            cb(null, result[0][0][field]);
        }
    });
}

Student.getData = function(id, cb){
    var sql = "SELECT * FROM " + table + " WHERE id = ?";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Student.updateInfo = function(id, data, cb){
    var userinfo = require('../model/userInfoModel');
    userinfo.update(id, data, null, cb);
} 

Student.preRegStud = function(data, cb){
    PreRegister.create(data, cb);
}

Student.preRegDel = function(id, cb){
    PreRegister.delete(id, "status", cb);
}

Student.preRegEdit = function(id, data, cb){
    PreRegister.update(id, data, "data", cb);
}

Student.getPreRegList = function(offset, limit, cb){
    var sql = "SELECT * FROM " + PreRegister.table + " WHERE id > ? AND status > 0 ORDER BY id ASC LIMIT ?";
    db.get().query(sql, [offset, limit], function(err,result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Student.getEnrollee = function(id, cb){
    var sql = "SELECT * FROM " + PreRegister.table + " WHERE id = ?";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        var output = result[0];
        output.data = JSON.parse(output.data);
        cb(null, output);
    });
}

var Enroll = {};
Enroll = Object.create(ModelModule);
Enroll.table = "enrollment";
Enroll.db = db;

Student.enrollCourse = function(data, cb){
    data.unshift(null);
    if(!data[3]){
        data.push(null);
        data.push(1);
    }else{
        data.push(data[3]);
        data[3] = null;
    }
    Enroll.create(data, cb);
};

Student.getStudentByID = function(accID, cb){
    var sql = "SELECT id FROM userinfo WHERE userAcc = ?";
    db.get().query(sql, [accID], function(err, result){
        if(err) return cb(err);
        if(result.length < 1) return cb(null, false);
        sql = "SELECT id, branch FROM student WHERE userInfo = ?";
        db.get().query(sql,[result[0].id],function(err2, result2){
            if(err2) return cb(err2);
            cb(null, result2[0]);            
        });
    });
};

Student.getEnrollment = function(studentID){
    
};

Student.getStudentInfo = function(accID, field, cb){
    if(typeof field == "function"){
        cb = field;
        field = null;
    }

    var sql = "SELECT s.id as 'studid', i.*, oi.data FROM student s, userinfo i, useraccount a, other_info oi WHERE a.id = i.userAcc AND oi.referenceID = i.id AND s.userInfo = i.id AND a.id = ?";
    var data = [accID];
    if(field){
        if(field.name == "branch"){
            sql += " AND s.branch = ?"
            data.push(field.value);
        } 
    }
    
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
};

Student.payCourseEnrolled = function(enrollmentID, courseEnrolledID, paid, cb){
    var sql = "UPDATE course_enrolled SET paid = ?, status = ?, dateEnrolled = CURRENT_TIMESTAMP WHERE enrollmentID = ? AND courseID = ?";
    db.get().query(sql, [paid, 1, enrollmentID, courseEnrolledID], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

Student.addHours = function(studentID, hours, cb){
    var sql = "SELECT hours FROM " + table + " WHERE id = ?";
    db.get().query(sql, [studentID], function(err, student){
        if(err) return cb(err);
        var newHours = parseInt(student[0].hours) + hours;
        sql = "UPDATE " + table + " SET hours = ? WHERE id = ?";
        db.get().query(sql, [newHours, studentID], function(err){
            if(err) return cb(err);
            cb(null);
        });
    })
};

module.exports = Student;