var router = require('express').Router();

var renderer = require('../../middleware/viewRenderer');

//Routes here.
router.get('/', renderer.user);

module.exports = router;