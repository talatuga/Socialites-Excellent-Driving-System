var Model = require('../../model/webModel');
var webModel = new Model();

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
        student.preRegStud([null,req.body.data,null,1],function(err){
            if(err) return next(err);
            res.status(200).send({success: true});
        });
    }
};