var db = require('./db');
var ModelModule = require('./model');
var table = "account";

var Account = function(tableName, database){
    ModelModule.apply(this, arguments);
    this.tableName = tableName;
}
Account.prototype = ModelModule.prototype;
Account.prototype.contructor = Account;

//

module.exports = new Account(table, db);