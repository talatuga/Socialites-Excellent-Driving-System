var db = require('./db');
var ModelModule = require('./model');
var table = "account";
var paymentTable = "payment";
var generator = require('../bin/util/tokenGenerator');
var validation = require('../bin/util/validation');
var valid = new validation();

var Account = {};
Account = Object.create(ModelModule);
Account.table = table;
Account.db = db;

var getBalance = function(ORno){
    return new Promise(function(resolve, reject){
        var sql = "SELECT balance FROM account WHERE ORno = ?";
        db.get().query(sql, [ORno], function(err, result){
            if(err) return reject(err);
            resolve(result);
        });
    });
};

Account.addBill = function(transaction, feeType, bill, cb){
    var randPost = generator.generateToken(9);
    var datePre = Date.parse("today").toString("yyMMdd");

    var data = [""];
    data.push(datePre+randPost);
    data.push(transaction);
    data.push(feeType == "online" ? 2 : 1);
    data.push(bill);
    data.push(bill);
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
};

Account.addPayment = function(ORnum, amount, cb){
    getBalance(ORnum).then(function(balance){
        var data = balance[0];
        if(parseFloat(data.balance) > 0){
            var balance = parseFloat(data.balance) - parseFloat(amount);
            if(balance < 0){
                var excess = (balance) * -1;
                balance = 0;
            }
            var data = [ORnum, data.balance, amount, balance];
            var sql = "INSERT INTO " + paymentTable + "(transactionID,bill,pay,balance) VALUES(?,?,?,?)";
            db.get().query(sql, data, function(err, result){
                if(err) return cb(err);
                if(balance != 0){
                    cb(null, {status: 2, detail:"Balance Left", balance: balance});
                }else{
                    cb(null, {status: 1, detail:"Paid", transactionID: result.insertId});
                }
                sql = "UPDATE " + table + " SET balance = ? WHERE ORno = ?";
                db.get().query(sql,[balance, ORnum], function(err){
                    if(err) return cb(err);
                });
            });
        }else{
            cb(null, {status: 0, detail: "No balance Left"});
        }
    }).catch(cb);
};

module.exports = Account;