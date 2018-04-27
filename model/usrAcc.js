var db = require('./db');

var Model = {}

Model.create = function(data, cb){

}

Model.update = function(data, cb){

}

Model.get = function(data, cb){

}

Model.delete = function(data, cb){

}

Model.login = function(data, cb){
    var sql = "SELECT 1, 1"; //"CALL login(?,?)";
    db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result[0]);
    });
}

module.exports = Model;