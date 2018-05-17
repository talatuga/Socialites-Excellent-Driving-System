var db = require('./db');
var ModelModule = require('./model');
var table = "evaluation";

var Evaluation = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
Evaluation.prototype = ModelModule.prototype;
Evaluation.prototype.constructor = Evaluation;

//Business Logic Below:

module.exports = new Evaluation(table, db);