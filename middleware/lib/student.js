/**
 * This is the Student Module, 
 * Contains the major transactions, and core of the system.
 * created by: CPTR
 */

var student = require('../../model/studentModel');
var Email = require('../../bin/emailer');
var payments = require('../../model/accountModel');
var lesson = require('../../model/lessonModel');
var Validation = require('../../bin/util/validation');
var valid = new Validation();

exports.create = function(req, res, next){ //Deprecated. Soon to delete from API
    var data = req.body["data[]"];
    //VALIDATIONS 
    data.unshift(null);
    student.create(data,function(err, result){
        if(err) return next(err);
        res.status(200).send({detail: "Successfully Added!"});
    });
}

exports.get = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    var query = Object.keys(req.query).length ? req.query : {};
    var param = Object.keys(req.params).length ? req.params : null;
    if(req.session.studID && !param){
        param = {
            id: req.session.studID,
        }
    }
    if(param){
        var field = (param.field == undefined ? null : param.field);
        student.get(param.id, field, function(err, result){
            if(err) return next(err);
            if(result == null) return next();
            res.status(200).send({success: true, data: result});                
        });
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        var type = query.filter == undefined ? 1 : parseInt(query.filter);
        var branch = query.branch;
        student.getList(offset, limit, type, branch, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
        });
    }
}

exports.update = function(req, res, next){
    var id = req.params.id;
    var dataIn = JSON.parse(req.body.data);
    var field = req.params.field;
    
    if(field == undefined){
        var data = [];
        data.push(dataIn.userAcc);
        data.push(dataIn.fullname);
        data.push(dataIn.address);
        data.push(dataIn.telno);
        data.push(dataIn.birthdate);
        data.push(dataIn.birthplace);
        data.push(dataIn.sex);
        data.push(dataIn.civilStatus);
        data.push(dataIn.email);
        data.push(2);

        valid.checkUndef(data, function(passed){
            if(passed){
                student.updateInfo(id, data, function(err, result){
                    if(err) return next(new Error(err));
                    res.status(200).send({detail: "Successfully Updated!"});
                });
            }else{
                res.status(200).send({detail: "Invalid Data!"});
            }
        });
    }else{
        field = field.replace(';', '');        
        student.update(id, data, field, function(err, result){
            if(err) return next(new Error(err));
            res.status(200).send({success: true, detail: "Successfully Added!"});
        });
    }
}

exports.updateAll = function(req, res, next){ //Deprecated. Soon to delete from API
    var data = [];
    //VALIDATIONS
    
    student.updateAll(data, function(err, result){
       if(err) return next(new Error(err));
       res.status(200).send({detail: "Successfullly Updated!"}); 
    });
}

exports.del = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    var id = req.params.id;
    student.delete(id, "status", function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail:"Successfully Deactivate!"});
    });
}

exports.delAll = function(req, res, next){} //Deprecated. Soon to delete from API

/**
 * *NOTE: This module needs proper documentation* This enroll a pending student registration.
 * One of the biggest Method of this Module.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.register = function(req, res, next){
    //#region Variable Declaration 
    var id = req.body.id;
    var password = require('../../bin/util/tokenGenerator').generateToken(15);
    var accountModel = require('../../model/userAccModel');
   
    var studentID;
    var ORcode;
    var enrollmentID;
    var enrolleeData;
    //#endregion

    // <------ Execute Synchronously ------> //
    getEnrollee(id).catch(next).then(enrollee=>{
        return checkBalance(enrollee);
    }).then(result=>{
        if(result.passed){
            return enroll(result.enrollee);
        }else{
            return res.next(200).send({success: false, detail: result.reason});
        }
    }).then(data=>{
        res.status(200).send({success: data.success, detail: data.detail});
        if(data.success){
            var task = [];
            task.push(sendEmail(data.userData));
            task.push(sendSms(data.userData));
            var sideTask = new Promise((resolve, reject)=>{
                var sched = require('../../model/scheduleModel');
                enrollCourse(studentID, ORcode, data.userData.data.course).then(function(flag){
                    if(flag) return payEnrollment(ORcode);
                }).then(function(flag){
                    if(flag) return sched.autoAssignSched_1(studentID);
                }).then(function(flag){
                    if(flag){
                        var notifier = require('./notification');
                        notifier.addNotificationMethod('admin', 'QUICK_BROADCAST', {message: 'Done scheduling StudentID: ' + studentID, messageType: 'schedule', title: 'Student Automatic Schedule'}, 'none', function(err, detail){
                            if(err) return reject('notifying fail');
                        });
                        resolve(true);
                    }
                }).catch(reject);
            });
            task.push(sideTask);
            
            Promise.all(task).then(function(results){
                if(results.indexOf(false) != -1){
                    next(new Error("One/All of the Executing tasks after enrollment failed: " + results.indexOf(false)));
                }
            }).catch(function(reason){
                throw new Error(reason);
            });
        }
    });

    //#region Function Declaration 
    function generateID(accID,infoID){
        infoID = infoID + "";
        var pad = "0000";
        var date = Date.parse('now').toString('yyyy');
        return (date + "-" + (pad.substring(0,pad.length-infoID.length)+infoID));
    };

    function getEnrollee(enrolleeID){
        return new Promise((resolve, reject)=>{
            student.getEnrollee(enrolleeID, function(err, enrollee){
                if(err) return next(err);
                enrolleeData = enrollee;
                resolve(enrollee);
            });
        });
    };

    function checkBalance(enrollee){
        return new Promise((resolve, reject)=>{
            var OR = enrollee.data.transaction.ORnum;
            ORcode = OR;
            Promise.all([payments.getEnrollBal(OR),payments.getTransactions(OR)]).catch(reject).then(function(dataArr){
                dataArr.forEach(function(e){
                    if(e == undefined || e == null){
                        return next(new Error("Undefined data"));
                    }
                });
                var enrollment = dataArr[0];
                var accountSum = dataArr[1];
                var balance = parseFloat(enrollment.overall) - parseFloat(accountSum.transaction[0].balance);
                if(balance >= (enrollment.total*0.5)){
                    resolve({passed: true, enrollee: enrollee});
                }else{
                    resolve({passed: false, reason: "Tuition not yet fully/half paid."});
                }
            });
        });
    };

    function enroll(enrollee){
        return new Promise((resolve, reject)=>{
            /**
             * Register User Account
             * @param {String} user username
             * @param {String} pass password
             */
            var registerUserAcc = function(user, pass){
                return new Promise((resolve0, reject0)=>{
                    accountModel.register([user, pass, 3], function(err, accID){
                        if(err){
                            if(err.errno == 1062){
                                res.status(200).send({success:false, detail:"Username Already Taken!"});
                            }
                            return reject0(err);
                        }
                        resolve0(accID);
                    });
                });
            };

            /**
             * Register User Info
             * @param {String} accID user account ID 
             */
            var registerInfo = function(accID){
                return new Promise((resolve0, reject0)=>{
                    var infoModel = require('../../model/userInfoModel');
                    var info = [accID];
                    info.push(enrollee.data.info.fullname);
                    info.push(enrollee.data.info.address);
                    info.push(enrollee.data.info.telno);
                    info.push(enrollee.data.info.birthdate);
                    info.push(enrollee.data.info.birthplace);
                    info.push(enrollee.data.info.sex[0]);
                    info.push(enrollee.data.info.civilStatus);
                    info.push(enrollee.data.info.email);
                    info.push(3);

                    var other = {
                        occupation: enrollee.data.info.occupation,
                        guardian: enrollee.data.info.guardian
                    }

                    valid.checkUndef(info, function(passed){
                        if(passed){
                            infoModel.register(info, other, function(err, infoID){
                                if(err) return reject0(err);
                                resolve0([accID,infoID]);
                            })
                        }else{
                            reject0(new Error("Invalid Data"));
                        }
                    });
                });
            };

            /**
             * Register Student Data
             * @param {String} infoID user information ID 
             */
            var registerStudent = function(idArr){
                return new Promise((resolve0, reject0)=>{
                    var fixedID = generateID(idArr[0],idArr[1]);
                    studentID = fixedID;
                    var studData = [fixedID,idArr[1], "", 0, JSON.stringify(enrollee.data.preference.schedule), enrollee.data.preference.vehicle, enrollee.data.branch, null, 1];
                    student.create(studData,function(err, result){
                        if(err) return reject0(err);
                        student.preRegDone(id, function(e){
                            if(e) return reject0(e);
                            resolve0({success:result, detail: "ok", userData: enrollee});
                        });
                    });
                });
            };

            // <-------- Execute Synchronously --------> //
            registerUserAcc(enrollee.data.info.email, password).then(accID=>{
                return registerInfo(accID);
            }).then(infoID=>{
                return registerStudent(infoID);
            }).catch(reject).then(function(data){
                resolve(data);
            });
        });
    };
    
    function sendEmail(dataIn){
        return new Promise((resolve, reject)=>{
            var accountMail = new Email();
            var mailBody = {
                subject: "Welcome to Socialites Excellent Driving!",
                body: "<center><div style='width: 600px'><h1 style='color: black; font-weight: lighter;'>Good day, " + (dataIn.data.info.fullname).replace(/_/g,' ') + "!</h1><hr style='width=400px'><br><h3 style='color:black; font-weight: lighter; text-align: justify;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We, at Socialites Excellent Driving, are very pleased to inform you that you are now successfully enrolled to your selected course! With this, you are only a few steps closer now to becoming a prospective driver! Yey! <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So, what are you waiting for? Login to your student account and schedule now so you can get started!</h3><br><br><div style='width: 250px; height: 150px; padding: 10px; border: black solid 1px'><h3 style='color: black; font-weight: lighter;'>Your password is:</h3><input type='text' style='width: 200px; text-align: center' readonly value='" + password + "'><br><small style='color: red;'>(You can still change your password later on)</small><br><br><center><button href='https://www.facebook.com/' type='button' style='width: 150px; background-color: #3075AE; color: white; font-size: 12px; cursor: pointer; border: none; padding: 5px'>Login Now</button></center></div><br><h3 style='color: black; font-weight: lighter; text-align: left;'>Sincerely yours,<br>Socialites Excellent Driving</h3></div></center>",
            };
            accountMail.send(dataIn.data.info.email,mailBody,function(err, response){
                var logger = require('../../bin/logger');
                if(err){
                    logger.errLogger(new Error("Failed to send email to " + dataIn.data.info.email));
                    return resolve(false);
                }else{
                    logger.logger("Email sent to " + dataIn.data.info.email);
                    resolve(true);               
                }
            });
        });
    };

    function sendEmail1(dataIn){ //for approval of enrollment with account
        return new Promise((resolve, reject)=>{
            var accountMail = new Email();
            var mailBody = {
                subject: "Welcome to Socialites Excellent Driving!",
                body: "<center><div style='width: 600px'><h1 style='color: black; font-weight: lighter;'>Good day, " + (dataIn.data.info.fullname).replace(/_/g,' ') + "!</h1><hr style='width=400px'><br><h3 style='color:black; font-weight: lighter; text-align: justify;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We, at Socialites Excellent Driving, are very pleased to inform you that you are now successfully enrolled to your selected course! Yey! <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So, what are you waiting for? Login to your current student account and schedule now so you can get started!<br>Sincerely yours,<br><br>Socialites Excellent Driving</h3></div></center>",
            };
            accountMail.send(dataIn.data.info.email,mailBody,function(err, response){
                var logger = require('../../bin/logger');
                if(err){
                    logger.errLogger(new Error("Failed to send email to " + dataIn.data.info.email));
                    return resolve(false);
                }else{
                    logger.logger("Email sent to " + dataIn.data.info.email);
                    resolve(true);               
                }
            });
        });
    };

    function sendSms(student){
        return new Promise((resolve, reject)=>{
            var SMS = require('../../bin/smsSender');
            var sender = new SMS();
            var phone = student.data.info.telno;
            var msg = "Welcome Student! You can check your email for the password of your student dashboard."; //May 100 character limit lang :(
            sender.send(phone, msg, 0).then(res=>{
                resolve(res);
            }).catch(reason=>{
                throw new Error(reason.message);
            }).catch(error=>{
                reject(error);
            });
        });
    };

    function enrollCourse(studID, accID){
        return new Promise((resolve, reject)=>{
            student.enrollCourse([studID, accID],function(err, result1){
                if(err) return reject(err);
                enrollmentID = result1.insertId;
                var courseData = [];
                enrolleeData.data.course.forEach((e,i)=>{
                    if(enrolleeData.data.course.length == 1){
                        courseData = {
                            id: e,
                            special: enrolleeData.data.special.course.indexOf(e) == -1 ? false : true,
                            branch: enrolleeData.data.branch,
                            lesson: enrolleeData.data.lesson ? enrolleeData.data.lesson : [],
                        };
                    }else{
                        var entry = {
                            id: e,
                            special: enrolleeData.data.special.course.indexOf(e) == -1 ? false : true,
                            branch: enrolleeData.data.branch,
                            lesson: enrolleeData.data.lesson ? enrolleeData.data.lesson : [],
                        };
                        courseData.push(entry);
                    }
                    if(i == enrolleeData.data.course.length-1){
                        lesson.enrollCourse(result1.insertId, courseData, function(err, result){
                            if(err) return reject(err);
                            resolve(true);
                        });
                    }   
                });
            });  
        });
    };

    function payEnrollment(ORnum){
        return new Promise((resolve, reject)=>{
            payments.getBalance(ORnum).then(function(transaction){
                return (parseFloat(transaction.price) - parseFloat(transaction.balance));
            }).then(function(amountPaid){
                return new Promise((resolve1, reject1)=>{
                    payments.getEnrollBal(ORnum).then(function(courseList){
                        var toPay = false;
                        courseList.course.forEach((e,i)=>{
                            if(e.trans == "m" && !toPay){
                                toPay = e;
                            }
                            if(i == courseList.course.length-1){
                                if(!toPay){
                                    toPay = courseList.course[0];
                                }
                                var price = parseFloat(toPay.price);
                                price = toPay.special ? (price*2) : price; 
                                if((amountPaid - price) >= 0){
                                    resolve1({courseID: toPay.id, paid: 1, hours: toPay.duration});
                                }else if((amountPaid - (price*0.5)) >= 0){
                                    resolve1({courseID: toPay.id, paid: 2, hours: toPay.duration});
                                }else{
                                    reject("not fully/partially paid");
                                }
                            }
                        });
                    }).catch(reject1);
                });
            }).then(function(paidCourse){
                student.payCourseEnrolled(enrollmentID, paidCourse.courseID, paidCourse.paid, function(err){
                    if(err) return reject(err);
                    var initHour = parseInt(paidCourse.hours);
                    var hours = initHour >= 20 ? initHour+2 : initHour >= 15 ? initHour+1 : initHour;
                    student.addHours(studentID, hours, function(er){
                        if(er) return reject(er);
                        resolve(true);
                    });
                });
            }).catch(next);
        });
    };
    //#endregion
}

exports.getPreRegList = function(req, res, next){
    var processData = [];
    var response = function(){
        res.status(200).send({success: true, data: processData});
    };
    var offset = req.query.offset == undefined ? 0 : req.query.offset;
    var limit = req.query.limit == undefined ? 10 : parseInt(req.query.limit);
    var branch = req.query.branch == undefined ? null : req.query.branch;
    student.getPreRegList(offset, limit, function(err, result){
        if(err) return next(err);
        if(result.length == 0) return response();
        result.forEach((element,index) => {
            var data = JSON.parse(element.data);
            element.data = data;

            if(branch){
                if(branch == element.data.branch){
                    processData.push(element);
                }
            }else{
                processData.push(element);
            }

            if(index == result.length-1) return response();
        });
    });
}

exports.preRegDel = function(req, res, next){
    var id = req.params.id;
    student.preRegDel(id, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Deleted"});
    })
}

exports.preRegEdit = function(req, res, next){
    var id = req.params.id;
    var dataIn = JSON.parse(req.body.data);
    var data = [];
    data.push(dataIn.data);
    data.push(dataIn.dateSubmit);
    data.push(1);
    student.preRegEdit(id, dataIn.data, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Modify"});
    })
}

/**
 * This adds course on existing student.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.enroll = function(req, res, next){
    var dataIn = JSON.parse(req.body.data);
    var data = [null];
    data.push(dataIn.studID);
    data.push(dataIn.courseID);
    data.push(dataIn.branchID);
    data.push(dataIn.lessons);
    data.push(null);
    data.push(null);
    data.push(1);
    student.enrollCourse(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true});
    });
}

exports.getCourse = function(req , res, next){
    var studID = req.params.id || req.session.studID;
    var offset = req.query.offset ? req.query.offset : 0;
    var limit = req.query.limit ? req.query.limit : 10;

    if(!studID) return res.status(401).send({detail: "No credential found"});

    lesson.getCourseEnrolled(studID, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getLesson = function(req, res, next){
    
}

exports.getStudPayments = function(req, res, next){
    var studID = req.params.id == 'sessionID' ? req.session.studID : req.params.id;
    var payments = require('../../model/accountModel');
    payments.getStudentTransactions(studID, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.transferList = function(req, res, next){
    var query = req.query;
    if(req.session.studID) query.studid = req.session.studID;
    student.transferList(query, function(err, data){
        if(err) return next(err);
        res.status(200).send({success: true, data: data});
    });
}

exports.transferBranch = function(req, res, next){
    var studID = req.body.studID || req.session.studID;
    var branch = req.body.branch;   
    var effectiveDate = req.body.date;

    if(!studID || !branch || !effectiveDate) return res.status(200).send({success: false, detail: "Invalid Data"});
    student.getData(studID, function(err, data){
        if(err) return next(err);
        student.transfer(studID, branch, data.branch, Date.parse(effectiveDate).toString("yyyy-MM-dd"), function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, detail: "Transfer request has been submitted to your current branch's admin. Please wait until tomorrow for the response."});
        });
    });
}

exports.transferAction = function(req, res, next){
    var id = req.params.id;
    var action = req.body.action;
    if(!id || !action) return res.status(200).send({success: false, detail: "Invalid Data"});

    action = action.toUpperCase() == "APPROVE" ? 2 : action.toUpperCase() == "CANCEL" ? 5 : 3;

    student.transferAction(id, action, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: (action == 2 ? "Transfer Approve" : "Transfer Reject")});
    });
}

exports.prepareViewData = function(req, res, next){
    var WebModel = require('../../model/webModel');
    var courses = require ('../../model/lessonModel');
    var schedule = require('../../model/scheduleModel');
    var grades = require('../../model/evaluationModel');
    var branch = require('../../model/branchModel');
    var car = require('../../model/vehicleModel');
    if(req.session.studID != -1){
        var getSched = new Promise((resolve, reject)=>{
            schedule.getAvailable(req.session.studID, function(err, sched){
                if(err) return reject(err);
                res.locals.schedule = sched;
                resolve(sched);
            });
        });
        var getLicense = new Promise((resolve, reject)=>{
            new WebModel().getLicenseApply(function(err, data){
                if(err) return reject(err);
                res.locals.license = data;
                resolve(data);
            });
        });
        var getCourse = new Promise((resolve, reject)=>{
            courses.getCourseEnrolled(req.session.studID, function(err, crs){
                if(err) return reject(err);
                res.locals.courses = crs;
                resolve(crs);
            });
        });
        var getLessons = new Promise((resolve, reject)=>{
            courses.getLessonEnrolled(req.session.studID, function(err, crs){
                if(err) return reject(err);
                res.locals.lessons = crs;
                resolve(crs);
            });
        });
        var getInstructors = new Promise((resolve, reject)=>{
            grades.getAssignedInst(req.session.studID, function(err, inst){
                if(err) return reject(err);
                res.locals.instructors = inst;
                resolve(inst);
            });
        });
        var getBranch = new Promise((resolve,reject)=>{
            branch.getList(0,20, function(err, result){
                if(err) return reject(err);
                res.locals.branch = result;
                resolve(result);
            });
        });
        var getEvalStud = new Promise((resolve, reject)=>{
            grades.getEvalStud(req.session.studID, function(err, eval){
                if(err) return reject(err);
                res.locals.evalStud = eval;
                resolve(eval);
            });
        });
        var getStudentInfo = new Promise((resolve, reject)=>{
            student.getData(req.session.studID, function(err,data){
                if(err) return reject(err);
                student.getStudentInfo(req.session.accID, function(er, data2){
                    data2.data = JSON.parse(data2.data);
                    res.locals.student = {
                        personalInfo: data2,
                        studentInfo: data
                    };
                    resolve(true);
                });
            });
        });
        var getVehi = new Promise((resolve, reject)=>{
            car.getListModel(function(er, data){
                if(er) return reject(er);
                res.locals.car = data;
                resolve(true);
            });
        });
        var query = [getSched, getLicense, getCourse, getLessons, getInstructors, getBranch, getStudentInfo, getVehi, getEvalStud];
        Promise.all(query).then((results)=>{
            next();
        }).catch(next);
    }else{
        next();
    }
}// THERE IS WEIRD ABOUT THIS! ALL PROMISES RUNS EVEN NOT ADDED ON QUERY. IDK WHY.