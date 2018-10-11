var account = require('../../model/accountModel');
var license = require('../../model/requireModel');
var notifier = require('./notification');
var Validation = new (require('../../bin/util/validation'));

var addPaymentFunc = function(ORno, amount){
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
    if(res.locals.authenticated == 0) return next(); 
    var ORno = req.params.id;
    var amount = req.body.amount;
    var feeType = req.body.feeType;

    Validation.checkUndef([ORno,amount], function(passed){
        if(passed){
            if(feeType == "enrolment"){
                account.getEnrollBal(ORno).catch(next).then(function(totaPayment){
                    if(amount >= (totaPayment.total*0.5)){
                        addPaymentFunc(ORno, amount).catch(next).then(function(result){
                            res.status(200).send({success: true, detail: "Payment Submitted", payload: result});                                
                        });
                    }else{
                        res.status(200).send({success: false, detail: "Must pay 50% of tuition"});
                    }
                });
            }else{
                addPaymentFunc(ORno, amount).catch(next).then(function(result){
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
    if(res.locals.authenticated == 0) return next(); 
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

exports.getEnrollmentBal = function(req, res, next){

};

exports.uploadPaymentSlip = function(req, res, next){
    if(!req.file) return res.status(200).send({success: false, detail: 'No file Uploaded!'});
    var paymentSlip = req.file.path;
    var ornum = req.body.ornumber;
    var email = req.body.email;
    account.addPaymentSlip(ornum, paymentSlip, function(err, id){
        if(err) return next(err);
        res.status(200).send({success: true, detail: 'Successfully Submitted, Please wait for an hour to validate the payment.'});
        notifier.addNotificationMethod('admin', 'payments', {title: 'Payment Slip Received', message: 'Bank Payment Slip Submitted, Please Validate'}, '', function(err){
            if(err) return next(err);
        });
    });
};