/* 
    viewRenderer.js, dito lahat ng rendering ng ejs.
    note: always export middleware renderer.
*/

var auth = require('./authentication');

/** @type {RequestHandler} */
exports.admin = function (req, res, next){
    if (res.locals.authenticated == 1) {
        var user = auth.getUser(req.sessionID);
        getUserInfo(user, function(err, data){
            if(err) return next(err);
            if(req.xhr == true){
                res.status(200).send({sucess: true, detail: "Successfully Logged In!"});
            }else{
                if(user.accType == 1){
                    res.render('admin/index', {info:data[0]});
                }else if(user.accType == 4){
                    req.session.locals = data;
                    res.redirect('/branch');
                }
            }
        });
    }else {
        res.render('admin/login');
    }
}

exports.user = function(req, res, next){
    var WebModel = new (require('../model/webModel'));
    var Car = require('../model/vehicleModel');
    WebModel.getLicenseApply(function(err, data){
        if(err) return next(err);
        Car.getListModel(function(errr,vehicle){
            if(errr) return next(errr);
            WebModel.getBranch(0, 99, true, function(err, branch){
                if(err) return next(err);

                var login = res.locals.login ? res.locals.login : '';
                res.locals.title = 'Socialites Excellent Driving';
                res.locals.login = login;
                res.locals.license = data;
                res.locals.car = vehicle;
                res.locals.branch = branch;
                res.render('main/index');
            })
        });
    });
}

exports.student = function(req, res, next){
    res.locals.title = 'Socialites Excellent Driving';
    res.locals.studID = req.session.studID;
    if(req.session.studID != -1){
        res.render('student/index', res.locals);
    }else{
        res.locals.login = 'loginStudent' + (req.method != "GET" ? " errorLogin" : "");
        exports.user(req,res,next);
    }
}

exports.instructor = function(req, res, next){
    var students = require ('../model/lessonModel');
    var instructor = require ('../model/instructorModel');
    var schedule = require ('../model/scheduleModel');
    var grades = require ('../model/evaluationModel');
    if(req.session.instID != -1){
        res.locals.title = 'Socialites Excellent Driving';
        res.locals.instID = req.session.instID;
        var getStudents = new Promise((resolve, reject)=>{
            students.getHandledStudents(req.session.instID, function(err, stud){
                if(err) return reject(err);
                res.locals.students = stud;
                resolve(stud);
            });
        });
        var getEvalInstNumber = new Promise((resolve, reject)=>{
            grades.getEvalInstNumber(req.session.instID, function(err, evalI){
                if(err) return reject(err);
                res.locals.evaluationINum = evalI;
                resolve(evalI);
            });
        });
        var getGradesInst = new Promise((resolve, reject)=>{
            grades.getGradesInst(req.session.instID, function(err, crs){
                if(err) return reject(err);
                res.locals.gradesInst = crs;
                resolve(crs);
            });
        });
        var getGradesSum = new Promise((resolve, reject)=>{
            grades.getGradesSum(req.session.instID, function(err, sum){
                if(err) return reject(err);
                res.locals.gradeSum = sum;
                resolve(sum);
            });
        });
        var getAvailableLessons = new Promise((resolve, reject)=>{
            students.getAvailableLessons(req.session.instID, function(err, lessonsAv){
                if(err) return reject(err);
                res.locals.avLess = lessonsAv;
                resolve(lessonsAv);
            });
        });
        var getHandledPast = new Promise((resolve, reject)=>{
            students.getHandledPast(req.session.instID, function(err, stud){
                if(err) return reject(err);
                res.locals.studentsPast = stud;
                resolve(stud);
            });
        });
        var getInfo = new Promise((resolve, reject)=>{
            instructor.get(req.session.instID, function(err, inst){
                if(err) return reject(err);
                inst[0].data = JSON.parse(inst[0].data);
                res.locals.user = inst[0];
                resolve(inst);
            });
        });
        Promise.all([getStudents, getEvalInstNumber, getGradesInst, getGradesSum, getAvailableLessons, getHandledPast, getInfo]).then((results)=>{
            res.render('instructor/index');
        }).catch(next);
    }else{
        res.locals.login = 'loginInst ' + (req.method == "POST" ? "errorLogin" : "");
        exports.user(req,res,next);
    }
}

exports.branch = function(req, res, next){
    if(req.session.accType == 4){
        var adminModel = require('../model/adminModel');
        res.locals.title = 'Socialites Excellent Driving';
        res.locals.info = req.session.locals;
        adminModel.getBranchHandled(res.locals.info.id, function(err, branchID){
            res.locals.branchID = branchID;
            res.render('branch/index', res.locals);
        });
    }else{
        res.render('admin/login');
    }
}

var getUserInfo = function(data, cb){ //REPAIR THIS WHOLE UNIT!!!! 
    var userInfo = require('../model/userInfoModel');
    userInfo.getInfo(data.accID, function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

exports.error = function(req, res, next){
    res.render("admin/error-partials/error", res.locals.data);
}
/*  //SD: Ano ganap ba dito? Explain ko...
    
    Para magets mo i'll explain how middleware works.
    -Middleware functions are basically functions lang meron lang silang fancy name kasi...
        Ginagamit sila for processing request.
    -Middleware works like a pipe and request are water. Dadaan yung request sa mga middlewares,
    and middleware process it before going to next middleware.

    Soo ganito structure nya: 
        var middlerware = function(req, res, next){ 
            //Some processing here
        }
    Where: 
        req = request
        res = response
        next = function that calls the next middleware.
        
    Pagtapus kana sa processing ng request dun mo na gagamit si res,
    sa file na to, puro rendering lang ganap. soo mostly makikita mo: res.render(...);

    Soo for you makapagrender ng matinong page. may dalawang parameters si render();
    actually tatlo talaga kaso nevermind mo na yung isa, callback kasi yun.
    
        res.render(view,data);

    Where:
        view = path kay ejs. sample: 'admin/index' or 'main/index'
        data = data na iinclude mo sa pagrender ni ejs.

    P.S: di ko na i-eexplain fully sila request and response check mo nalang yung express API website
*/