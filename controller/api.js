/* 
    api.js, dito lahat ng api nang system.
    seperated into two api's, admin and public
    sa admin api lahat ng admin related request(SECURED)
    where sa public naman lahat ng public request(UNSECURED)
    WARNING: changes here may cause major error and stop system from working. Please Update with care.
*/

var router = require('express').Router();

//Version 1.0.0 API
var v1 = require('express').Router();
//Current API's, may vary on versions
var admin = require('./admin/api');
var main = require('./main/api');
// admin & public api
v1.use('/v1/admin', admin);
v1.use('/v1/user', main);

// Route registration
router.use(v1);

//Export main router for routes.js routing
module.exports = router;