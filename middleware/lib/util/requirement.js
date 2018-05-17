var requirement = require('../../../model/requireModel');

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    //VALIDATIONS
    var data = JSON.parse(req.body.data);
    data.unshift(null);
    data.push(1);
    requirement.create(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Created!"});
    });
}

exports.get = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        if(query){
        }else{
            var field = param.field == undefined ? null : param.field;
            requirement.get(param.id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        }
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        requirement.getList(offset, limit, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
        });
    }
}

exports.update = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    //VALIDATIONS
    var id = parseInt(req.params.id);
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var data = JSON.parse(req.body.data);

    requirement.update(id, data, field, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Modify!"});
    });
}

exports.delete = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    
}