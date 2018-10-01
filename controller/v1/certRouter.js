var router = require('express').Router();
var middleware = require('../../middleware/lib/certificate');
var auth = require('../../middleware/authentication');


router.get('/search/:id', middleware.getStudDetails); 
router.get('/search/inst/:id', middleware.getInst); 

module.exports = router;