/* 
    model.js, base module for all model in the system that function as Maintenance.
 */
var db;
var tableName;

//Constructor
var Model = function(table, dbObj){
    db = dbObj;
    tableName = table;
    this.tableName = table;
}

//Local function
var getFields = function(table ,cb){
    var sql = "DESCRIBE " + table;
    var fields = [];
    db.get().query(sql, function(err, result){
        if(err) return cb(err);
        var count = result.length;
        if(count == 0) return cb(null, fields);        
        result.forEach(element => {
            fields.push(element.Field);
            count--;
            if(count == 0) return cb(null, fields);
        });
    });
}

//Methods this apply to all object that would inherit this object.
Model.prototype.create = function (data, cb) {
    var sql = "INSERT INTO "+ this.tableName;    
    getFields(this.tableName, function(err, fields){
        if(err) return cb(err);
        if(fields.length == 0) return cb(err);
        var execute = function(){
            db.get().query(sql, data, function(err, result){
                if(err) {
                    return cb(err);
                }
                cb(null, true);
            });
        };
        sql += " ("+ fields.join() +") VALUES ("+ Array(fields.length).fill("?").join() +");";
        execute();
    });
}

Model.prototype.get = function (id, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    if (field == null) {
        sql = "SELECT * FROM "+ this.tableName +" WHERE id = ?";
    } else {
        field = field.replace(';', '');
        sql = "SELECT " + field + " as field FROM "+ this.tableName +" WHERE id = ?";
    }
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, field == null ? result[0] : result[0].field);
    });
}

Model.prototype.getList = function(offset, limit, cb){
    var sql = "SELECT * FROM "+ this.tableName +" WHERE id > ? ORDER BY id ASC LIMIT ?";
    db.get().query(sql, [offset, limit], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Model.prototype.update = function (id, _data, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    var data = _data;
    var execute = function(){
        db.get().query(sql, data, function (err, result) {
            if (err) return cb(err);
            cb(null, true);
        });
    }
    if (field == null) {
        sql = "UPDATE "+ this.tableName + " SET ";
        data.push(id);
        getFields(this.tableName, function(err, fields){
            if(err) return cb(err);
            if(fields.length == 0) return cb(err);
            var count = fields.length;
            fields.forEach(x=>{
                if(x != "id"){
                    sql += x + " = ?";
                    count--;
                    if(count == 0){
                        sql += " WHERE id = ?";
                        execute();
                    }
                    sql += ",";
                }else{
                    count--;
                }
            });
        });
    } else {
        field = field.replace(';', '');        
        sql = "UPDATE "+ this.tableName +" SET " + field + " = ? WHERE `id` = ?";
        data = [_data, id];
        execute();
    }
}

Model.prototype.delete = function (id, purgeFlag, cb) {
    var sql = "UPDATE "+ this.tableName +" SET "+ purgeFlag +" = 1 WHERE `id` = ?";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, true);
    });
}

module.exports = Model;