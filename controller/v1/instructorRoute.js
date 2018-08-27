//Instructor Router
var router = require('express').Router();
//Instructor Middelware
var middleware = require('../../middleware/lib/instructor');

router.get('/:id/eval', middleware.getEvalInst);
router.get('/stud/:id/eval', middleware.getEvalStud);
router.route('/')
    .post(middleware.create)
    .get(middleware.get);

router.get('/test', middleware.testGettingAvailInst);

router.route('/:id')
    .put(middleware.update)
    .get(middleware.get)
    .delete(middleware.delete);
router.route('/:id/:field')
    .get(middleware.get)
    .put(middleware.update);

module.exports = router;