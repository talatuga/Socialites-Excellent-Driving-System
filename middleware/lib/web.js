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