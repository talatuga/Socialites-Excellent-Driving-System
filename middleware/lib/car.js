var car = require('../../model/vehicleModel');

exports.create = function(req, res, next){
    var data = [];
    //VALIDATIONS
    car.create(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({detail: "Successfully Created!"});
    });
}

exports.get = function(req, res, next){
    var query = Object.keys(req.query).length ? req.query : null;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        if(query){
        }else{
            var field = param.field == undefined ? null : param.field;
            car.get(param.id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        }
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        car.getList(offset, limit, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
        });
    }
}

exports.update = function(req, res, next){
    var id = parseInt(req.params.id);
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var data = req.body.data;
    //VALIDATIONS
    car.update(id, data, field, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Modify!"});
    });
}

exports.delete = function(req, res, next){

}