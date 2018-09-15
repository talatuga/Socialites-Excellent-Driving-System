var announcement = require('../../model/announcementModel');

exports.create = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    var dataInput = JSON.parse(req.body.data);
    var data = [""];
    data.push(dataInput.title);
    data.push(dataInput.message);
    data.push(dataInput.dateFrom);
    data.push(dataInput.status);
    
    console.log(data);
    announcement.addAnnouncement(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Success!"});
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
            announcement.get(id, field, function(err, result){
                console.log(err);
                if(err) return next(err);
                res.status(200).send({success: true, data: result});  
                console.log(result);              
            });
        }
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        announcement.getList(offset, limit, function(err, result){
            console.log(err);   
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
            console.log(result);   
        });
    }
}

exports.getAnnouncementList = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    announcement.getAnnouncementList(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.getAnnouncementListWeb = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    announcement.getAnnouncementListWeb(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.viewAnnouncement = function(req, res, next){
    if(res.locals.authenticated == 0) return next();
    announcement.viewAnnouncement(req.params.id, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true, data: result});
    });
}

exports.update = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    var id = req.params.id;
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var dataIn = JSON.parse(req.body.data);
    
    var data = [];
    data.push(dataIn.title);
    data.push(dataIn.message);
    data.push(dataIn.dateFrom);
    data.push(dataIn.status);
    
    announcement.update(id, dataIn.title, "title", function(err){
        if(err) return next(err);
        announcement.update(id, dataIn.message, "message", function(er){
            if(er) return next(er);           
            announcement.update(id, dataIn.dateFrom, "dateFrom", function(errr){
                if(errr) return next(errr);    
                announcement.update(id, dataIn.status, "status", function(errr){
                    if(errr) return next(errr);    
                    res.status(200).send({success: true, detail: "Successfully modified!"});            
                }); 
            });     
        });
    });
}

exports.updateDelete = function(req, res, next){
    if(res.locals.authenticated == 0) return next();

    var id = req.params.id;
    var field = req.params.field == undefined ? null : req.params.field.replace(';','');
    var dataIn = JSON.parse(req.body.data);
    
    var data = [];
    data.push(dataIn.title);
    data.push(dataIn.message);
    data.push(dataIn.dateFrom);
    data.push(dataIn.status);

    announcement.update(id, dataIn.status, "status", function(errr){
        if(errr) return next(errr);    
        res.status(200).send({success: true, detail: "Successfully modified!"});            
    }); 
}

exports.delete = function(req, res, next){
    var id = req.params.id;
    var date = JSON.parse(req.body.data);

    announcement.delete(id, date, function(err, done){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Deleted!"});
    });
}