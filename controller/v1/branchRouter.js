//Branch Router
var router = require('express').Router();
/* //Branch Middelware
var middleware = require('../../middleware/lib/branch');

var auth = require('../../middleware/authentication');

router.route('/')
    .post(auth.auth,middleware.create)
    .get(middleware.get);
router.route('/:id')
    .put(auth.auth, middleware.update)
    .get(middleware.get)
    .delete(auth.auth,middleware.delete);
router.route('/:id/:field')
    .get(middleware.get)
    .put(auth.auth,middleware.update);
 */
module.exports = router;