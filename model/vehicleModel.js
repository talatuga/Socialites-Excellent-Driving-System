var db = require('./db');

var Model = {}

Model.create = function (data, cb) {
    var sql = "INSERT INTO `vehicle` (`model`, `brand`, `fuel`, `status`) VALUES (?, ?, ?, ?);";
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, true);
    });
}

Model.get = function (id, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    if (field == null) {
        sql = "SELECT * FROM vehicle WHERE id = ?";
    } else {
        field = field.replace(';', '');
        sql = "SELECT " + field + " as field FROM vehicle WHERE id = ?";
    }
    db.get().query(sql, [id], function (err, result) {
        if (err) return cb(err);
        cb(null, field == null ? result[0] : result[0].field);
    });
}

Model.getList = function(offset, limit, cb){
    var sql = "SELECT * FROM vehicle WHERE id BETWEEN ? AND ? ORDER BY id DESC";
    db.get().query(sql, [offset, offset + limit], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Model.update = function (id, param, field, cb) {
    if (typeof field == "function") {
        cb = field;
        field = null;
    }
    var sql = "";
    var data = param;
    if (field == null) {
        sql = "UPDATE `vehicle` SET `model`= ?, `brand`= ?, `fuel`= ?, `defect`= ?, `status`= ? WHERE `id`= ?";
        data.push(id);
    } else {
        field = field.replace(';', '');        
        sql = "UPDATE `vehicle` SET " + field + " = ? WHERE `id` = ?";
        data = [param, id]
    }
    db.get().query(sql, data, function (err, result) {
        if (err) return cb(err);
        cb(null, true);
    });
}

Model.delete = function (id, cb) {
    //Still ondev
}

module.exports = Model;