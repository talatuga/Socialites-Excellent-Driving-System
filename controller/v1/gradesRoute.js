var router = require('express').Router();
var middleware = require('../../middleware/lib/grades');
var auth = require('../../middleware/authentication');

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