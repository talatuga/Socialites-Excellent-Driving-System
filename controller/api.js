/* 
*    api.js, dito lahat ng api nang system.
*    seperated into two api's, admin and public
*    WARNING: changes here may cause major error and stop system from working. Please Update with care.
*    created by: CPRT
*/

var router = require('express').Router();

//router.use(require('../middleware/authentication').checkAJAX);         //Check if request is AJAX

//Current API's, may vary on versions
var v1 = require('./v1/mainRoute'); //Version 1.0.0 API
router.use('/v1', v1);              // Route registration

//Export main router for routes.js routing
module.exports = router;