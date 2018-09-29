var router = require('express').Router();
var middleware = require('../../middleware/lib/reports');
var auth = require('../../middleware/authentication');


router.get('/student/enrollees', middleware.getStud1); //Enrollees

module.exports = router;