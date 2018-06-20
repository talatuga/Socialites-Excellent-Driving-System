// Web Router
var router = require('express').Router();

var middleware = require('../../middleware/lib/web');

router.get('/course',middleware.getCourse);

router.get('/branch', middleware.getBranch);

router.route('/cart')
    .get(middleware.getCart)
    .put(middleware.updateCart);

module.exports = router;