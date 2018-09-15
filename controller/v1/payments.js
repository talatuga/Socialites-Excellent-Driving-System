var route = require('express').Router();
var middleware = require('../../middleware/lib/payments');
var upload = require('../../middleware/fileUploader');
var auth = require('../../middleware/authentication');

route.route('/')
    .get(auth.auth, middleware.getPayments)
    .post(middleware.addBill);

route.post('/online', middleware.addOnlinePayment);

route.post('/bank', upload.single('paymentSlip'), middleware.uploadPaymentSlip);

route.route('/:id')
    .get(auth.auth, middleware.getPayments)
    .post(auth.auth, middleware.addPayment);

module.exports = route;