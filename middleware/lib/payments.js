var account = require('../../model/accountModel');
var Validation = new (require('../../bin/util/validation'));

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

    Validation.checkUndef([ORno,amount], function(passed){
        if(passed){
            account.addPayment(ORno, amount, function(err, result){
                if(err) return next(err);
                res.status(200).send({success: true, detail: "Payment Submitted", payload: result});
            });
        }else{
            res.status(200).send({success: false, detail: "Invalid Data"});
        }
    })

};

/**
 * Get list of Payments/Bills
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.getPayments = function(req, res, next){

};

/**
 * Public API for Online Payment.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
exports.addOnlinePayment = function(req, res, next){

};