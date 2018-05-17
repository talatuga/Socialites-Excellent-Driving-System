var db = require('./db');
var ModelModule = require('./model');
var table = "defect";

var Defect = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
Defect.prototype = ModelModule.prototype;
Defect.prototype.constructor = Defect;

//

module.exports = new Defect(table, db);