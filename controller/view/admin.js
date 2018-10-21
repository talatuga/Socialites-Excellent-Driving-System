var router = require('express').Router();
var authentication = require('../../middleware/authentication');
var viewRenderer = require('../../middleware/viewRenderer');

//Initial Authentication on admin side to make sure any request made is secured.
router.use(authentication.auth);

//Routes here.
router.route('/')
    .get(viewRenderer.admin)
    .post(authentication.block, authentication.login, viewRenderer.admin);
router.get('/logout', authentication.logout);

module.exports = router;