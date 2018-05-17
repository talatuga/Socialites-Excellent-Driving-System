var db = require('./db');
var modelModule = require('./model');
var Defect = require('./defectModel');
var table = "vehicle";

var Car = function(tableName, database){
    modelModule.apply(this, arguments);
    this.tableName = tableName;
};
Car.prototype = modelModule.prototype;
Car.prototype.contructor = Car;

//Custom Code:

module.exports = new Car(table, db);