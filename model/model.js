/* 
    model.js, base module for all model in the system that function as Maintenance.
 */

var Model = {
    db: null,
    table: '',
    create: function (data, cb) {
        //var self = this;
        var db = this.db;
        var sql = "INSERT INTO "+ this.table;    
        this.getFields(this.table, function(err, fields){
            if(err) return cb(err);
            if(fields.length == 0) return cb(err);
            var execute = function(){
                db.get().query(sql, data, function(err, result){
                    if(err) {
                        return cb(err);
                    }
                    cb(null, result);
                });
            };
            sql += " ("+ fields.join() +") VALUES ("+ Array(fields.length).fill("?").join() +");";
            execute();
        });
    },
    get: function (id, field, cb) {
        if (typeof field == "function") {
            cb = field;
            field = null;
        }
        var sql = "";
        if (field == null) {
            sql = "SELECT * FROM "+ this.table +" WHERE id = ?";
        } else {
            field = field.replace(';', '');
            sql = "SELECT " + field + " as field FROM "+ this.table +" WHERE id = ?";
        }
        this.db.get().query(sql, [id], function (err, result) {
            if (err) return cb(err);
            cb(null, field == null ? result[0] : result[0].field);
        });
    },
    getList: function(offset, limit, cb){
        var sql = "";
        if(typeof offset == 'function'){
            cb = offset;
            sql = "SELECT * FROM " + this.table;
            this.db.get().query(sql, function(err, result){
                if(err) return cb(err);
                cb(null, result);
            });
        }else{
            sql = "SELECT * FROM "+ this.table +" WHERE id > ? ORDER BY id ASC LIMIT ?";
            this.db.get().query(sql, [offset, limit], function(err, result){
                if(err) return cb(err);
                cb(null, result);
            });
        }
    },
    update: function (id, _data, field, cb) {
        if (typeof field == "function") {
            cb = field;
            field = null;
        }
        var sql = "";
        var data = _data;
        var db = this.db;
        var execute = function(){
            db.get().query(sql, data, function (err, result) {
                if (err) return cb(err);
                cb(null, true);
            });
        }
        if (field == null) {
            sql = "UPDATE "+ this.table + " SET ";
            data.push(id);
            this.getFields(this.table, function(err, fields){
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
            sql = "UPDATE "+ this.table +" SET " + field + " = ? WHERE `id` = ?";
            data = [_data, id];
            execute();
        }
    },
    delete: function (id, purgeFlag, cb) {
        var sql = "UPDATE "+ this.table +" SET "+ purgeFlag +" = 0 WHERE `id` = ?";
        this.db.get().query(sql, [id], function(err, result){
            if(err) return cb(err);
            cb(null, true);
        });
    },
    getFields: function(table ,cb){
        var sql = "DESCRIBE " + table;
        var fields = [];
        this.db.get().query(sql, function(err, result){
            if(err) return cb(err);
            var count = result.length;
            if(count == 0) return cb(null, fields);        
            result.forEach(element => {
                fields.push(element.Field);
                count--;
                if(count == 0) return cb(null, fields);
            });
        });
    },
    init: function(table, db){
        this.table = table;
        this.db = db;
    }
}

module.exports = Model;