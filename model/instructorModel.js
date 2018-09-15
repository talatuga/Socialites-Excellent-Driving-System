var db = require('./db');
var ModelModule = require('./model');
var UserInfo = require('./userInfoModel');
var UserAcc = require('./userAccModel');
var table = "instructor";
var branch_fk_table = "branch_instructor";

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
    var pad = "0000";
    var date = Date.parse('now').toString('yyyy');
    return prefix + "-" + (date + "-" + (pad.substring(0, pad.length - info.length) + info));
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

Instructor.getInstInfo = function(accID, cb){
    var sql = "SELECT s.id as 'instid', i.* FROM instructor s, userinfo i, useraccount a WHERE a.id = i.userAcc AND s.userInfo = i.id AND a.id = ?";
    db.get().query(sql, [accID], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Instructor.assignToSched = function(schedule, cb){
    if(Array.isArray(schedule)){
        var preffered = null;
        var instructor = [];
        var done = 0;
        var checkAvailalble = function(){
            if(done == schedule.length){
                return cb(null, instructor);
            }
            var sched = schedule[done];

            var task1 = new Promise((resolve, reject)=>{
                Instructor.getAvailableInst(sched.branch, sched.date, sched.time, function(err, inst){
                    if(err) return reject(err);              
                    if(inst.length==0) return resolve(false);
                    instructor.push({
                        schedID: sched.id,
                        instID: inst[0].id
                    });
                    resolve(true);
                });
            });

            var task2 = new Promise((resolve,reject)=>{ //This suppose to check whether preffered instructor is free on that time, or else find someone to replace
                // MAKE THIS AFTER PRE-FINAL     
            });

            var task = preffered ? task2 : task1;

            return (task.then((isOk)=>{
                if(isOk){
                    done++;
                }
                checkAvailalble();
            }));
        }
        checkAvailalble();
    }else{
        this.getAvailableInst(schedule.branch, schedule.date, schedule.time, function(err, inst){
            if(err) return cb(err);
            if(inst.length==0) return cb(null, false);
            //console.log("Instructor:",inst," available");
            cb(null, inst[0]);
        });
    }
};

Instructor.getAvailableInst = function(branch, date, time, cb){
    var sched = require('./scheduleModel');

    var getInst = new Promise((resolve, reject)=>{
        var sql = "SELECT id, userInfo FROM " + table + " WHERE status > 0";
        db.get().query(sql, function(err, result){
            if(err) reject(err);
            resolve(result);
        });
    });

    var checkInstOnSched = new Promise((resolve, reject)=>{
        var sql = "SELECT instID FROM " + sched.table + " WHERE date = ? AND time = ? AND branch = ? AND status > 0";
        db.get().query(sql, [date, time, branch], function(err, result){
            if(err) return reject(err);
            resolve(result);
        });
    });

    var error = null;
    Promise.all([getInst, checkInstOnSched]).then(resultSet=>{
        if(error!=null) return cb(new Error("getAvailableInst() failed to finish: " + error));
        if(resultSet[1].length==0){
            cb(error, resultSet[0]);
        }else{
            var promises = [];
            resultSet[1].forEach((e,i)=>{
                promises.push(new Promise((resolve, reject)=>{
                    var schedInst = e.instID;
                    resultSet[0].forEach((instructor, index)=>{
                        if(instructor.id == schedInst){
                            resultSet[0].splice(index, 1);
                            resolve();
                        }
                        if(index == resultSet[0].length-1){
                            resolve();
                        }
                    });
                }));
                if(i==resultSet[1].length-1){
                    Promise.all(promises).then(()=>{
                        return cb(error, resultSet[0]);
                    });
                }
            });
        }
    }).catch(reason=>{
        error = reason;
        return;
    });
}

Instructor.getAllBranchInst = function(branch, cb){
    var sql = "SELECT instID FROM "+ branch_fk_table +" WHERE branchID = ?";
    db.get().query(sql, [branch], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

module.exports = Instructor; //Export model for middleware use.