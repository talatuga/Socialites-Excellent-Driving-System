var db = require('./db');
var Timeline = require('../bin/scheduling/timeline');
var table = "schedule";

var timelineOptions = {
    start: '9:00',
    end: '17:30',
    break: [{start: '12:00', end: '13:30'}],
};

var Model = {}

Model.table = table;

Model.create = function (data, cb) { //data = [], cb = (error=new Error, result=[])=>{}
    var sql = "INSERT INTO "+ table +" VALUES (NULL,?,?, ?, ?, ?, ?, ?, ?);";
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Model.get = function (id, field, cb) {
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

Model.getSchedule = function(query, cb){
    var sql = "SELECT * FROM "+ table +" WHERE status > 0 AND date BETWEEN ? AND ?";
    
    var month = query.month || Date.parse('today').toString('MMMM');
    var day = query.day || null;

    var dateStart = Date.parse(month).toString('yyyy-MM-') + (day || '01');
    var dateEnd = Date.parse(month).toString('yyyy-MM-') + (day || '31');
    
    var data = [dateStart,dateEnd];

    if(query.start && query.end){
        data = [query.start,query.end];
    }

    if(query.instid){
        sql += " AND instID = ?";
        data.push(query.instid);
    }
    if(query.studid){
        sql += " AND studID = ?";
        data.push(query.studid);
    }
    if(query.branch){
        sql += " AND branch = ?";
        data.push(query.branch);
    }

    db.get().query(sql, data, function(err,result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Model.getAvailable = function(id, cb){
    var sql = "SELECT * FROM "+ table +" WHERE studID = ? AND status = 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Model.getAssigned = function(id, type, cb){
    var types = ['studID', 'instID'];
    var sql = "SELECT * FROM "+ table +" WHERE "+ types[type] +" = ? AND status > 1";
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

Model.getInstAssign = function(date, time, cb){
    var sql = "SELECT * FROM instructor inst, userinfo info, schedule sched WHERE inst.userInfo = info.id AND sched.instID = inst.id AND sched.date = ? AND sched.time = ? GROUP BY inst.id";
    db.get().query(sql, [date, time], function(err, data){
        if(err) return cb(err);
        cb(null, data);
    });
};

Model.assignInst = function(sched_inst, cb){
    var sql = "UPDATE " + table + " SET instID = ? WHERE id = ?";
    db.get().query(sql, [sched_inst.instID, sched_inst.schedID], function(err){
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
    return new Promise((r1, x1)=>{
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
                var weekCount = 1;
                for(var x=0; x<hours; x++){
                    if(prefdays[pos] <= 0){ //for security reason, preventing invalid data from crashing the system
                        prefdays[pos] = 1;
                    }
                    var nextDay = Date.parse('next ' + weekCount + ' ' + days[prefdays[pos]]);
                    promises.push(Model.getAvailableSchedOnDay(student.branch, nextDay)); //Include branch filter someday, after pre-final
                    if(pos == (prefdays.length-1)){
                        pos = 0;
                        weekCount++;
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

        var student;
        getStudent.then(function(stud){
            student = stud;
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
                        student.branch,      //  <------- changes this, by default it's 1 for main,
                        2       
                    ];
                    Model.create(data, function(err,result){
                        if(err) return not(err);
                        ok(result);
                    });
                }));
                if(i == dates.length-1){
                    Promise.all(promises).catch(x1).then(function(result){
                        studentModel.update(studID,0,'hours', function(err){
                            if(err) return x1(err);
                            r1(true);
                        });
                    });
                }
            });
        }).catch(x1);
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
        var sql = "SELECT id, date, time, hour FROM " + table + " WHERE branch = ? AND status = 2 AND date = ? ORDER BY time ASC";
        db.get().query(sql, [branch, day.toString('yyyy-MM-dd')], function(err, result){
            if(err) return reject(err);
            resolve(result);
        });
    });
};

/**
 * (DEPRECATED)
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

/**
 * 
 * @param {Number} branch 
 * @param {Date} date 
 * @param {String} time 
 * @returns Promise that returns either 0 - unavailable, 1 - available, 2 - overtime
 */
Model.checkSched = function(id, branch, date, time){
    return new Promise((resolve, reject)=>{
        if(Date.compare(Date.parse('next sunday'),date) > 0){
            return resolve(0);
        }
        this.getSchedOnDay(branch, date).catch(reject).then((schedules)=>{
            var timeline = new Timeline(timelineOptions);
            var getSched = function(){
                timeline.isTimeFree(time, 60, function(availability){
                    resolve(availability);
                });
            }
            if(schedules.length == 0){
                getSched();
            }else{
                schedules.forEach((e,i)=>{
                    if(e.id != id){
                        timeline.reserveTime(e.time, 60);
                    }
                    if(i == schedules.length-1){
                        getSched();
                    };
                });
            }
        });
    });
};

Model.updateSchedule = function(schedule, cb){
    var sql = "UPDATE " + table + " SET date = ?, time = ?, status = 2 WHERE id = ?";
    if(Array.isArray(schedule)){
        var promises = [];
        schedule.forEach((e,i)=>{
            var data = [e.date, e.time, e.id];
            if(e.instructor){
                sql = "UPDATE " + table + " SET date = ?, time = ?, instID = ?, status = 2 WHERE id = ?";
                data = [e.date, e.time, e.instructor.instID, e.id];
            }
            promises.push(new Promise((res,rej)=>{
                db.get().query(sql, data, function(err, result){
                    if(err) return rej(err);
                    res(true);
                });
            }));
            if(i==schedule.length-1){
                Promise.all(promises).catch(cb).then((ok)=>{
                    cb(null);
                });
            }
        });
    }else{
        db.get().query(sql,[schedule.date, schedule.time, schedule.id], function(err, result){
            if(err) return cb(err);
            cb(null);
        });
    }
};

/**
 * Automatically assign a student to a schedule, using its preferred information.
 * (Second Attempt)
 * @param {String} studID ID of the student to auto-assign
 * @returns A promise that returns array of sched found when done and no error happen.
 */
Model.autoAssignSched_1 = function(studentID){
    return new Promise((done, error)=>{
        var studentModel = require('./studentModel');
        var days = ['','monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
        var student;

        var prefDays;
        var pos = 0;
        var week = 0;

        var scheds = [];

        var getStudent = new Promise((ok, not)=>{
            studentModel.getData(studentID, function(err, studentData){
                if(err) return not(err);
                student = studentData;
                ok(studentData);
            });
        });

        var findSched = function(){
            return new Promise((resolve, reject)=>{
                var date = Date.parse('next ' + days[prefDays[pos]]);
                var nextWeek = Date.parse('next sunday');
                if(Date.compare(date, nextWeek) <= 0){
                    date.addWeeks(1);
                }
                date.addWeeks(week);
                Model.getFreeSchedOnDay(student.branch, date).catch(reject).then((result)=>{
                    pos++;
                    resolve(result);
                });
            });
        };

        var displayScheds = function(){
            var promises = [];
            scheds.forEach((e,i)=>{
                promises.push(new Promise((resolve, reject)=>{
                    var data = [
                        'session#' + (i+1),
                        e.date,
                        e.time,
                        1,
                        studentID,
                        null, //    <------- this is suppose to be instructor update value 
                        student.branch,      //  <------- changes this, by default it's 1 for main,
                        2       
                    ];
                    Model.create(data, function(err,result){
                        if(err) return reject(err);
                        resolve(result.insertId);
                    });
                }));
                if(i == scheds.length-1){
                    Promise.all(promises).catch(error).then(function(result){
                        studentModel.update(studentID,0,'hours', function(err){
                            if(err) return error(err);
                            done(result);
                        });
                    });
                }
            });
        }

        var chain = function(loop){
            if(loop == 0){
                return displayScheds();
            }

            return findSched().then((date)=>{
                scheds.push(date);
                if(pos == prefDays.length){
                    pos = 0;
                    week++;
                }
                chain(loop-1);
            });
        }

        getStudent.catch(error).then(data=>{
            prefDays = JSON.parse(data.prefDays);
            Promise.resolve(parseInt(data.hours)).then(chain);
        });
    });
};

Model.getFreeSchedOnDay = function(branch, day){
    return new Promise(function(resolve, reject){
        var targetDate = day;
        var lookForSched = function(){
            Model.getSchedOnDay(branch, targetDate).catch(reject).then((daySchedules)=>{
                var timeline = new Timeline(timelineOptions);
    
                var getTime = function(){
                    timeline.getFreeTime(60, function(freeTime){
                        if(freeTime.length == 0){
                            targetDate.addWeeks(1);
                            lookForSched(); // Try this recurse, if didn't work then fvck it. haven't test yet, but fvck it.
                        }else{
                            resolve({
                                date: targetDate.toString('yyyy-MM-dd'),
                                time: freeTime[0].start,
                                duration: 60,
                            });
                        }
                    });
                }
    
                if(daySchedules.length == 0){
                    getTime();
                }else{
                    daySchedules.forEach((e,i)=>{
                        timeline.reserveTime(e.time, (e.hour*60));
                        if(i == daySchedules.length-1){
                            getTime();
                        };
                    });
                }
            });       
        }
        lookForSched();
    });
};

Model.autoAssignInstructor = function(){

};

Model.isInstructorFree = function(){

};

module.exports = Model;