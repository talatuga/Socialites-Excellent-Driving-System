var cert = require('../../model/studentModel');

exports.getStudDetails = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    cert.getStudDetailsCert(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getInst = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    cert.getInstCert(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}