var db = require('./db');
var ModelModule = require('./model');
var UserInfo = require('./userInfoModel');
var UserAcc = require('./userAccModel');
var table = "instructor";

//Constructor
var Instructor = {};
Instructor = Object.create(ModelModule);
Instructor.table = table;
Instructor.db = db;

//Custom codes here: 
var generateInstId = function(account, info){
    account = "" + account;
    info = "" + info;
    var prefix = "INST";
    var pad = "000";
    return prefix + "-" + (pad.substring(0, pad.length - account.length) + account) + (pad.substring(0, pad.length - info.length) + info);
}

//Override getList() function from parent model class.
Instructor.getList = function(offset, limit, cb){
    var sql = "CALL getInstList(?,?)";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Instructor.getInfo = function(accID, cb){
    UserInfo.getInfo(accID, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Instructor.get = function (id, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "CALL getInst(?)";
    this.db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err, null);
        if (field == null) {
            cb(null, result[0]);
        } else {
            if(result[0].length == 0){
                cb(null, []);
            }else{
                cb(null, result[0][0][field]);
            }
        }
    });
}

Instructor.register = function(data, cb){
    var self = this;
    
    var credential = data.credential;

    UserAcc.register(credential, function(err, accID){
        if(err) return cb(err);

        var info = data.info;
        info.unshift(accID);

        UserInfo.register(info, function(err, userID){
            if(err) return cb(err);  

            var inst = data.inst;
            inst[0] = generateInstId(accID, userID);
            inst[1] = userID;

            self.create(inst, function(err, result){
                if(err) return cb(err);
                cb(null, true);
            });
        });
    });
}

Instructor.delete = function(id, date, cb){
    var self = this;
    var idBreakDown = id.split("-");
    var account = parseInt(idBreakDown[1].slice(0, 2));
    var formattedDate = Date.parse(date).toString("yyyy-MM-dd");
    UserAcc.delete(account, "status", function(err, done){
        if(err) return cb(err);        
        var sql = "UPDATE " + self.table + " SET status = 3, dateRetired = ? WHERE id = ?";
        self.db.get().query(sql, [formattedDate, id], function(err, result){
            if(err) return cb(err);
            cb(null, true);
        });
    });
}

Instructor.update = function(id, data, cb){
    UserAcc.edit(data.credential.id, data.credential.username, data.credential.password, data.credential.type, function(err, done){
        if(err) return cb(err);
        UserInfo.update(data.infoID, data.info, null, function(err, done1){
            if(err) return cb(err);
            var sql = "UPDATE " + Instructor.table + " SET license = ?, educAttain = ? WHERE id = ?";
            db.get().query(sql, [data.license, data.educ,/*  data.vacant, */ id], function(err, result){
                if(err) return cb(err);
                cb(null, true);
            });
        });
    });
}

module.exports = Instructor; //Export model for middleware use.