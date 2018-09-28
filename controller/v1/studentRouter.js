//Student Router
var router = require('express').Router();
//Student Middleware
var middleware = require('../../middleware/lib/student');
var util = require('../../middleware/lib/util/sysAccount');
var upload = require('../../middleware/fileUploader');

router.route('/register')
    .post(middleware.register)
    .get(middleware.getPreRegList);
router.route('/register/:id')
    .put(middleware.preRegEdit)
    .delete(middleware.preRegDel);

router.get('/payment/:id', middleware.getStudPayments);

router.route('/transfer')
    .get(middleware.transferList)
    .post(middleware.transferBranch);
router.put('/transfer/:id', middleware.transferAction);

router.route('/')
    .post(middleware.create)
    .put(middleware.updateAll) //subject for removal
    .delete(middleware.delAll) //subject for removal
    .get(middleware.get);
router.route('/:id')
    .get(middleware.get)
    .put(middleware.update)
    .delete(middleware.del);

router.get('/:id/course_enrolled', middleware.getCourse);
router.route('/:id/avatar')
    .post(upload.single('file'), util.uploadPic)
    .put(util.uploadPic);

router.route('/:id/:field')
    .get(middleware.get)
    .put(middleware.update);

module.exports = router;