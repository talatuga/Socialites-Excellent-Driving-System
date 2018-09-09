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
    var billing = require('../../model/accountModel'); 
    var course = require('../../model/lessonModel');
    var lic = require('../../model/requireModel');
    var enroll = [];
    req.session.cart.forEach((e,i)=>{
        enroll.push({
            course: e,
            special: data.special.course.indexOf(""+e) == -1 ? false : true,
        });
        if(i == data.course.length-1){
            if(data.account){
                student.getStudentByID(req.session.accID, function(err, studentData){
                    if(err) return next(err);
                    if(studentData.id == false) return res.status(200).send({success: false});
                    course.getCoursePrice(enroll).then(coursePrice=>{
                        var total = parseFloat(coursePrice.total);
                        var transaction = ("Enrollment");
                        billing.addBill(transaction, {enrolled: enroll, apply: 0}, data.payment, total, function(error, billResult){
                            if(error) return next(error);
                            student.enrollCourse([studentData.id, billResult.ORid, 2],function(errr,result){
                                if(errr) return next(errr);
                                var lesson = require('../../model/lessonModel');
                                var course_enroll = [];
                                enroll.forEach((e,i)=>{
                                    course_enroll.push({
                                        id: e.course,
                                        special: e.special,
                                        branch: studentData.branch,
                                        lesson: data.lesson ? data.lesson : [],
                                    });
                                    if(enroll.length==1){
                                        lesson.enrollCourse(result.insertId, course_enroll[0], function(er){
                                            if(er) return next(er);
                                            student.getStudentInfo(req.session.accID, 'fullname', function(errrr, studInfo){
                                                if(errrr) return next(errrr);
                                                res.status(200).send({success: true, invoice: billResult.ORid, name: studInfo.fullname});
                                            });
                                        });
                                    }else if(i==enroll.length-1){
                                        lesson.enrollCourse(result.insertId, course_enroll, function(er){
                                            if(er) return next(er);
                                            student.getStudentInfo(req.session.accID, 'fullname', function(errrr, studInfo){
                                                if(errrr) return next(errrr);
                                                res.status(200).send({success: true, invoice: result.ORid, name: studInfo.fullname});
                                            });
                                        });
                                    }                                  
                                });
                            });
                        });
                    }).catch(reason=>{
                        throw new Error(reason);
                    }).catch(reason=>{
                        next(new Error(reason));
                    });
                });
            }else{
                course.getCoursePrice(enroll).catch(next).then(function(coursePrice){
                    lic.getLicenseApply(data.applyLicense, function(err, license){
                        if(err) return next(err);
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
                                req.session.ORNUM = result.ORid;
                                res.status(200).send({success: true, invoice: result.ORid, name: data.info.fullname});
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

exports.generateInvoice = function(req, res, next){
    var pdf = require('../../bin/pdfGenerator');
    var fileName = "SED_Enrollment_Voucher.pdf";

    var course = require('../../model/lessonModel');
    var lic = require('../../model/requireModel');
    var billing = require('../../model/accountModel');

    var ornum = req.query.orno;
    var fullname = req.query.fullname;

    if(!ornum || !fullname){
        return res.status(404).send("Not Found");
    }

    var createInvoice = function(transaction){
        pdf.generateView(pdf.templates.invoice, transaction, function(err, html){
            if(err) return next(err);
            pdf.generatePDF(html, pdf.getBuffer, function(err, buffer){
                if(err) return next(err);
                res.set('Content-disposition', 'attachment; filename=' + fileName);
                res.set('Content-Type', 'Application/pdf');
                res.status(200).send(buffer);
            });
        });
    }

    billing.getBalance(ornum).catch(next).then(transaction=>{
        if(transaction){
            transaction.ORno = ornum;
            transaction.date = Date.parse(transaction.date).toString("MMM dd, yyyy");
            transaction.data = JSON.parse(transaction.data);
            transaction.payments = [];

            var getLicense = new Promise((resolve, reject)=>{
                lic.getLicenseApply(transaction.data.apply, function(err, license){
                    if(err) return reject(err);
                    resolve(license[0]);
                });
            });

            Promise.all([course.getCoursePrice(transaction.data.enrolled), getLicense]).catch(next).then(results=>{
                results.forEach(e=>{
                    if(e==undefined) return next(new Error("Data Process Error"));
                });
                var payments = [];
                results[0].course.forEach((e,i)=>{
                    payments.push({
                        desc: "Enroll " + e.days + " day/s " + (e.trans=="m" ? "Manual" : "Automatic") + " Course",
                        assessment: e.price,
                        balance: e.price,
                        payment: 0,
                    });
                    if(i==results[0].course.length-1){
                        payments.push({
                            desc: "Apply " + results[1].desc,
                            assessment: results[1].price,
                            balance: results[1].price,
                            payment: 0,
                        });
                        transaction.payments = payments;
                        transaction.name = fullname;
                        createInvoice(transaction);
                    }
                });
            });
        }else{
            res.status(404).send("Not Found");        
        }
    });
};