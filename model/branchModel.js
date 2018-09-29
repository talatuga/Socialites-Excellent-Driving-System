var db = require('./db');
var ModelModule = require('./model');
var table = "branch";

var Branch = {};
Branch = Object.create(ModelModule);
Branch.table = table;
Branch.db = db;

//Business Logic Code:
Branch.getList = function(offset, limit, query, cb){
    if(typeof query == "function"){
        cb = query;
        query = {};
    }
    
    var sql = "SELECT * FROM "+ this.table +" WHERE id > ?";
    var data = [offset];

    if(query.status){
        sql += " AND purgeFlag = ?";
        data.push(query.status);
    }

    sql += " ORDER BY id ASC LIMIT ?";
    data.push(limit);
    this.db.get().query(sql, data, function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

var WebBranch = {};
WebBranch = Object.create(ModelModule);
WebBranch.table = "web_branch";
WebBranch.db = db;

Branch.createWebBranch = function(data,cb){
    WebBranch.create(data,cb);
};

module.exports = Branch;