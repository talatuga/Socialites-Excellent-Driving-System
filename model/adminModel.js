/* 
    adminModel.js, if you check on db, there is no such thing as this table exist.
    there are reason why this exist, and it is important.
*/
var db = require('./db');
var model = require('./model');
var UserInfo = require('./userInfoModel');
var table = "admin";

var Admin = {}; 
Admin = Object.create(model);
Admin.table = table;

Admin.getInfo = function(accID, cb){
    UserInfo.getInfo(accID, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    }); 
}

Admin.getBranchAdmin = function(branchID, cb){
    var out = {};
    var sql = "SELECT id, userinfo FROM " + this.table + " WHERE branchID = ?";
    db.get().query(sql, [branchID], function(err, result){
        if(err) return cb(err);
        if(result.length != 0){
            out["id"] = result[0].id;        
            UserInfo.getInfo(result[0].userinfo, result[0].userinfo, function(err, result2){
                if(err) return cb(err);
                out["name"] = result2[0].fullname;
                cb(null, out);            
            });
        }else{
            cb(null, out);
        }
    });
}

Admin.getBranchHandled = function(id, cb){
    var sql = "SELECT branchID FROM " + table + " WHERE userInfo = ?";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result[0].branchID);
    });
}

module.exports = Admin;