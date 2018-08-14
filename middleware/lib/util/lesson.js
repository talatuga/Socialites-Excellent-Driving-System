var lesson = require('../../../model/lessonModel');
var validation = require('../../../bin/util/validation');
var valid = new validation();

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    //VALIDATIONS
    var dataIn = JSON.parse(req.body.data);
    var data = [];
    data.push(null);
    data.push(dataIn.title);
    data.push(dataIn.prerequisite);
    data.push(dataIn.description);
    data.push(dataIn.duration);
    data.push(1);

    valid.checkUndef(data, function(passed){
        if(passed){
            lesson.create(data, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, detail: "Successfully Created!"});
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data!"});
        }
    });
}

exports.get = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        /* if(query){
        }else{ */
            var field = param.field == undefined ? null : param.field;
            lesson.get(param.id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        //}
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        lesson.getList(offset, limit, function(err, result){
            if(err) return next(err);
            var processData = [];
            var response = function(){
                res.status(200).send({success: true, data: processData});
            };
            var count = result.length;
            result.forEach(element => {
                var pad = "000";
                element["lessonID"] = "SED-L" + (pad.substring(0,pad.length-(element.id+"").length) + element.id);
                if(element.purgeFlag != 0){
                    processData.push(element);
                }
                count--;
                if(count == 0) response();
            });
        });
    }
}

exports.update = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    //VALIDATIONS
    var id = parseInt(req.params.id);
    var field = req.params.field == undefined ? null : req.params.field.replace(/;/g,'');
    var dataIn = JSON.parse(req.body.data);
    
    var data = [];
    data.push(dataIn.title);
    data.push(dataIn.prerequisite);
    data.push(dataIn.description);
    data.push(dataIn.duration);
    data.push(1);

    valid.checkUndef(data,function(passed){
        if(passed){
            lesson.update(id, data, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, detail: "Successfully Modify!"});
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data!"});
        }
    })

}

exports.delete = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    var id = req.params.id;
    lesson.delete(id, "purgeFlag", function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail:"Successfully Deleted!"});
    }); 
}

exports.addCourse = function(req, res, next){
    if(res.locals.authenticated == 0) return next();        
    var dataIn = JSON.parse(req.body.data);
    
    var data = [""];
    data.push(dataIn.desc == undefined ? "" : dataIn.desc);
    data.push(dataIn.carType);
    data.push(dataIn.price);
    data.push(dataIn.days);
    data.push(1);

    valid.checkUndef(data,function(passed){
        if(passed){
            lesson.addCourse(data, function(err){
                if(err) return next(err);
                res.status(200).send({success:true, detail: "Successfully Added!"});
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data!"});
        }
    });

}

exports.editCourse = function(req, res, next){
    if(res.locals.authenticated == 0) return next();   
    var id = req.params.id; 
    var dataIn = JSON.parse(req.body.data);
    
    var data = [];
    data.push(dataIn.desc == undefined ? "" : dataIn.desc);
    data.push(dataIn.carType);
    data.push(dataIn.price);
    data.push(dataIn.days);
    data.push(1);

    valid.checkUndef(data,function(passed){
        if(passed){
            lesson.editCourse(id, data, function(err){
                if(err) return next(err);
                res.status(200).send();
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data!"});
        }
    });

}

exports.delCourse = function(req, res, next){
    if(res.locals.authenticated == 0) return next();   
    var id = req.params.id; 

    lesson.delCourse(id, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Deleted!"});
    })
}

exports.getCourse = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        /* if(query){
        }else{ */
            var field = param.field == undefined ? null : param.field;
            lesson.getListCourse(param.id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        //}
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        lesson.getListCourse(offset, limit, function(err, result){
            if(err) return next(err);
            var processData = [];
            var response = function(){
                res.status(200).send({success: true, data: processData});
            };
            var count = result.length;
            result.forEach(element => {
                if(element.status != 0){
                    var pad = "000";
                    element["courseID"] = "CRS-M" + (pad.substring(0,pad.length-(element.id+"").length) + element.id);
                    processData.push(element);
                }
                count--;
                if(count == 0) response();
            });
        });
    }
}