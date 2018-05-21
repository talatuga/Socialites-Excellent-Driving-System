var instructor = require('../../model/instructorModel');

exports.create = function(req, res, next){
    var dataIn = JSON.parse(req.body.data);
    //Validation
    var data = {
        credential: [],
        info: [],
        inst: []
    };
    var credential = [];
    credential.push(dataIn.credential.username);
    credential.push(dataIn.credential.password);
    credential.push(dataIn.credential.usertype);
    
    var info = [];
    info.push(dataIn.info.fullname);
    info.push(dataIn.info.address);
    info.push(dataIn.info.telno);
    info.push(dataIn.info.bdate);
    info.push("n/a");
    info.push(dataIn.info.sex);
    info.push("n/a");
    info.push(dataIn.info.email);
    info.push(2);
 
    var inst = [];
    inst.push(null);
    inst.push(null);
    inst.push(dataIn.info.education);
    inst.push("");
    inst.push(null);
    inst.push(null);
    inst.push(1);

    data.credential = credential;
    data.info = info;
    data.inst = inst;
    
    instructor.register(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Created!"});
    });
}

exports.get = function(req, res, next){
    var query = req.query;
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        if(Object.keys(query).length != 0){

        }else{
            var field = param.field == undefined ? null : param.field;
            var id = parseInt(param.id) == undefined ? 0 : param.id;
            instructor.get(id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        }
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        instructor.getList(offset, limit, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
        });
    }
}

exports.update = function(req, res, next){
    var id = req.params.id;
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var dataIn = JSON.parse(req.body.data);
    //VALIDATIONS
    var breakDownID = id.split("-");
    var account = parseInt(breakDownID[1].slice(0,3));
    var info = parseInt(breakDownID[1].slice(3,6));
    
    var data = {
        infoID: info,
        info: [],
        credential: {},
    };
    data.info.push(account);
    data.info.push(dataIn.fullname);
    data.info.push(dataIn.address);
    data.info.push(dataIn.telno);
    data.info.push(dataIn.bdate);
    data.info.push("n/a");
    data.info.push(dataIn.sex);
    data.info.push("n/a");
    data.info.push(dataIn.email);
    data.info.push(2);

    data.credential["id"] = account;
    data.credential["username"] = dataIn.username;
    data.credential["password"] = dataIn.password;
    data.credential["type"] = 2;
    
    instructor.update(id, data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Modify!"});
    });
}

exports.delete = function(req, res, next){
    var id = req.params.id;
    var date = JSON.parse(req.body.data);

    instructor.delete(id, date, function(err, done){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Deleted!"});
    });
}