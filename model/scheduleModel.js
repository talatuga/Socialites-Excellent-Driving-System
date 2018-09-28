var db = require('./db');
var Timeline = require('../bin/scheduling/timeline');
var table = "schedule";

var timelineOptions = {
    start: '9:00',
    end: '17:30',
    break: [{start: '12:00', end: '13:30'}],
};

var Schedule = {}

Schedule.table = table;

Schedule.create = function (data, cb) { //data = [], cb = (error=new Error, result=[])=>{}
    var sql = "INSERT INTO "+ table +" VALUES (NULL,?,?, ?, ?, ?, ?, ?, ?);";
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Schedule.get = function (id, field, cb) {
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

Schedule.getAll = function(id, cb){
    var sql = "SELECT * FROM schedule WHERE id = ?";
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, result[0]);
    });
}

Schedule.getList = function(offset, limit, cb){
    var sql = "SELECT * FROM schedule WHERE id < ? ORDER BY id DESC LIMIT ?";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Schedule.update = function (id, param, field, cb) {
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

Schedule.delete = function (id, cb) {
    //Still ondev
}

Schedule.getSchedule = function(query, cb){
    var sql = "SELECT * FROM "+ table +" WHERE date BETWEEN ? AND ?";
    
    var month = query.month || Date.parse('today').toString('MMMM');
    var day = query.day || null;

    var dateStart = Date.parse(month).toString('yyyy-MM-') + (day || '01');
    var dateEnd = Date.parse(month).toString('yyyy-MM-') + (day || '31');
    
    var data = [dateStart,dateEnd];

    if(query.start && query.end){
        data = [query.start,query.end];
    }
    if(query.all){
        var start = Date.parse('1969').toString('yyyy-MM-01');
        var end = Date.parse('next year').toString('yyyy-12-31');
        data = [start,end];
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
    if(query.status){
        sql += " AND status = ?";
        data.push(query.status);
    }else{
        sql += " AND status > 0";
    }

    db.get().query(sql, data, function(err,result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Schedule.getAvailable = function(id, cb){
    var sql = "SELECT * FROM "+ table +" WHERE studID = ? AND status = 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Schedule.getAssigned = function(id, type, cb){
    var types = ['studID', 'instID'];
    var sql = "SELECT * FROM "+ table +" WHERE "+ types[type] +" = ? AND status > 1";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

Schedule.removeSched = function(id, cb){
    var sql = "UPDATE " + table + " SET status = 1 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

Schedule.cancelSchedule = function(id, cb){
    Schedule.get(id, function(err, sched){
        var status = sched.status;
        if(err) return cb(err);
        var nextWeek = Date.parse('next sunday');
        var date = Date.parse(sched.date);
        if(date.compareTo(nextWeek) <= 0){
            status = 4;
        }else{
            status = 1;
        }
        Schedule.update(id, status, "status", function(err){
            if(err) return cb(err);
            cb(null);
        });
    });
};

Schedule.assignSched = function(id, cb){
    var sql = "UPDATE " + table + " SET status = 2 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

Schedule.getInstAssign = function(date, time, branch, cb){
    if(typeof branch == "function"){
        cb = branch;
        branch = null;
    }
    var sql = "SELECT * FROM " + table + " WHERE date = ? AND time = ? AND status = 2";
    var dataQuery = [date, time];
    if(branch){
        sql += " AND branch = ?";
        dataQuery.push(branch);
    }
    db.get().query(sql, dataQuery, function(err, sched){
        if(err) return cb(err);
        if(sched.length == 0) return cb(null, []);
        var inst = require('./instructorModel');
        var promises = [];
        sched.forEach((e,i)=>{
            promises.push(new Promise((resolve, reject)=>{
                inst.get(e.instID, function(err, data){
                    if(err) return reject(err);
                    resolve(data[0]);
                })
            }));
            if(i==sched.length-1){
                Promise.all(promises).then(data=>{
                    cb(null, data);
                }).catch(reason=>{
                    throw new Error(reason.stack);
                }).catch(reason=>{
                    cb(reason);
                });
            }
        }); 
    });
};

Schedule.assignInst = function(sched_inst, cb){
    var sql = "UPDATE " + table + " SET instID = ? WHERE id = ?";
    db.get().query(sql, [sched_inst.instID, sched_inst.schedID], function(err){
        if(err) return cb(err);
        cb(null);
    });
};

/**
 * Automatically assign a student to a schedule, using its preferred information. (DEPRECATED)
 * @param {String} studID ID of the student to auto-assign
 * @returns A promise the returns true when done and no error happen.
 */
Schedule.autoAssignSched = function(studID){
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
                    promises.push(Schedule.getAvailableSchedOnDay(student.branch, nextDay)); //Include branch filter someday, after pre-final
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
                    Schedule.create(data, function(err,result){
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
Schedule.getSchedOnDay = function(branch, instID, day){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT id, date, time, hour, instID FROM " + table + " WHERE status = 2 AND date = ?";
        var data = [day.toString('yyyy-MM-dd')];
        
        var branchID = branch ? branch : null;
        var inst = instID ? instID : null;

        if(inst){
            sql += " AND instID = ?";
            data.push(inst);
        }
        if(branchID){
            sql += " AND branch = ?";
            data.push(branchID);
        }

        sql += " ORDER BY time ASC";
        db.get().query(sql, data, function(err, result){
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
Schedule.getAvailableSchedOnDay = function(branch, weekday){
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
                Schedule.getSchedOnDay(branch, nextDay).then(function(schedules){
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
Schedule.checkSched = function(id, branch, instID, date, time){
    return new Promise((resolve, reject)=>{
        if(Date.compare(Date.parse('next sunday'),date) > 0){
            return resolve(0);
        }
        this.getSchedOnDay(branch, instID, date).catch(reject).then((schedules)=>{
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

Schedule.updateSchedule = function(schedule, cb){
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
Schedule.autoAssignSched_1 = function(studentID){
    return new Promise((done, error)=>{
        //#region Variable Declaration
        var studentModel = require('./studentModel');
        var days = ['','monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
        var student;

        var prefDays;
        var prefInst;
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
        //#endregion

        getStudent.catch(error).then(data=>{
            prefDays = JSON.parse(data.prefDays);
            Promise.resolve(parseInt(data.hours)).then(chain);
        });

        //#region Function Declaration
        function findSched(){
            return new Promise((resolve, reject)=>{
                var date = Date.parse('next ' + days[prefDays[pos]]);
                var nextWeek = Date.parse('next sunday');
                if(Date.compare(date, nextWeek) <= 0){
                    date.addWeeks(1);
                }
                date.addWeeks(week);
                Schedule.getFreeSchedOnDay(student.branch, date, prefInst).catch(reject).then((result)=>{
                    if(!prefInst) prefInst = result.instructor;
                    pos++;
                    resolve(result);
                });
            });
        };

        function displayScheds(){
            var promises = [];
            scheds.forEach((e,i)=>{
                promises.push(new Promise((resolve, reject)=>{
                    var data = [
                        'session#' + (i+1),
                        e.date,
                        e.time,
                        1,
                        studentID,
                        e.instructor, //    <------- this is suppose to be instructor update value 
                        student.branch,      //  <------- changes this, by default it's 1 for main,
                        2       
                    ];
                    Schedule.create(data, function(err,result){
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
        };

        function chain(loop){
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
        //#endregion
    });
};

Schedule.getFreeSchedOnDay = function(branch, day, instid){
    return new Promise(function(resolve, reject){
        var inst = require('./instructorModel');
        var targetDate = day; 
        var lookForSched = function(){
            Schedule.getSchedOnDay(branch, null, targetDate).catch(reject).then(daySchedules=>{
                return new Promise((res,rej)=>{
                    inst.getAllBranchInst(branch, function(err, instructors){
                        if(err) return rej(err);
                        res({worker: instructors.length, daySchedules: daySchedules});
                    });
                });
            }).then((data)=>{ /* ADD INSTRUCTOR HERE ,*/
                timelineOptions.worker = data.worker;
                var timeline = new Timeline(timelineOptions);
                var getTime = function(){
                    timeline.getFreeTime(60, function(freeTime){
                        if(freeTime.length == 0){
                            targetDate.addWeeks(1);
                            lookForSched(); // Try this recurse, if didn't work then fvck it. haven't test yet, but fvck it.
                        }else{
                            var freedate = targetDate.toString('yyyy-MM-dd');
                            var output = {
                                date: freedate,
                                time: freeTime[0].start,
                                instructor: instid,
                                duration: 60,
                            };

                            inst.getAvailableInst(branch, freedate.toString('yyyy-MM-dd'), freeTime[0].start, function(err, instructorList){
                                if(err) return reject(err);
                                if(instid == undefined){
                                    instid = instructorList[0].id;
                                    output.instructor = instructorList[0].id;
                                    resolve(output);
                                }else if(instructorList.findIndex(x=>x.id == instid) == -1){
                                    output.instructor = instructorList[0].id;
                                    resolve(output);
                                }else{
                                    resolve(output);
                                }
                            });
                        }
                    });
                }
    
                if(data.daySchedules.length == 0){
                    getTime();
                }else{
                    data.daySchedules.forEach((e,i)=>{
                        timeline.reserveTime(e.time, (e.hour*60));
                        if(i == data.daySchedules.length-1){
                            getTime();
                        };
                    });
                }
            });       
        }
        lookForSched();
    });
};

Schedule.autoAssignInstructor = function(){

};

Schedule.cancelSched = function(date, time, branch, cb){
    if(typeof branch == "function"){
        cb = branch;
        branch = null;
    }
    var sql = "SELECT studID, instID FROM " + table + " WHERE date = ? AND time >= ?";
    db.get().query(sql,[date,time], function(err,schedules){
        if(err) return cb(err);
        var targetDate = Date.parse(date);
        var nextWeek = Date.parse('next sunday');
        var data = [date, time];
        if(targetDate.compareTo(nextWeek) <= 0){
            data.unshift(4);
        }else{
            data.unshift(1);
        }
        sql = "UPDATE " + table + " SET status = ? WHERE date = ? AND time >= ? AND status = 2";
        if(branch){
            sql += " AND branch = ?";
            data.push(branch);
        }
        db.get().query(sql, data, function(error){
            if(error) return cb(error);
            cb(null, schedules);
        });
    });
};

/**
 * Automatically assign a student to a schedule, using its preferred information. instructor and branch
 * (Third Attempt and hope the last)(Incomplete)(autosched_1 already extended for this feature)
 * @param {String} studID ID of the student to auto-assign
 * @returns {Promise<Number[]>} A promise that returns array of sched found when done and no error happen.
 */
Schedule.autoAssignSched_2 = function(studID){
    return new Promise((resolve, reject)=>{
        var studentModel = require('./studentModel');
        var days = ['','monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

        getStudent(studID, function(err, student){
            if(err) return reject(err);
            var hours = parseInt(student.hours);
            var prefDaysRaw = JSON.parse(student.prefDays);
            var prefDays = [];

            prefDaysRaw.forEach((e,i)=>{
                prefDays.push(days[e]);
                if(i == prefDaysRaw.length-1){
                    findAvailableSched(prefDays, student.branch, null, check);
                }
            });
        });

        function getStudent(id, cb){
            studentModel.getData(id, function(err, data){
                if(err) return cb(err);
                cb(null, data);
            });
        }

        var currentWeek = 0;

        function findAvailableSched(prefDays, branch, instid, cb, done = false){
            if(done == true){
                return cb();
            }

            if(done == undefined) done = 0;

            Schedule.getFreeSchedOnDay(branch, Date.parse(prefDays[done])).then().catch();
        }

        function check(){

        }
    });
};

module.exports = Schedule;