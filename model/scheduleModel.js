var db = require('./db');
var Timeline = require('../bin/scheduling/timeline');
var table = "schedule";

var timelineOptions = {
    start: '9:00',
    end: '17:30',
    break: [{start: '12:00', end: '13:30'}],
};

var Model = {}

Model.create = function (data, cb) { //data = [], cb = (error=new Error, result=[])=>{}
    var sql = "INSERT INTO "+ table +" VALUES (NULL,?,?, ?, ?, ?, ?, ?, ?);";
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, true);
    });
}

Model.get = function (id, field, cd) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    if (field == null) {
        sql = "SELECT * FROM schedule WHERE id = ?";
    } else {
        field = field.replace(';', '');
        sql = "SELECT " + field + " as field FROM schedule WHERE id = ?";
    }
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, field == null ? result[0] : result[0].field);
    });
}

Model.getAll = function(id, cb){
    var sql = "SELECT * FROM schedule WHERE id = ?";
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, result[0]);
    });
}

Model.getList = function(offset, limit, cb){
    var sql = "SELECT * FROM schedule WHERE id < ? ORDER BY id DESC LIMIT ?";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Model.update = function (id, param, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    var data = param;
    if (field == null) {
        sql = "UPDATE `schedule` SET `date`= ?, `time`= ?, `hour`= ?, `studentID`= ?, `instructorID`= ?, `branchID`= ? WHERE `id`= ?";
        data.push(id);
    } else {
        field = field.replace(';', '');        
        sql = "UPDATE `schedule` SET " + field + " = ? WHERE `id` = ?";
        data = [param, id]
    }
    db.get().query(sql, data, function (err, result) {
        if (err) return cb(err);
        cb(null, true);
    });
}

Model.delete = function (id, cb) {
    //Still ondev
}

Model.getAvailable = function(id, cb){
    var sql = "SELECT * FROM "+ table +" WHERE studID = ? AND status = 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Model.getAssigned = function(id, cb){
    var sql = "SELECT * FROM "+ table +" WHERE studID = ? AND status > 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Model.removeSched = function(id, cb){
    var sql = "UPDATE " + table + " SET status = 1 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

Model.assignSched = function(id, cb){
    var sql = "UPDATE " + table + " SET status = 2 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

/**
 * Automatically assign a student to a schedule, using its preferred information.
 * @param {String} studID ID of the student to auto-assign
 * @returns A promise the returns true when done and no error happen.
 */
Model.autoAssignSched = function(studID){
    return new Promise((resolve, reject)=>{
        var studentModel = require('./studentModel');
        var days = ['','monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

        var getStudent = new Promise((ok, not)=>{
            studentModel.getData(studID, function(err, student){
                if(err) return not(err);
                ok(student);
            });
        });

        var assignNextWeek = function(student){
            return new Promise((ok,not)=>{
                var hours = parseInt(student.hours);
                var prefdays = JSON.parse(student.prefDays);
                var pos = 0;
                var promises = [];
                for(var x=0; x<hours; x++){
                    if(prefdays[pos] <= 0){ //for security reason, preventing invalid data from crashing the system
                        prefdays[pos] = 1;
                    }
                    var nextDay = Date.parse('next ' + x+1 + ' ' + days[prefdays[pos]]);
                    promises.push(Model.getAvailableSchedOnDay(1, nextDay)); //Include branch filter someday, after pre-final
                    if(pos == (prefdays.length-1)){
                        pos = 0;
                    }else{
                        pos++;
                    }
                    if(x == hours-1){
                        Promise.all(promises).catch(not).then(function(dates){
                            ok(dates);     
                        });
                    }
                }
            });
        } 

        getStudent.then(function(stud){
            if(stud) return assignNextWeek(stud);
        }).then(function(dates){
            var promises = [];
            dates.forEach((e,i)=>{
                promises.push(new Promise((ok,not)=>{
                    var data = [
                        'session#' + (i+1),
                        e.date,
                        e.time,
                        1,
                        studID,
                        null, //    <------- this is suppose to be instructor update value 
                        1,
                        2       //  <------- changes this, by default it's 1 for main,
                    ];
                    Model.create(data, function(err,result){
                        if(err) return not(err);
                        ok(result);
                    });
                }));
                if(i == dates.length-1){
                    Promise.all(promises).catch(reject).then(function(result){
                        studentModel.update(studID,0,'hours', function(err){
                            if(err) return reject(err);
                            resolve(true);
                        });
                    });
                }
            });
        }).catch(reject);
    });
};

/**
 * Get the schedules on the specific branch and day.
 * @param {number} branch unique ID of specific branch to search for schedule.
 * @param {Date} day date where to look for schedule.
 * @returns A promise the returns Array of schedules for the specific parameters provided.
 */
Model.getSchedOnDay = function(branch, day){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT id, date, time FROM " + table + " WHERE branch = ? AND status = 2 AND date = ? ORDER BY time ASC";
        db.get().query(sql, [branch, day.toString('yyyy-MM-dd')], function(err, result){
            if(err) return reject(err);
            resolve(result);
        });
    });
};

/**
 * 
 * @param {number} branch unique ID of specific branch to search for available schedule.
 * @param {Date} weekday  specific day to look for available schedule.
 */
Model.getAvailableSchedOnDay = function(branch, weekday){
    return new Promise((resolve, reject)=>{
        var nextWeek = Date.parse('next sunday');
        var nextDay = weekday;
        var dateTimeSched = {};
        if(Date.compare(nextDay, nextWeek) == -1){
            nextDay.addWeeks(1);
        }
        var getFreeOnDay = function(fn, check, isDone = false){
            if(isDone){
                resolve(dateTimeSched);
                return;
            } 
            const promise = fn();
            return promise.then(result => getFreeOnDay(fn, check, check(result)));
        }
        var lookForSched = function(){
            return new Promise((ok, not)=>{
                Model.getSchedOnDay(branch, nextDay).then(function(schedules){
                    var timeline = new Timeline(timelineOptions);
                    var getSched = function(){
                        timeline.getFreeTime(60, res=>{
                            if(res.length > 0){
                                dateTimeSched.date = nextDay.toString('yyyy-MM-dd');
                                dateTimeSched.time = res[0].start;
                                ok(true);
                            }else{
                                ok(false);
                            }
                        });
                    }
                    if(schedules.length == 0){
                        getSched();
                    }else{
                        schedules.forEach((e,i)=>{
                            timeline.reserveTime(e.time, 60);
                            if(i == schedules.length-1){
                                getSched();
                            };
                        });
                    }
                }).catch(not);
            });
        };
        var checker = function(flag){
            if(flag){
                return true;
            }else{
                return false;
            }
        };
        
        getFreeOnDay(lookForSched, checker);
    });
};

module.exports = Model;