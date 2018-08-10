var student = require('../../model/studentModel');
var Email = require('../../bin/emailer');
var Validation = require('../../bin/util/validation');
var valid = new Validation();

exports.create = function(req, res, next){ //Deprecated. Soon to delete from API
    var data = req.body["data[]"];
    //VALIDATIONS 
    data.unshift(null);
    student.create(data,function(err, result){
        if(err) return next(err);
        res.status(200).send({detail: "Successfully Added!"});
    });
}

exports.get = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    var query = Object.keys(req.query).length ? req.query : {};
    var param = Object.keys(req.params).length ? req.params : null;
    if(param){
        /* if(query != {}){
            res.status(403).send({}); // delete this after implementation
        }else{ */
            var field = (param.field == undefined ? null : param.field);
            student.get(param.id, field, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, data: result});                
            });
        //}
    }else{
        var offset = query.offset == undefined ? 0 : parseInt(query.offset);
        var limit = query.limit == undefined ? 10 : parseInt(query.limit);
        var type = query.filter == undefined ? 0 : parseInt(query.filter);
        student.getList(offset, limit, type, function(err, result){
            if(err) return next(err);
            res.status(200).send({success: true, data: result});
        });
    }
}

exports.update = function(req, res, next){
    var id = req.params.id;
    var dataIn = JSON.parse(req.body.data);
    var field = req.params.field;
    
    if(field == undefined){
        var data = [];
        data.push(dataIn.userAcc);
        data.push(dataIn.fullname);
        data.push(dataIn.address);
        data.push(dataIn.telno);
        data.push(dataIn.birthdate);
        data.push(dataIn.birthplace);
        data.push(dataIn.sex);
        data.push(dataIn.civilStatus);
        data.push(dataIn.email);
        data.push(2);

        valid.checkUndef(data, function(passed){
            if(passed){
                student.updateInfo(id, data, function(err, result){
                    if(err) return next(new Error(err));
                    res.status(200).send({detail: "Successfully Updated!"});
                });
            }else{
                res.status(200).send({detail: "Invalid Data!"});
            }
        });
    }else{
        field = field.replace(';', '');        
        student.update(id, data, field, function(err, result){
            if(err) return next(new Error(err));
            res.status(200).send({success: true, detail: "Successfully Added!"});
        });
    }
}

exports.updateAll = function(req, res, next){ //Deprecated. Soon to delete from API
    var data = [];
    //VALIDATIONS
    
    student.updateAll(data, function(err, result){
       if(err) return next(new Error(err));
       res.status(200).send({detail: "Successfullly Updated!"}); 
    });
}

exports.del = function(req, res, next){
    if(res.locals.authenticated == 0) return next();    
    var id = req.params.id;
    student.delete(id, "status", function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail:"Successfully Deactivate!"});
    });
}

exports.delAll = function(req, res, next){} //Deprecated. Soon to delete from API

/**
 * *NOTE: This module needs proper documentation* This enroll a pending student registration.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.register = function(req, res, next){
    var data = JSON.parse(req.body.data);
    var password = require('../../bin/util/tokenGenerator').generateToken(15);
    var generateID = function(accID,infoID){
        accID = accID + "";
        infoID = infoID + "";
        var pad = "000";
        return (pad.substring(0,pad.length-accID.length)+accID) + (pad.substring(0,pad.length-infoID.length)+infoID);
    };
    var accountModel = require('../../model/userAccModel');
    student.getPreRegList(data.info-1,1,function(er, result){
        if(er) return next(er);
        var infoData = result[0];
        infoData.data = JSON.parse(infoData.data);
        accountModel.register([infoData.data.info.email,password,3],function(err, accID){
            if(err) return next(err);
            var infoModel = require('../../model/userInfoModel');
            var info = [accID];
            info.push(infoData.data.info.fullname);
            info.push(infoData.data.info.address);
            info.push(infoData.data.info.telno);
            info.push(infoData.data.info.birthdate);
            info.push(infoData.data.info.birthplace);
            info.push(infoData.data.info.sex[0]);
            info.push(infoData.data.info.civilStatus);
            info.push(infoData.data.info.email);
            info.push(3);

            valid.checkUndef(info, function(passed){
                if(passed){
                    infoModel.register(info, function(errr, infoID){
                        if(errr) return next(errr);
                        var id = generateID(accID,infoID);
                        student.create([id,infoID,data.license, JSON.stringify(infoData.data.preference.schedule), infoData.data.preference.vehicle,null,1],function(errrr, result){
                            if(errrr) return next(errrr);
                            student.preRegDel(data.info,function(e){
                                if(e) return next(e);
                                res.status(200).send({success:result});
                                var accountMail = new Email();
                                var mailBody = {
                                    subject: "Welcome to Socialites Driving Excellent!",
                                    body: "<center><div style='width: 600px'><h1 style='color: black; font-weight: lighter;'>Good day, " + (infoData.data.info.fullname).replace(/_/g,' ') + "!</h1><hr style='width=400px'><br><h3 style='color:black; font-weight: lighter; text-align: justify;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We, at Socialites Excellent Driving, are very pleased to inform you that you are now successfully enrolled to your selected course! With this, you are only a few steps closer now to becoming a prospective driver! Yey! <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So, what are you waiting for? Login to your student account and schedule now so you can get started!</h3><br><br><div style='width: 250px; height: 150px; padding: 10px; border: black solid 1px'><h3 style='color: black; font-weight: lighter;'>Your password is:</h3><input type='text' style='width: 200px; text-align: center' readonly value='" + password + "'><br><small style='color: red;'>(You can still change your password later on)</small><br><br><center><button href='https://www.facebook.com/' type='button' style='width: 150px; background-color: #3075AE; color: white; font-size: 12px; cursor: pointer; border: none; padding: 5px'>Login Now</button></center></div><br><h3 style='color: black; font-weight: lighter; text-align: left;'>Sincerely yours,<br>Socialites Excellent Driving</h3></div></center>",
                                };
                                accountMail.send(dataIn.info.email,mailBody,function(err, response){
                                    if(err) return next(err);
                                    require('../../bin/logger').logger("E-Mail Send to " + dataIn.info.email);
                                });
                            });
                        });
                    });
                }else{
                    res.status(200).send({success: false, detail: "Invalid Data."});
                }
            })
        });
    });
}

exports.getPreRegList = function(req, res, next){
    var processData = [];
    var response = function(){
        res.status(200).send({success: true, data: processData});
    };
    var offset = req.query.offset == undefined ? 0 : req.query.offset;
    var limit = req.query.limit == undefined ? 10 : parseInt(req.query.limit);
    student.getPreRegList(offset, limit, function(err, result){
        if(err) return next(err);
        var res_length = result.length;
        if(res_length == 0) return response();
        result.forEach(element => {
            var data = JSON.parse(element.data);
            element.data = data;
            processData.push(element);
            res_length--;
            if(res_length == 0) return response();
        });
    });
}

exports.preRegDel = function(req, res, next){
    var id = req.params.id;
    student.preRegDel(id, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Deleted"});
    })
}

exports.preRegEdit = function(req, res, next){
    var id = req.params.id;
    var dataIn = JSON.parse(req.body.data);
    var data = [];
    data.push(dataIn.data);
    data.push(dataIn.dateSubmit);
    data.push(1);
    student.preRegEdit(id, dataIn.data, function(err){
        if(err) return next(err);
        res.status(200).send({success: true, detail: "Successfully Modify"});
    })
}

/**
 * This adds course on existing student.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.enroll = function(req, res, next){
    var dataIn = JSON.parse(req.body.data);
    var data = [null];
    data.push(dataIn.studID);
    data.push(dataIn.courseID);
    data.push(dataIn.branchID);
    data.push(dataIn.lessons);
    data.push(null);
    data.push(null);
    data.push(1);
    student.enrollCourse(data, function(err, result){
        if(err) return next(err);
        res.status(200).send({success: true});
    });
}