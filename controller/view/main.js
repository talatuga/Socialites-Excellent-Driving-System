var router = require('express').Router();

var renderer = require('../../middleware/viewRenderer');
var auth = require('../../middleware/authentication');

//Routes here.
router.get('/', renderer.user);
router.route('/login')
    .get(renderer.admin)
    .post(auth.login, renderer.admin);

module.exports = router;