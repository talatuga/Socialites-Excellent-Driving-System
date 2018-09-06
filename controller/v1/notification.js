/**
 * Notification Router Module, 
 * this is the recieving routes of all notification update request.
 */
var router = require('express').Router();
var notificationHandler = require('../../middleware/lib/notification');

router.route('/')
    .get(notificationHandler.notificationPoll)
    .post(notificationHandler.addNotification);

router.route('/:id')
    .put(notificationHandler.markRead);

module.exports = router;