var router = require('express').Router();
var authentication = require('../../middleware/authentication');
var viewRenderer = require('../../middleware/viewRenderer');

//Initial Authentication on admin side to make sure any request made is secured.
router.use(authentication.auth);

//Routes here.
router.route('/')
    .get(viewRenderer.admin)
    .post(authentication.login, viewRenderer.admin);
router.post('/logout', authentication.logout);

module.exports = router;