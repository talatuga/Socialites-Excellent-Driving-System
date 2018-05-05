//Student Router
var router = require('express').Router();
//Student Middleware
var middleware = require('../../middleware/lib/student');

router.route('/')
    .post(middleware.create)
    .put(middleware.updateAll) //subject for removal
    .delete(middleware.delAll) //subject for removal
    .get(middleware.get);
router.route('/:id')
    .get(middleware.get)
    .put(middleware.update)
    .delete(middleware.del);
router.route('/:id/:field')
    .get(middleware.get)
    .put(middleware.update);

module.exports = router;