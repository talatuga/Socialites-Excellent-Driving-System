var branch = require('../../model/branchModel');
var admin = require('../../model/adminModel');
var Validation = require('../../bin/util/validation');
var valid = new Validation();

var generateID = function(id){
    var pad = "000";
    return "SED-BR" + (pad.substring(0, pad.length-(id + "").length) + id);
};

var getID = function(id){
    return parseInt(id.slice(6, 9));
}

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    //VALIDATIONS
    var dataIn = JSON.parse(req.body.data);
    var data = [null];
    data.push(dataIn.address);
    data.push(dataIn.telno);
    data.push(dataIn.name);
    data.push(1);

    valid.checkUndef(data,function(passed){
        if(passed){
            branch.create(data, function(err, done){
                if(err) return next(err);
                var address = dataIn.address.split("_");
                branch.createWebBranch([null,done.insertId,dataIn.name,address[2],address.join(" "),dataIn.telno], function(er, result){
                    if(er) return next(er);
                    res.status(200).send({success: true, detail: "Successfully Added!"});
                });
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data"});
        }
    });
}

exports.get = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    var sendResponse = function(data){
        var out = [];
        if(Array.isArray(data)){
            data.forEach((element,index)=> {
                if(element.purgeFlag > 0){
                    element["branchID"] = generateID(element.id);
                    out.push(element);
                }
                if(index==data.length-1){
                    return res.status(200).send({success: true, data: out}); 
                }
            });
        }else{
            return res.status(200).send({success: true, data: data});             
        }
    };
    if(param){
        /* if(query){
        }else{ */
            var field = param.field == undefined ? null : param.field;
            branch.get(param.id, field, function(err, result){
                if(err) return next(err);
                sendResponse(result);                
            });
        //}
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        branch.getList(offset, limit, function(err, result){
            if(err) return next(err);
            sendResponse(result);
        });
    }
}

exports.update = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    //VALIDATIONS!
    var id = req.params.id;
    var dataIn = JSON.parse(req.body.data);
    var data = [];
    data.push(dataIn.address);
    data.push(dataIn.telno);
    data.push(dataIn.name);
    data.push(1);

    valid.checkUndef(data, function(passed){
        if(passed){
            branch.update(id, data, null, function(err, done){
                if(err) return next(err);
                res.status(200).send({success: true, detail: "Successfully Modified!"});
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data"});
        }
    })

}

exports.delete = function(req, res, next){
    if(res.locals.authenticated == 0) return next();  
    var id = req.params.id;  
    branch.delete(id, "purgeFlag", function(err, done){
        if(err) return next(err);
        res.status(200).send({success: true, detail:"Successfully Deleted!"});
    });
}

exports.getAdmin = function(req, res, next){
    var id = req.params.id;
    admin.getBranchAdmin(id, function(err, data){
        if(err) return next(err);
        res.status(200).send({success: true, data: data});
    });
}