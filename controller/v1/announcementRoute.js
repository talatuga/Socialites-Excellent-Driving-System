var router = require('express').Router();
var middleware = require('../../middleware/lib/announcement');
var auth = require('../../middleware/authentication');

router.route('/list')
    .get(middleware.getAnnouncementList);
router.route('/web')
    .get(middleware.getAnnouncementListWeb);
router.route('/list/:id')
    .get(middleware.viewAnnouncement);
router.route('/')
    .post(auth.auth, middleware.create);
router.route('/:id')
    .put(middleware.update);

module.exports = router;