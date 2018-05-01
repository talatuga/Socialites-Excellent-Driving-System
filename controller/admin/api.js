var router = require('express').Router();
//Authentications
var auth = require('../../middleware/authentication');
var err = require('../../middleware/errorHandler');
router.use(auth.auth, err.error401);

//Student Router
var studMW = require('../../middleware/admin/student');
router.route('/stud')
    .post(studMW.create)
    .put(studMW.updateAll)
    .delete(studMW.delAll)
    .get(studMW.getAll);
router.route('/stud/:id')
    .get(studMW.get)
    .put(studMW.update)
    .delete(studMW.del);
router.route('/stud/:id/:field')
    .get(studMW.get)
    .put(studMW.update);

module.exports = router;