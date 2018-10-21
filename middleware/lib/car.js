var car = require('../../model/vehicleModel'); 
var Validation = require('../../bin/util/validation');
var valid = new Validation();

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    //VALIDATIONS
    var dataInput = JSON.parse(req.body.data);
    var data = [""];
    offdayViaPlate(dataInput.plate, dataInput.branch, function(err, offday){
        if(err) return next(err);
        data.push(dataInput.model);
        data.push(dataInput.brand);
        data.push(dataInput.engine);
        data.push(dataInput.body);
        data.push(dataInput.displacement);
        data.push(dataInput.color);
        data.push(dataInput.transType);
        data.push(dataInput.price||"default");
        data.push(dataInput.plate);
        data.push("");
        data.push(dataInput.branch == undefined ? 1 : dataInput.branch);
        data.push(offday||"0");
        data.push(1);

        valid.checkUndef(data, function(passed){
            if(passed){
                data[10] = null;
                car.create(data, function(err, result){
                    if(err) return next(err);
                    res.status(200).send({success: true, detail: "Successfully Created!"});
                });
            }else{
                res.status(200).send({success: false, detail: "Invalid Data"});
            }
        });
    });
}

exports.get = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        /* if(query){
        }else{ */
            var field = param.field == undefined ? null : param.field;
            car.get(param.id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        //}
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
    if(res.locals.authenticated == 0) return next();    
    //VALIDATIONS
    var id = parseInt(req.params.id);
    var field = req.params.field == undefined ? null : req.params.field.replace(/;/g,'');
    var dataInput = JSON.parse(req.body.data);
    var data = dataInput;
    var query = function(){
        car.update(id, data, field, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, detail: "Successfully Modify!"});
        });
    };

    if(field == null){
        offdayViaPlate(dataInput.plate, dataInput.branch, function(err,offday){
            if(err) return next(err);
            data = [];
            data.push(dataInput.model);
            data.push(dataInput.brand);
            data.push(dataInput.engine);
            data.push(dataInput.body);
            data.push(dataInput.displacement);
            data.push(dataInput.color);
            data.push(dataInput.transType);
            data.push(dataInput.price || "default");
            data.push(dataInput.plate);
            data.push("");
            data.push(dataInput.branch == undefined ? 1 : dataInput.branch);
            data.push(offday);
            data.push(1);

            valid.checkUndef(data, function(passed){
                if(passed){
                    data.forEach((e,i)=>{
                        data[i] = e == "" ? null : e;
                    });
                    query();
                }else{
                    res.status(200).send({success: false, detail: "Invalid Data."});
                }
            })
        });
    }else{
        query();
    }
}

exports.delete = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    var id = parseInt(req.params.id);
    car.delete(id, "status", function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true});
    });
}

exports.getDefect = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var id = req.params.id;
    car.getDefect(id, function(err, _data){
        if(err) return next(err);
        res.status(200).send({success:true, data:_data});
    });
}

exports.addDefect = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var id = req.params.id; 
    var dataInput = JSON.parse(req.body.data);
    var data = [null];
    data.push(id);
    data.push(dataInput.part);
    data.push(dataInput.defect);
    data.push(dataInput.importance);
    data.push(1); 

    valid.checkUndef(data, function(passed){
        if(passed){
            car.addDefect(data, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, detail:"Successfully Added!"});
            });
        }else{
            res.status(200).send({success: false, detail:"Invalid Data."});
        }
    })
}

exports.delDefect = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var id = req.body.data;
    car.delDefect(id, "repaired", function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully deleted!"});
    });    
}

exports.addCodingScheme = function(req, res, next){
    var data = JSON.parse(req.body.data);
    var location = data.location;
    var scheme = data.pattern;

    if(location && scheme){
        car.addScheme(location,scheme, function(err, id){
            if(err) return next(err);
            res.status(200).send({success: true, detail: "Coding Scheme Successfully Added", data:{id:id}});
        });
    }else{
        res.status(200).send({success: false, detail:"Invalid Data"});
    }
}

exports.editCodingScheme = function(req, res, next){
    var id = req.params.id;
    if(id.match(/[0-9]/g)){
        var data = JSON.parse(req.body.data);
        var field = [];
        var value = [];
        var input = Object.keys(data);
        if(input.length >= 2){
            input.forEach(function(elem){
                field.push(elem);
                value.push(data[elem]);
            });
        }else{
            field = input[0];
            value = data[input[0]];
        }
        car.editScheme(id, field, value, function(err){
            if(err) return next(err);
            res.status(200).send({success: true, detail: "Successfully modified"});
        });
    }else{
        res.status(400).send({success: false, detail:"Invalid ID in request URL"});
    }
}

exports.delCodingScheme = function(req, res, next){
    var id = req.params.id;
    if(id.match(/[0-9]/g)){
        car.delScheme(id, function(err){
            if(err) return next(err);
            res.status(200).send({success: true, detail:"Successfully Deleted"});
        })
    }else{
        res.status(400).send({success: false, detail:"Invalid ID in request URL"});
    }
};

exports.getCodingScheme = function(req, res, next){
    var id = req.params.id;
    var run = function(){
        car.getScheme(id, function(err,data){
            if(err) return next(err);
            res.status(200).send({success: true, data: data});
        })
    };
    if(id){
        if(id.match(/[0-9]/g)){
            run();
        }else{
            res.status(400).send({success: false, detail:"Invalid ID in request URL"});
        }
    }else{
        run();
    }
};

/**
 * Get Offday of given plate on specific area(branch).
 * @param {String} plate plate number
 * @param {Number} branch branch id
 * @param {Function} cb (err: Error, offday: Number) 
 */
var offdayViaPlate = function(plate,branch,cb){
    var lastDigit = plate[plate.length-1];
    var scheme = [[1,2],[3,4],[5,6],[7,8],[9,0]];
    if(branch){
        car.getSchemeByLoc(branch, function(err, codingscheme){
            if(err) return cb(err);
            scheme = JSON.parse(codingscheme.scheme);
            scheme.forEach((e,i)=>{
                if(e[0] == lastDigit || e[1] == lastDigit){
                    return cb(null, i+1);
                }
            });
        })
    }else{
        return cb(null,(lastDigit == 1 || lastDigit == 2) ? 1 :
                (lastDigit == 3 || lastDigit == 4) ? 2 : 
                (lastDigit == 5 || lastDigit == 6) ? 3 :
                (lastDigit == 7 || lastDigit == 8) ? 4 :
                (lastDigit == 9 || lastDigit == 0) ? 5 : 0);
    }
};