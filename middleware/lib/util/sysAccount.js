var db = require('../../../model/userAccModel');

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var dataIn = JSON.parse(req.body.data);
    var data = [];
    data.push(dataIn.username);    
    data.push(dataIn.password);    
    data.push(dataIn.acctype);
    db.register(data, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Registered"});
    });    
}

exports.get = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        /* if(query){
        }else{ */
            var field = param.field == undefined ? null : param.field;
            db.get(param.id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        //}
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        var type = query.type == undefined ? -1 : parseInt(query.type);
        db.getList(offset, limit, type, function(err, result){
            if(err) return next(err);
            var processData = [];
            var response = function(){
                res.status(200).send({success: true, data: processData});
            };
            var count = result.length;
            if(count == 0) return response();
            result.forEach(element => {
                var pad = "000";
                var pre = (element.accType == 1 ? "ADMIN" : element.accType == 2 ? "INST" : element.accType == 3 ? "STUD" : ""); 
                var mid = pad.substring(0, pad.length-(element.accType+"").length) + element.accType;
                var post = pad.substring(0, pad.length-(element.id+"").length) + element.id;
                element["accID"] = pre + "-" + mid + "-" + post;
                element.password = "";
                if(element.status != 0){
                    processData.push({
                        id: element.id,
                        accID: element.accID,
                        username: element.username,
                    });
                }
                count--;
                if(count == 0) response();
            });
        });
    }
}

exports.update = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var id = req.params.id;
    var data = JSON.parse(req.body.data);
    db.edit(id, data.username, data.password, data.type, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail:"Successfully Modify"});        
    });
}

exports.delete = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var id = req.params.id;
    db.delete(id, "status", function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail:"Successfully Deleted."});
    });    
}

exports.changePass = function(req, res, next){
    
}