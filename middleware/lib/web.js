var Model = require('../../model/webModel');
var webModel = new Model();
var validation = require('../../bin/util/validation');

exports.getCourse = function(req, res, next){
    webModel.getCourse(null,null, req.query.type, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
};

exports.getBranch = function(req, res, next){
    webModel.getBranch(null, null, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
};

exports.getCart = function(req, res, next){
    if(req.session.cart){
        res.status(200).send({success: true, data: req.session.cart});
    }else{
        req.session.cart = [];
        res.status(200).send({success: true, data: []});
    }
};

exports.updateCart = function(req, res, next){
    req.session.cart = JSON.parse(req.body.data);
    res.status(200).send({success: true});
};

exports.enrollWeb = function(req, res, next){
    var data = JSON.parse(req.body.data);
    var student = require('../../model/studentModel');
    var enroll = [];
    req.session.cart.forEach((e,i)=>{
        enroll.push({
            course: e,
            special: data.special.course.indexOf(""+e) == -1 ? false : true,
        });
        if(i == data.course.length-1){
            
            if(data.account){
                student.getStudentByID(req.session.accID, function(err, id){
                    if(err) return next(err);
                    if(id == false) return res.status(200).send({success: false});
                    data.course.forEach(element => {
                        student.enrollCourse([null,id,element,data.branch,data.lesson,null,null,1],function(errr,result){
                            if(errr) return next(errr);
                            res.status(200).send({success: true});
                        });
                    });
                });
            }else{
                var billing = require('../../model/accountModel'); 
                var course = require('../../model/lessonModel');
                var lic = require('../../model/requireModel')
                course.getCoursePrice(enroll).catch(next).then(function(coursePrice){
                    lic.getLicenseApply(data.applyLicense, function(err, license){
                        var total = parseFloat(coursePrice.total) + parseFloat(license[0].price);
                        data.transaction.transaction = ("Enrollment" + (data.applyLicense==0 ? "" : ", Apply-" + data.applyLicense));
                        billing.addBill(data.transaction.transaction, {enrolled: enroll, apply: data.applyLicense}, data.payment, total, function(err, result){
                            if(err) return next(err);
                            data.transaction["ORnum"] = result.ORid;
                            data.transaction["dataID"] = result.id;
                            var insert = JSON.stringify(data);
                            student.preRegStud([null,insert,null,1],function(err){
                                if(err) return next(err);
                                req.session.cart = [];
                                res.status(200).send({success: true});
                            });
                        });
                    });
                });
            }
        }
    });
};

exports.subscribe = function(req, res, next){
    var email = req.body.email;
    var validator = new validation();
    validator.add(email,validator.common.email);
    validator.check().then(function(){
        webModel.subcribeNewsletter(email, function(err){
            if(err) return next(err);
            res.status(200).send({success: true});
        });
    }).catch(function(e){
        res.status(400).send({success: false, detail: "Invalid Email!"});
    });
};

exports.unsubscribe = function(req, res, next){
    var email = req.params.email;
    var token = req.params.token;

    var validator = new validation();
    validator.add(email, validator.common.email);
    validator.check().then(function(){
        webModel.unsubscribeNewsletter(email,token, function(err){
            if(err) return next(err);
            res.status(200).send("<h1>Successfully Unsubscribe to SED Newsletter</h1>");
        });
    }).catch(function(e){
        res.status(400).send("<h1>400 Bad Request</h1><b><p>request maybe expired.</p>");
    });
};

exports.getLicenseList = function(req, res, next){
    webModel.getLicenseApply(function(err, _data){
        if(err) return next(err);
        res.status(200).send({success: true, data: _data});
    })
};