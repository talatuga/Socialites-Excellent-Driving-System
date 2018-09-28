var db = require('../../../model/userAccModel');
var Validation = require('../../../bin/util/validation');
var valid = new Validation();

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    var dataIn = JSON.parse(req.body.data);
    var data = [];
    data.push(dataIn.username);    
    data.push(dataIn.password);    
    data.push(dataIn.acctype);

    valid.checkUndef(data,function(passed){
        if(passed){
            db.register(data, function(err){
                if(err) return next(err);
                res.status(200).send({success: true, detail: "Successfully Registered"});
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data"});
        }
    })

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

exports.changeProfileData = function(req, res, next){
    
}

exports.uploadPic = function(req, res, next){
    var fs = require('fs');
    if(req.file){
        req.session.avatar = req.file.path;
        res.status(200).end();
    }else if(req.body.confirm){
        var accountModel = require('../../../model/userInfoModel');
        if(!req.body.id) return res.status(400).send({success: false, detail: "Invalid syntax"});
        if(req.body.confirm == "true"){
            if(!req.session.avatar) return res.status(400).send({success: false, detail: "No file Uploaded"});
            var path = req.session.avatar.split('\\');
            var ext = (path[path.length-1].split('.'))[1];
            path = (path.slice(0,path.length-1)).join('\\');
            var newPath = path + "\\" + req.body.id + "." + ext;
            fs.rename(req.session.avatar, newPath, function(err){
                if(err) return next(err);
                var public = newPath.replace('public', 'assets');
                accountModel.updateOther(req.body.id, "avatar", public, function(err){
                    if(err) return next(err);
                    req.session.avatar = undefined;
                    res.status(200).send({success: true, detail: "Avatar Save", path: (public + "?" + new Date().getTime())});
                });
            });
        }else{
            if(!req.session.avatar) return res.status(200).send({success: false, detail: "No file Uploaded"});
            fs.unlink(req.session.avatar, function(err){
                if(err) return next(err);
                req.session.avatar = undefined;
                res.status(200).send({success: true, detail: "Avatar change cancelled"});
            });
        }
    }else{
        res.status(200).send({
            success: false,
            detail: "No file uploaded",
        });
    }
}