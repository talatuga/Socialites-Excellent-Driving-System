var account = require('../../model/accountModel');
var license = require('../../model/requireModel');
var Validation = new (require('../../bin/util/validation'));

var addPayment = function(ORno, amount){
    return new Promise((resolve, reject)=>{
        account.addPayment(ORno, amount, function(err, result){
            if(err) return reject(err);
            resolve(result);
        });
    });
};

/**
 * Add information about pending payment.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.addBill = function(req, res, next){
    
};


/**
 * This add payments on pending bill.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.addPayment = function(req, res, next){
    var ORno = req.params.id;
    var amount = req.body.amount;
    var feeType = req.body.feeType;

    Validation.checkUndef([ORno,amount], function(passed){
        if(passed){
            if(feeType == "enrolment"){
                account.getBalance(ORno).then(function(transaction){
                    var addition = transaction.transaction.split("-")[1];
                    license.getLicenseApply(addition, function(err, licenseData){
                        if(err) return next(err);
                        console.log(licenseData);
                        var origBal = amount - parseFloat(licenseData.price);
                        if(amount >= (origBal*0.5)){
                            addPayment(ORno, amount).catch(next).then(function(result){
                                res.status(200).send({success: true, detail: "Payment Submitted", payload: result});                                
                            });
                        }else{
                            res.status(200).send({success: false, detail: "Must pay 50% of tuition"});
                        }
                    });
                });
            }else{
                addPayment(ORno, amount).catch(next).then(function(result){
                    res.status(200).send({success: true, detail: "Payment Submitted", payload: result});
                });
            }
        }else{
            res.status(200).send({success: false, detail: "Invalid Data"});
        }
    });
};

/**
 * Get list of Payments/Bills
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.getPayments = function(req, res, next){
    var ornum = req.params.id;
    if(ornum){

    }else{

    }
};

/**
 * Public API for Online Payment.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.addOnlinePayment = function(req, res, next){

};