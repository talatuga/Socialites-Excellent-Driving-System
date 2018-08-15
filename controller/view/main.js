var router = require('express').Router();

var renderer = require('../../middleware/viewRenderer');
var auth = require('../../middleware/authentication');

//Routes here.
router.route('/')
    .get(renderer.user)
    .post(auth.studentLogin, renderer.student);
router.route('/login')
    .get(auth.auth, auth.lastHandler, renderer.admin)
    .post(auth.login, auth.lastHandler);

router.route('/student')
    .get(auth.studentAuth, renderer.student)
    .post(auth.studentLogin, renderer.student);
    
router.get('/instructor'/* , auth.studentAuth */, renderer.instructor);
router.get('/branch'/* , auth.studentAuth */, renderer.branch);

module.exports = router;