/* 
    viewRenderer.js, dito lahat ng rendering ng ejs.
    note: always export middleware renderer.
*/

var auth = require('./authentication');

exports.admin = function (req, res, next){
    if (res.locals.authenticated == 1) {
        var user = auth.getUser(req.sessionID);
        getUserInfo(user, function(err, data){
            if(err) return next(err);
            if(req.xhr == true){
                res.status(200).send({sucess: true, detail: "Successfully Logged In!"});
            }else{
                res.render('admin/index', data);
            }
        });
    }else {
        res.render('admin/login');
    }
}

exports.user = function(req, res, next){
    var WebModel = require('../model/webModel');
    var Car = require('../model/vehicleModel');
    new WebModel().getLicenseApply(function(err, data){
        if(err) return next(err);
        Car.getList(function(errr,vehicle){
            if(errr) return next(errr);
            res.render('main/index',{title: 'Socialites Excellent Driving', license: data, car: vehicle});
        });
    });
}

exports.student = function(req, res, next){
    res.render('student/index',{title: 'Socialites Excellent Driving'});
}

var getUserInfo = function(data, cb){ //REPAIR THIS WHOLE UNIT!!!! 
    var models = ['','adminModel', 'studentModel', 'instructorModel', 'branchModel'];
    var model = require('../model/' + models[data.accType]);
    model.getInfo(data.accID, function(err, result){
        if(err) return cb(err);
        cb(null, result);
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