// Web Router
var router = require('express').Router();

var middleware = require('../../middleware/lib/web');

router.get('/course',middleware.getCourse);

router.get('/branch', middleware.getBranch);

router.route('/cart')
    .get(middleware.getCart)
    .put(middleware.updateCart);

router.post('/enroll', middleware.enrollWeb);

router.get('/invoice', middleware.generateInvoice);

router.get('/receipt', middleware.generateReceipt);

router.post('/subscription', middleware.subscribe);

router.get('/display/totEnroll', middleware.getDisplayTotEnroll);
router.get('/display/totStud', middleware.getDisplayStud);

router.get('/unsubscribe/:email/:token', middleware.unsubscribe);

module.exports = router;