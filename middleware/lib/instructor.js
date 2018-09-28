var instructor = require('../../model/instructorModel');
var grade = require('../../model/evaluationModel');
var Email = require('../../bin/emailer');

exports.create = function(req, res, next){
    var dataIn = JSON.parse(req.body.data);
    //Validation
    var password = require('../../bin/util/tokenGenerator').generateToken(15);
    var data = {
        credential: [],
        info: [],
        inst: []
    };
    var credential = [];
    credential.push(dataIn.info.email);
    credential.push(password);
    credential.push(2);
    
    var info = [];
    info.push(dataIn.info.fullname);
    info.push(dataIn.info.address);
    info.push(dataIn.info.telno);
    info.push(dataIn.info.bdate);
    info.push("n/a");
    info.push(dataIn.info.sex);
    info.push("n/a");
    info.push(dataIn.info.email);
    info.push(2);
 
    var inst = [''];
    inst.push('');
    inst.push(dataIn.license);
    inst.push(dataIn.licenseExp == undefined ? Date.parse("next 5 years").toString("yyyy-MM-dd") : dataIn.licenseExp);
    inst.push(dataIn.info.education);
    inst.push("");
    inst.push(null);
    inst.push(null);
    inst.push(1);

    data.credential = credential;
    data.info = info;
    data.inst = inst;
    
    instructor.register(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Created!"});
        var accountMail = new Email();
        var mailBody = {
            subject: "Welcome to Socialites Excellent Driving!",
            body: "<center><div style='width: 600px'><h1 style='color: black; font-weight: lighter;'>Good day, " + (dataIn.info.fullname).replace(/_/g,' ') + "!</h1><hr style='width=400px'><br><h3 style='color:black; font-weight: lighter; text-align: justify;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We, at <b>Socialites Excellent Driving</b>, welcome you as a new instructor of our family! Many aspiring prospective drivers are looking forward to meet you! So, what are you waiting for? Login to your instructor account now and let's keep on making S.E.D. the best driving school in the Philippines!</h3><br><br><div style='width: 250px; height: 150px; padding: 10px; border: black solid 1px'><h3 style='color: black; font-weight: lighter;'>Your password is:</h3><input type='text' style='width: 200px; text-align: center' readonly value='" + password + "'><br><small style='color: red;'>(You can still change your password later on)</small><br><br><center><button href='https://www.facebook.com/' type='button' style='width: 150px; background-color: #3075AE; color: white; font-size: 12px; cursor: pointer; border: none; padding: 5px'>Login Now</button></center></div><br><h3 style='color: black; font-weight: lighter; text-align: left;'>Very truly yours,<br>Socialites Excellent Driving</h3></div></center>",
        };
        accountMail.send(dataIn.info.email,mailBody,function(err, response){
            if(err) return next(err);
            require('../../bin/logger').logger("E-Mail Send to " + dataIn.info.email);
        });
    });
}

exports.get = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        if(Object.keys(query).length != 0){

        }else{
            var field = param.field == undefined ? null : param.field;
            var id = parseInt(param.id) == undefined ? 0 : param.id;
            instructor.get(id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        }
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        instructor.getList(offset, limit, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
        });
    }
}

exports.update = function(req, res, next){
    var id = req.params.id;
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var dataIn = JSON.parse(req.body.data);
    //VALIDATIONS
    var breakDownID = id.split("-");
    var account = parseInt(breakDownID[1].slice(0,3));
    var info = parseInt(breakDownID[1].slice(3,6));
    
    var data = {
        infoID: info,
        info: [],
        credential: {},
    };
    data.info.push(account);
    data.info.push(dataIn.fullname);
    data.info.push(dataIn.address);
    data.info.push(dataIn.telno);
    data.info.push(dataIn.bdate);
    data.info.push("n/a");
    data.info.push(dataIn.sex);
    data.info.push("n/a");
    data.info.push(dataIn.email);
    data.info.push(2);

    data.credential["id"] = account;
    data.credential["username"] = dataIn.username;
    data.credential["password"] = dataIn.password;
    data.credential["type"] = 2;

    data["license"] = dataIn.license;
    data["educ"] = dataIn.education;
    //data["vacant"] = dataIn.vacant;
    
    instructor.update(id, data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Modify!"});
    });
}

exports.delete = function(req, res, next){
    var id = req.params.id;
    var date = JSON.parse(req.body.data);

    instructor.delete(id, date, function(err, done){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Deleted!"});
    });
}

exports.getEvalInst = function (req, res, next){
    if(res.locals.authenticated == 0) return next();
    var year = req.query.year;
    var month = req.query.month;
    grade.getEvalInst(req.params.id, month, year, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getEvalStud = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    grade.getEvalStud(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});

    })
}

exports.testGettingAvailInst = function(req, res, next){
    var sched = require('../../model/scheduleModel');
    sched.getSchedule({}, function(err, result){
        instructor.assignToSched(result,function(err, result){
            res.status(200).send(result);
        });
    });
}