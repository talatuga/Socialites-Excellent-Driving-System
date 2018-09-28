var db = require('./db');
var log = require('../bin/logger');

var second = 1000;
var minute = second * 60;
var hour = minute * 60;

module.exports = function(){
    if(!process.env.RUN_EVENTS || process.env.RUN_EVENTS == "false") return log.logger('Event Scheduler Disable. set RUN_EVENT to true on .env file');
    enrollmentExpire();
    remindEnrolmentExpire();
    transferStudent();
}

function enrollmentExpire(){
    var table = "preregstudent";
    var week = 1;
    var sql = "UPDATE " + table + " SET status = 0 WHERE status > 0 AND DATE_ADD(dateSubmit, INTERVAL "+ week +" WEEK) < now()";
    db.get().query(sql, function(err,result){
        if(err) return log.errLogger(err);
        if(result.affectedRows != 0) log.logger("Expired Enrollment Removed");
    });
    return setTimeout(enrollmentExpire, hour);
}

function remindEnrolmentExpire(){
    var mailer = new (require('../bin/emailer'));
    var table = "preregstudent";
    var day = 5;
    var sql = "SELECT id, data FROM " + table + " WHERE status = 1 AND DATE_ADD(dateSubmit, INTERVAL "+ day +" DAY) < now()";
    db.get().query(sql,function(err, result){
        if(err) return log.errLogger(err);
        if(result.length != 0) log.logger("Sending Enrollment Expiration Reminder Email");
        result.forEach((element,index) => {
            var data;
            try{
                data = JSON.parse(element.data);
            }catch(error){
                return log.errLogger(error);
            }
            var emailAddress = data.info.email;
            var mail = {
                subject: 'Pending Enrollment Reminder',
                body: 'Hello ' + data.info.fullname.replace(/_/g," ") + ',<br>We notice that your enrollment on our school is about to expire on its 1 week due.<br>If you wish to continue your enrollment please settle your enrollment balance.<br><br>Thank you.',
            }
            mailer.send(emailAddress, mail, function(error){
                if(error) return log.errLogger(error);
                sql = "UPDATE " + table + " SET status = 2 WHERE id = ?";
                db.get().query(sql, [element.id], function(err){
                    if(err) return log.errLogger(err);
                });
            });
        });
    });
    return setTimeout(remindEnrolmentExpire, hour);
}

function transferStudent(){
    var student = require('./studentModel');
    var schedule = require('./scheduleModel');
    var table1 = "transfer_request";
    var sql = "SELECT * FROM " + table1 + " WHERE effectiveDate <= NOW() AND status = 2";
    db.get().query(sql, function(err, requests){
        if(err) return log.errLogger(err);
        if(requests.length != 0){
            var promises = [];
            requests.forEach((e,i)=>{
                promises.push(new Promise((resolve, reject)=>{
                    student.update(e.studID, e.to_branchID, "branch", function(err){
                        if(err) return reject(err);
                        schedule.getSchedule({
                            all: 1,
                            studid: e.studID,
                            status: 2,
                        }, function(err, schedules){
                            if(err) return reject(err);
                            if(schedules.length == 0) return resolve(1);
                            var promises1 = [];
                            schedules.forEach((sched, index)=>{
                                promises1.push(new Promise((resolve1, reject1)=>{
                                    schedule.update(sched.id, e.to_branchID, "branch", function(err){
                                        if(err) return reject1(err);
                                        schedule.cancelSchedule(sched.id, function(err){
                                            if(err) return reject1(err);
                                            resolve1(1);
                                        });
                                    });
                                }));
                                if(index==schedules.length-1){
                                    Promise.all(promises1).then(done=>{
                                        resolve(1);
                                    }).catch(reason=>{
                                        throw new Error(reason.stack);
                                    }).catch(reason=>{
                                        reject(reason);
                                    })
                                }
                            });
                        });
                    });
                    sql = "UPDATE " + table1 + " SET status = 4 WHERE id = ?";
                    db.get().query(sql, [e.id], function(err){
                        if(err) return reject(err);
                    });
                }));
                if(i==requests.length-1){
                    Promise.all(promises).then(res=>{
                        log.logger("Student Transfer Request Apply");
                    }).catch(reason=>{
                        throw new Error(reason.stack);
                    }).catch(reason=>{
                        log.errLogger(reason);                        
                    });
                }
            });
        }
    });
    return setTimeout(transferStudent, 3 * minute);
}