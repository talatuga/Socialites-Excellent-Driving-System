var db = require('./db');
var ModelModule = require('./model');
var table = "account";
var generator = require('../bin/util/tokenGenerator');
var validation = require('../bin/util/validation');
var valid = new validation();

var Account = {};
Account = Object.create(ModelModule);
Account.table = table;
Account.db = db;

Account.addBill = function(transaction, feeType, bill, cb){
    var randPost = generator.generateToken(9);
    var datePre = Date.parse("today").toString("yyMMdd");

    var data = [""];
    data.push(datePre+randPost);
    data.push(transaction);
    data.push(feeType == "online" ? 2 : 1);
    data.push(bill);
    data.push(0);
    data.push("");

    valid.checkUndef(data, function(passed){
        if(passed){
            Account.create(data, function(err,result){
                if(err) return cb(err);
                cb(null,{id: result.insertId, ORid: datePre+randPost});
            });
        }else{
            cb(new Error("Invalid data"));
        }
    });
}

module.exports = Account;