var db = require('./db');
var ModelModule = require('./model');
var table = "requirement";
var licenseTable = "license_apply_price";

var PaperRequirement = {};
PaperRequirement = Object.create(ModelModule);
PaperRequirement.table = table;
PaperRequirement.db = db;

//Business Logic Code:
PaperRequirement.getLicenseApply = function(id, cb){
    var sql = "SELECT * FROM " + licenseTable + " WHERE id = ?";
    db.get().query(sql, [id], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
};

module.exports = PaperRequirement;