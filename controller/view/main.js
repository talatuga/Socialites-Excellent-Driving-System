var router = require('express').Router();

var renderer = require('../../middleware/viewRenderer');
var auth = require('../../middleware/authentication');

//Routes here.
router.get('/', renderer.user);
router.route('/login')
    .get(auth.auth, auth.lastHandler, renderer.admin)
    .post(auth.login, auth.lastHandler);

router.get('/student'/* , auth.studentAuth */, renderer.student);
router.get('/instructor'/* , auth.studentAuth */, renderer.instructor);
router.get('/branch'/* , auth.studentAuth */, renderer.branch);

module.exports = router;