var db = require('./db');
var ModelModule = require('./model');
var table = "requirement";

var PaperRequirement = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
PaperRequirement.prototype = ModelModule.prototype;
PaperRequirement.prototype.contructor = PaperRequirement;

//Business Logic Code:

module.exports = new PaperRequirement(table, db);