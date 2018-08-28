var schedule = require('../../model/scheduleModel');
var student = require('../../model/studentModel');
var course = require('../../model/lessonModel');
var instructor = require('../../model/instructorModel');

var checkConflict = function(branchID, schedules){
    return new Promise((resolve, reject)=>{
        var promises = [];
        if(Array.isArray(schedules)){
            schedules.forEach((e,i)=>{
                var task = new Promise((resolve, reject)=>{
                    schedule.checkSched(branchID, Date.parse(e.date), e.time).catch(reject).then(resolve);
                });
                promises.push(task);
                if(i==schedules.length-1){
                    Promise.all(promises).catch(reject).then(resolve);
                }
            });
        }else{
            schedule.checkSched(branchID, Date.parse(schedules.date), schedules.time).catch(reject).then(resolve);
        }
    });   
}

var sendingEmailStatus = false;

exports.calendar = function(req, res, next){
    var type = req.session.studID ? 0 : 1;
    var id = req.session.instID || req.session.studID;

    var sched = [];
    var processSched = function(data){
        if(data.length==0){
            return res.status(200).send(sched);
        }
        data.forEach((e,i) => {
            if(e.status != 1){
                var minDate = Date.parse("last sunday");
                var maxDate = Date.parse("next saturday");
                var date = new Date(e.date);
                var _editable;
                var eColor = "#3A87AD";
                var startDate = date.toString("yyyy-MM-dd") + " " + e.time;
                var endDate = new Date(startDate);
                endDate.addHours(parseInt(e.hour));
                
                if(date.between(minDate, maxDate)){
                    _editable = false;
                }else if(date.compareTo(minDate) == -1){
                    _editable = false;
                }else{
                    _editable = true;
                }
    
                if(e.status == 3){
                    eColor = "#64ff59";
                }else if(e.status == 4){
                    eColor = "#ff1e1e";
                }
    
                sched.push({
                    _id: e.id,
                    title: e.title,
                    start: startDate,
                    end: endDate.toString("yyyy-MM-dd HH:mm:ss"),
                    editable: _editable,
                    color: eColor,
                    overlap: false,
                    data: {
                        instructor:{
                            instID: e.instID,
                            name: "",
                        },
                        student: {
                            id: e.studID,
                        },
                        branch: e.branch,
                    }
                });
            }

            if(i == data.length-1){
                res.status(200).send(sched);
            }
        });
    }

    if(req.query.priv == "admin"){
        schedule.getSchedule(req.query, function(err, scheds){
            if(err) return next(err);
            processSched(scheds);
        });
    }else{
        schedule.getAssigned(id, type, function(err, data){
            if(err) return next(err);
            processSched(data);
        });
    }
};

exports.adminCalendar = function(req, res, next){
    //      Ano na??
};

exports.assignSched = function(req, res, next){
    schedule.assignSched(req.params.id, function(err){
        if(err) return next(err);
        res.status(200).send({success: true});
    })
};

exports.removeSchedFromCalendar = function(req, res, next){
    schedule.removeSched(req.params.id, function(err){
        if(err) return next(err);
        res.status(200).send({success: true});
    });
};

exports.changePref = function(req, res, next){
    if(req.session.studID == -1) return next();

    var id = req.session.studID;
    var days = req.body.days;
    var car = req.body.car;
    
    student.update(id, days, 'prefDays', function(err){
        if(err) return next(err);
        student.update(id, car, 'prefCar', function(er){
            if(er) return next(er);
            res.status(200).send({success: true});
        });
    });
};

exports.getPreference = function(req, res, next){
    if(req.session.studID == -1) return next();
    student.getData(req.session.studID, function(err, result){
        if(err) return next(err);
        var output;
        (require('../../model/vehicleModel')).get(result.prefCar, null, function(er, car){
            if(er) return next(er);
            output = {
                days: result.prefDays,
                car: {id:result.prefCar, brand: car.brand + " " + car.model}
            };
            res.status(200).send({success: true, data: output});
        });
    });
};

exports.getStudHour = function(req, res, next){
    var studID = req.params.studID || req.session.studID;

    var task1 = new Promise((resolve, reject)=>{
        student.getData(studID, function(err, data){
            if(err) return reject(err);
            resolve(data.hours);
        });
    });

    var task2 = new Promise((resolve, reject)=>{
        course.getCourseEnrolled(studID, function(err, data){
            if(err) return reject(err);
            data.forEach(e=>{
                if(e.status==1){
                    resolve(e.days);
                }
            });
        });
    });

    Promise.all([task1, task2]).then((results)=>{
        var courseTime = {
            remaining: results[0],
            used: parseInt(results[1]) - parseInt(results[0]),
            total: results[1],
        }
        res.status(200).send({success: true, data: courseTime});
    }).catch(next);
};

exports.getFreeInst = function(req, res, next){
    if(req.session.authenticated==0) return next();
    var branchID = req.query.branch;
    var date = new Date(req.query.date);
    var time = req.query.time;

    if(!branchID || !date || !time) return res.status(200).send({success: false, detail: "Incomplete Query"});

    schedule.getInstAssign(date.toString('yyyy-MM-dd'), time+":00", function(err, inst){
        if(err) return next(err);
        instructor.getList(0,999,function(er, result){
            if(er) return next(er);
            var query = [];
            if(inst.length==0) return res.status(200).send({success: true, data: result});
            inst.forEach((element,index)=>{
                query.push(new Promise((resolve, reject)=>{
                    result.forEach((e,i)=>{
                        if(element.instID == e.instID){
                            result.splice(i,1);
                            resolve();
                        }
                        if(i==result.length-1) return resolve();
                    });
                }));
                if(index==inst.length-1){
                    Promise.all(query).catch(next).then(instArr=>{
                        res.status(200).send({success: true, data: result});
                    });
                }
            });
        });
    });
};

exports.schedAvailability = function(req, res, next){
    if(req.session.authenticated==0) return next();
    var branchID = req.query.branch;
    var date = new Date(req.query.date);
    var time = req.query.time;
    var id = req.query.id;
    var instID = req.query.inst;
    schedule.checkSched(id, branchID, instID, date, time).catch(next).then((available)=>{
        res.status(200).send({success: true, status: available});
    });
};

exports.updateSchedule = function(req, res, next){
    var schedules = JSON.parse(req.body.events) || null;
    var branchID = req.body.branch || null;

    var output = {
        status: 0,
        title: "",
        events: schedules
    }

    var checkResult = function(result){
        result.forEach((e,i)=>{
            output.status = output.status != 2 ? 1 : 2;
            if(e==0){
                output.status = 0;
                output.title = schedules[i].title;
                res.status(200).send({success: true, data: output});
                return;
            }
            if(e==2) output.status = 2;
            if(i==result.length-1){
                updateSched(schedules);
            }
        });
    };

    var updateSched = function(scheduleList){
        schedule.updateSchedule(scheduleList, function(err){
            if(err) return next(err);
            res.status(200).send({success: true, data: output});
        });
    };

    var promises = [];
    schedules.forEach((e,i)=>{
        var task = new Promise((resolve, reject)=>{
            schedule.checkSched(branchID, Date.parse(e.date), e.time).catch(reject).then(resolve);
        });
        promises.push(task);
        if(i==schedules.length-1){
            Promise.all(promises).catch(next).then(checkResult);
        }
    });
};

exports.testAutoSched = function(req, res, next){
    schedule.autoAssignSched_1(req.query.id).then((scheds)=>{
        res.status(200).send(scheds)
    }).catch((reason)=>{
        next(reason);
    });
};

exports.getSched = function(req, res, next){
    var query = req.query;

    if(query.instid=='self'){
        query.instid = req.session.instID || null;
    }else if(query.studid=='self'){
        query.studid = req.session.studID || null;
    }

    schedule.getSchedule(query, function(err, sched){
        if(err) return next(err);
        res.status(200).send({success: true, data: sched});
    });
};

exports.cancel = function(req, res, next){
    var id = req.params.id;
    schedule.update(id, 4, "status", function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Schedule cancelled"});
    });
};

exports.done = function(req, res, next){
    var id = req.params.id;
    schedule.update(id, 3, "status", function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Attendance successfully record"});
    });
};

exports.suspend = function(req, res, next){
    var date = req.body.date;
    var reason = req.body.reason;

    if(req.body.emailTaskWait){
        var sendingEmailTimeloop = setInterval(()=>{
            if(sendingEmailStatus == false){
                clearInterval(sendingEmailTimeloop);
                res.status(200).send({success: true, detail: "Suspension Annoucement Sent!"});
            }
        }, 2000);
        return;
    }

    updateSchedule(function(error, schedAffected){
        if(error) return next(error);
        sendingEmailStatus = true;
        res.status(200).send({success: true, detail: "Successfully change schedules, sending announcement."});
        getEmail(schedAffected, function(err, emails){
            if(err) return next(err);
            sendEmail(emails);
        });
    });

    function sendEmail(recipient){
        var Emailer = require('../../bin/emailer');
        var mailer = new Emailer();

        if(recipient.length!=0){
            var promises = [];
            recipient.forEach((e,i)=>{
                promises.push(new Promise((resolve, reject)=>{
                    var mail = {
                        subject:"Suspension of Classes!",
                        body: "Sorry Class Suspend For " + date + " for the reason: \""+ reason +"\" Please reschedule your session. Thank you!",
                    };
            
                    mailer.send(e, mail, function(err, response){
                        if(err) return next(err);
                        resolve(response);
                    });
                }));
                if(i==recipient.length-1){
                    Promise.all(promises).then(results=>{
                        sendingEmailStatus = false;
                    }).catch(next);
                }
            });
        }else{
            sendingEmailStatus = false;
        }
    };

    function getEmail(schedules, cb){
        var inst = require('../../model/instructorModel');
        var stud = require('../../model/studentModel');

        var emails = [];
        var promises = [];
        if(schedules.length==0) return cb(null,[]);
        schedules.forEach((e,i)=>{
            promises.push(new Promise((resolve,reject)=>{
                var task1 = new Promise((r1,x1)=>{
                    inst.get(e.instID, "email", function(err, email){
                        if(err) return x1(err);
                        emails.push(email);
                        r1();
                    });
                }); 
                var task2 = new Promise((r1,x1)=>{
                    stud.get(e.studID, "email", function(err, studentEmail){
                        if(err) return x1(err);
                        emails.push(studentEmail);
                        r1();
                    });
                });
                Promise.all([task1,task2]).then(()=>{
                    resolve();
                }).catch(reason=>{
                    reject(reason);
                });
            }));
            if(i==schedules.length-1){
                Promise.all(promises).then(result=>{
                    cb(null, emails);
                }).catch(x=>{
                    cb(new Error(x));
                })
            }
        });
    };

    function updateSchedule(cb){
        var day = Date.parse(date).toString("yyyy-MM-dd");
        var time = Date.parse(date).toString("HH:mm:ss");
        schedule.cancelSched(day,time, function(err, schedAffected){
            if(err) return cb(err);
            cb(null, schedAffected);
        });
    };
};