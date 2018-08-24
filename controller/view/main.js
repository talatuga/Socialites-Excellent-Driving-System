var router = require('express').Router();

var renderer = require('../../middleware/viewRenderer');
var auth = require('../../middleware/authentication');
var stud = require('../../middleware/lib/student');

//Routes here.
router.route('/')
    .get(renderer.user)
    .post(auth.studentLogin, renderer.student);
router.route('/login')
    .get(auth.auth, auth.lastHandler, renderer.admin)
    .post(auth.login, auth.lastHandler);

router.get('/logout', auth.logout);

router.route('/student')
    .get(auth.studentAuth, stud.prepareViewData, renderer.student)
    .post(auth.studentLogin, stud.prepareViewData, renderer.student);
    
router.route('/instructor')
    .get(auth.instAuth, renderer.instructor)
    .post(auth.instLogin, renderer.instructor);
    
router.get('/branch'/* , auth.studentAuth */, renderer.branch);

module.exports = router;