//Car Router
var router = require('express').Router();
//Car Middelware
var middleware = require('../../middleware/lib/car');

router.route('/')
    .post(middleware.create)
    .get(middleware.get);
router.route('/:id')
    .put(middleware.update)
    .get(middleware.get)
    .delete(middleware.delete);
router.route('/:id/:field')
    .get(middleware.get)
    .put(middleware.update);

module.exports = router;