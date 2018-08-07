var db = require('./db');
var modelModule = require('./model');
var Defect = require('./defectModel');
var table = "vehicle";
var schemeTbl = "codingscheme";

var Car = {};
Car = Object.create(modelModule);
Car.table = table;
Car.db = db;

//Custom Code:
Car.getDefect = Defect.getListByID; // IS THIS WORKING????? HOWW?
Car.addDefect = function(data, cb){
    Defect.create(data, cb);
};
Car.delDefect = function(id, purgeFlag, cb){
    Defect.delete(id, purgeFlag, cb);
};

Car.addScheme = function(location, scheme, cb){
    var sql = "INSERT INTO " + schemeTbl + " VALUES(?)";
    db.get().query(sql, [[null,location,scheme,1]], function(err, done){
        if(err) return cb(err);
        cb(null,done.insertId);
    });
};
Car.editScheme = function(id, field, value, cb){
    if(!Array.isArray(field)){
        var sql = "UPDATE " + schemeTbl + " SET " + field + " = ? WHERE id = ?";
        db.get().query(sql, [value,id], function(err, done){
            if(err) return cb(err);
            cb(null);
        });
    }else{
        var sql = "UPDATE " + schemeTbl + " SET ";
        var args = [];
        var data = [];
        field.forEach(function(element, index){
            args.push(element + " = ?");
            data.push(value[index]);
        });
        sql += args.join();
        sql += " WHERE id = ?";
        data.push(id);
        db.get().query(sql, data, function(err, done){
            if(err) return cb(err);
            cb(null);
        });
    }
};
Car.delScheme = function(id, cb){
    var sql = "UPDATE " + schemeTbl + " SET status = 0 WHERE id = ?";
    db.get().query(sql, [id], function(err){
        if(err) return cb(err);
        cb(null);
    })
};
Car.getScheme = function(id, cb){
    var sql;
    if(id){
        sql = "SELECT * FROM " + schemeTbl + " WHERE id = ? AND status = 1";
    }else{
        sql = "SELECT * FROM " + schemeTbl + " WHERE status = 1";
    }
    db.get().query(sql,[id],function(err,result){
        if(err) return cb(err);
        cb(null, result.length == 1 ? result[0]:result);
    })
};
Car.getSchemeByLoc = function(location,cb){
    var sql = "SELECT * FROM " + schemeTbl + " WHERE city = ?";
    db.get().query(sql, [location], function(err,result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
};

module.exports = Car;