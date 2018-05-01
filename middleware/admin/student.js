var student = require('../../model/studentModel');

exports.create = function(req, res, next){
    var data = [];
    //VALIDATIONS
    student.create(data,function(err, result){
        if(err) return next(new Error(err));
        res.status(200).send({detail: "Successfully Added!"});
    });
}

exports.get = function(req, res, next){
    var id = req.params.id;
    var field = req.params.field; 

    if(field == undefined){
        student.get(id, function(err, result){
            if(err) return next(new Error(err));
            res.status(200).send(result);
        });
    }else{
        //VALIDATE THE FIELD; It may cause sql injection;
        field = field.replace(';', '');        
        student.get(id, field, function(err, result){
            if(err) return next(res.status(200).send("no data found."));
            res.status(200).send(result);            
        });
    }
}

exports.getAll = function(req, res, next){

}

exports.update = function(req, res, next){
    var id = req.params.id;
    var data = req.params.data;
    var field = req.params.field;
    
    if(field == undefined){
        student.update(id, data, function(err, result){
            if(err) return next(new Error(err));
            res.status(200).send({detail: "Successfully Added!"});
        });
    }else{
        field = field.replace(';', '');        
        student.update(id, data, field, function(err, result){
            if(err) return next(new Error(err));
            res.status(200).send({detail: "Successfully Added!"});
        });
    }
}

exports.updateAll = function(req, res, next){
    var data = [];
    //VALIDATIONS
    
    student.updateAll(data, function(err, result){
       if(err) return next(new Error(err));
       res.status(200).send({detail: "Successfullly Updated!"}); 
    });
}

exports.del = function(req, res, next){}

exports.delAll = function(req, res, next){}