var router = require('express').Router();
var middleware = require('../../middleware/lib/reports');
var auth = require('../../middleware/authentication');

router.use(auth.auth);

router.get('/student', middleware.getStud); //Enrollees, Transferees, Enrolled, Performance Evaluation
router.get('/enrollee', middleware.enrolled); //Enrollees, Transferees, Enrolled, Performance Evaluation
router.get('/transfer', middleware.transferred); //Enrollees, Transferees, Enrolled, Performance Evaluation
router.get('/evaluation', middleware.evaluation); //Enrollees, Transferees, Enrolled, Performance Evaluation

router.get('/instructor/list', middleware.instructorList); //Enrollees, Transferees, Enrolled, Performance Evaluation
router.get('/instructor', middleware.performance); //Enrollees, Transferees, Enrolled, Performance Evaluation

router.get('/overall', middleware.overallGross);
router.get('/tuition', middleware.tuition);
router.get('/balance', middleware.balance);
router.get('/license', middleware.license);
router.get('/certificate', middleware.certificate);

router.get('/vehicle/list', middleware.carList);
router.get('/vehicle/activity', middleware.activity);

module.exports = router;