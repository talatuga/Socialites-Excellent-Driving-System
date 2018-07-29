var router = require('express').Router();

var renderer = require('../../middleware/viewRenderer');
var auth = require('../../middleware/authentication');

//Routes here.
router.get('/', renderer.user);
router.route('/login')
    .get(auth.auth, auth.lastHandler, renderer.admin)
    .post(auth.login, auth.lastHandler);

module.exports = router;