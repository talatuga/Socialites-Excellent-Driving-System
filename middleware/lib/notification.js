/**
 * Notification Request Handler Module,
 * here we process all pending request.
 */
var intervalClock;
var notifModel = require('../../model/notifModel');
var pending = [];

exports.addNotificationMethod = function(target, type, message, action, cb){

    if(message == "") return cb(null,"Invalid message can't be blank");

    if(type == "QUICK_BROADCAST"){
        notifyPending(target, {detail: message, action: action, type: type}, function(err){
            if(err) return cb(err);
            cb(null, "Successfully Notify!");
        })
    }else{
        var dbTarget = null;
        if(target != "admin"){
            dbTarget = target;
        }else{
            dbTarget = 1;
        }
        notifModel.add(dbTarget, type, message, action, function(err, id){
            if(err) return next(err);
            cb(null, "Notifying user/s");
            notifyPending(dbTarget, id, err=>{if(err) return cb(err)});
        });
    }
}

exports.addNotification = function(req, res, next){
    var target = req.body.target || "admin";
    var type = req.body.type || "BROADCAST";
    var message = req.body.message || "";
    var action = req.body.action || "";

    if(message == "") return res.status(200).send({success: false, detail: "Invalid message can't be blank"});

    exports.addNotificationMethod(target, type, message, action, function(err, detail){
        if(err) return next(err);
        res.status(200).send({success: false, detail: detail});
    });
}

exports.markRead = function(req, res, next){
    var notifId = req.param.id || null;
    if(notifId != "null" && notifId != null){
        notifModel.markNotifRead(notifId, function(err){
            if(err) return next(err);
            res.status(200).send({success: true, detail: "done"});
        });
    }else{
        res.status(200).send({success: true, detail: "done"});
    }
}

exports.notificationPoll = function(req, res, next){
    var userID = req.session.accID;
    notifModel.getUserPending(userID, function(err, notifications){
        if(err) return next(err);
        if(notifications.length > 0){
            res.status(200).send({success: true, data: notifications});
        }else{
            removePending(userID, function(){
                var timeout = setRequestTimeout(res, userID);
                pending.push({
                    accID: userID,
                    http: {
                        req: req,
                        res: res
                    },
                    timeout: timeout,
                });
            });
        }
    });
}

function notifyPending(targetId, notifId, cb){
    if(typeof notifId == "object"){
        notifId.accID = null;
        var accType = 0;
        if(targetId == "admin"){
            accType = 1;
        }else if(targetId == "instructor"){
            accType = 2;
        }else if(targetId == "student"){
            accType = 3;
        }else if(targetId == "branch"){
            accType = 4;
        }

        getActivePending(null, accType, function(users){
            if(users.length > 0){
                users.forEach((user,i)=>{
                    user.http.res.status(200).send({success: true, data: notifId});
                    removePending(targetId, ()=>{
                        cb(null);
                    });
                });
            }else{
                cb(null);
            }
        });
    }else{
        var id = targetId;
        if(targetId == 'admin'){
            id = 1;
        }
        getActivePending(id, function(user){
            if(user){
                notifModel.getPending(notifId, function(err, notifData){
                    if(err) return cb(err);
                    user.http.res.status(200).send({success: true, data: notifData});
                    removePending(targetId, ()=>{
                        cb(null);
                    });
                });
            }
        });
    }
}

function getActivePending(id, accType, cb){
    if(typeof accType == "function"){
        cb = accType;
        accType = null;
    }
    var done = 0;
    if(accType){
        var type = ['','adminID','instID','studID','branchID'];
        var match = [];
        if(pending.length == 0) return cb([]);
        pending.forEach((e,i)=>{
            if(e.http.req.session[type[accType]]){
                match.push(e);
            }
            if(i==pending.length-1){
                cb(match);
            }
        });
    }else{
        if(pending.length == 0) return cb(null);
        pending.forEach((e,i)=>{
            if(e.accID = id){
                cb(e);
                done = 1;
            }
            if(i==pending.length-1 && done == 0){
                cb(null);
            }
        });
    }
}

function removePending(id, cb){
    var done = 0;
    if(pending.length == 0) return cb(true);
    pending.forEach((e,i)=>{
        if(e.accID = id){
            clearTimeout(e.timeout);
            pending.splice(i,1);
            cb(true);
            done = 1;
        }
        if(i==pending.length-1 && done == 0){
            cb(true);
        }
    });
}

function setRequestTimeout(res, requestID){
    return setTimeout(()=>{
        if(!res.headerSent){
            removePending(requestID,()=>{
                res.status(200).send({success: false, detail: "timeout"});
            });
        }
    },60000);
}