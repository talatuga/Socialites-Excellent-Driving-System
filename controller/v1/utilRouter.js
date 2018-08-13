var express = require('express'); 
//Utility Router
var router = express.Router();
var auth = require('../../middleware/authentication');

//system account middleware
var systemAccount = require('../../middleware/lib/util/sysAccount');

var systemAccountRouter = express.Router();
systemAccountRouter.route('/')
    .post(auth.auth, systemAccount.create)
    .get(systemAccount.get);
systemAccountRouter.route('/:id')
    .get(systemAccount.get)
    .put(auth.auth, systemAccount.update)
    .delete(auth.auth, systemAccount.delete);
systemAccountRouter.route('/:id/:field')
    .get(systemAccount.get)
    .put(auth.auth, systemAccount.update);
router.use('/sysacc', systemAccountRouter);

//requirement Middelware
var rMiddleware = require('../../middleware/lib/util/requirement');

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
lessonRouter.route('/course')
    .get(lMiddleware.getCourse)
    .post(lMiddleware.addCourse);
lessonRouter.route('/course/:id/modify')    
    .put(lMiddleware.editCourse)
    .delete(lMiddleware.delCourse);
lessonRouter.route('/:id')
    .put(auth.auth, lMiddleware.update)
    .get(lMiddleware.get)
    .delete(auth.auth, lMiddleware.delete);
lessonRouter.route('/:id/:field')
    .get(lMiddleware.get)
    .put(auth.auth, lMiddleware.update);

router.use('/lesson', lessonRouter);

// License
var webMid = require('../../middleware/lib/web');
var licenseRouter = require('express').Router();

licenseRouter.get('/', webMid.getLicenseList);

router.use('/license', licenseRouter);

module.exports = router;