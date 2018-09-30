var router = require('express').Router();
var middleware = require('../../middleware/lib/reports');
var auth = require('../../middleware/authentication');


router.get('/student', middleware.getStud); //Enrollees, Transferees, Enrolled, Performance Evaluation

module.exports = router;