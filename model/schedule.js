var db = require('./db');

var Model = {}

Model.create = function (data, cb) {
    var sql = "CALL ";
    db.get().query(sql, data, function(err){
        if(err) return cb(err);
        cb(null, true);
    });
}

Model.update = function (data, cb) {

}

Model.delete = function (id, cb) {

}

Model.get = function (id, need, cd) {

}

Model.getAll = function(id, cb){
    var sql = "SELECT * FROM schedule WHERE id = ?";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

Model.getMany = function(start, end, cb){
    var sql = "SELECT * FROM schedule WHERE date >= ? LIMIT ?,? ORDER BY id";
    db.get().query(sql, [Date.today().toString('MM-dd-yyyy'), start, end], function(err, results){
        if(err) return cb(err);
        cb(null, results[0])
    });
}

module.exports = Model;