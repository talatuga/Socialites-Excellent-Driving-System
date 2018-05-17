var db = require('./db');
var ModelModule = require('./model');
var table = "lesson";

var Lesson = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
Lesson.prototype = ModelModule.prototype;
Lesson.prototype.constructor = Lesson;

//Business Logic Code:

module.exports = new Lesson(table, db);