var express = require('express'); 
//Utility Router
var router = express.Router();

//requirement Middelware
var rMiddleware = require('../../middleware/lib/util/requirement');

var auth = require('../../middleware/authentication');

var requirementsRouter = express.Router();
requirementsRouter.route('/')
    .post(auth.auth, rMiddleware.create)
    .get(rMiddleware.get);
requirementsRouter.route('/:id')
    .put(auth.auth, rMiddleware.update)
    .get(rMiddleware.get)
    .delete(auth.auth, rMiddleware.delete);
requirementsRouter.route('/:id/:field')
    .get(rMiddleware.get)
    .put(auth.auth, rMiddleware.update);

router.use('/requirement', requirementsRouter);

//lesson Middelware
var lMiddleware = require('../../middleware/lib/util/lesson');

var lessonRouter = express.Router();
lessonRouter.route('/')
    .post(auth.auth, lMiddleware.create)
    .get(lMiddleware.get);
lessonRouter.route('/:id')
    .put(auth.auth, lMiddleware.update)
    .get(lMiddleware.get)
    .delete(auth.auth, lMiddleware.delete);
lessonRouter.route('/:id/:field')
    .get(lMiddleware.get)
    .put(auth.auth, lMiddleware.update);

router.use('/lesson', lessonRouter);

module.exports = router;