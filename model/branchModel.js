var db = require('./db');
var ModelModule = require('./model');
var table = "branch";

var Branch = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName; 
}
Branch.prototype = ModelModule.prototype;
Branch.prototype.constructor = Branch;

//Business Logic Code:

module.exports = new Branch(table, db);