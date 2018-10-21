// route.js : This contains the routing of the server.
var express = require('express');
var router = express.Router();
var compress = require('compression');
var minify = require('express-minify');
var logger = require('../bin/logger');

router.use(logger.midLogger);
 
router.use('/', require('./view/main'));                    //For Main Pages Router
router.use('/admin', require('./view/admin'));              //For Admin Pages Router
router.use('/api', require('./api'));                       //For API requests
router.use('/assets', compress(), minify(), express.static(__dirname + '/../public')); //this make public folder static/public
router.use(require('../middleware/errorHandler').error404); //If page not found.
router.use(require('../middleware/errorHandler').error500); //This handles all error on requests.

//export this router to use in our server.js
module.exports = router;